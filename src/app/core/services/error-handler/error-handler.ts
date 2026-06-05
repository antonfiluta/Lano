import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandler {
  public handle(error: unknown, context?: string) {
    const message = this.extractMessage(error);

    console.error(`[${context ?? 'Aplication Error'}]`, message, error);
  }

  public extractMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    return 'Uknown Error';
  }
}
