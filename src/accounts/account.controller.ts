import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Result } from '../_core/utils/result/result.model';
import { AuthService } from '../auth/auth.service';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { Guid } from 'guid-typescript';
import { ChangePasswordDto } from './dtos/change-password.dto';
// simport { JwtAuthGuard } from "../auth/guards/auth.guard";

@Controller('v1/accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}
  // autenticar
  @Post('authenticate')
  async authenticate(@Body() model: AuthenticateDto): Promise<any> {
    const customer = await this.accountService.authenticate(
      model.username,
      model.password,
    );
    // caso nao encontre o usuario
    if (!customer) {
      throw new HttpException(
        new Result('usuario ou senha invalidos', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!customer.user.active) {
      throw new HttpException(
        new Result('Usuario inativo', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.createToken(
      customer.document,
      customer.email,
      '',
      customer.user.roles,
    );
    return new Result(null, true, token, null);
  }

  // Resetar a senha
  @Post('reset-password')
  async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
    try {
      // TODO: Enviar email com senha
      const password = Guid.create()
        .toString()
        .substring(0, 8)
        .replace('-', '');
      await this.accountService.update(model.document, { password });
      return new Result(
        'Uma nova senha foi enviada para seu email',
        true,
        null,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result('Nao foi possivel restaurar sua senha', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // alterar senha
  @Post('change-password')
  // @UseGuards(JwtAuthGuard)
  async changePassword(
    @Request() request: any,
    @Body() model: ChangePasswordDto,
  ): Promise<any> {
    try {
      await this.accountService.update(request.user.document, {
        password: model.newPassword,
      });
      return new Result('Sua senha foi alterada com sucesso', true, null, null);
    } catch (error) {
      throw new HttpException(
        new Result('Nao foi possivel alterar sua senha', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Refresh token
  @Post('refresh')
  // @UseGuards(JwtAuthGuard)
  async refreshToken(@Request() request: any): Promise<any> {
    const token = await this.authService.createToken(
      request.user.document,
      request.user.email,
      request.user.image,
      request.user.roles,
    );
    return new Result(null, true, token, null);
  }
}
