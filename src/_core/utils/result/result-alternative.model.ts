import { BadRequestException } from "@nestjs/common";

export class ResultAlternative{
    constructor(erros: object[]){
        const obj: object = {'constraints': erros}
        throw new BadRequestException([obj],'erro');   
    }
}