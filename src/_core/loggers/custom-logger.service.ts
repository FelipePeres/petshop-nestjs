import {LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService{
    log(message: string) {
        // tslint:disable-next-line: no-console
        console.log(message);
    }
    error(message: any, trace?: string) {
        // tslint:disable-next-line: no-console
        console.log(message);
    }
    warn(message: string) {
        // tslint:disable-next-line: no-console
        console.log(message);
    }
    debug(message: string) {
        // tslint:disable-next-line: no-console
        console.log(message);
    }
    verbose(message: string) {
        // tslint:disable-next-line: no-console
        console.log(message);
    }
}