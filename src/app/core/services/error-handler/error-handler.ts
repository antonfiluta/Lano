import { inject, Injectable } from '@angular/core';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandler {
  private notify = inject(NotificationsService);

  public handle(error: unknown, context?: string): void {
    const detail = this.getFriendlyMessage(error);
    this.notify.error({ detail }, context);
  }

  public extractMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Unknown Error';
  }

  private getFriendlyMessage(error: unknown): string {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return 'Network error. Please check your internet connection.';
    }

    if (error instanceof Error) {
      if (
        error.message.includes('NetworkError') ||
        error.message.includes('Failed to fetch')
      ) {
        return 'Server is temporarily unavailable. Please try again later.';
      }

      if (
        error.message.includes('timeout') ||
        error.message.includes('Timeout')
      ) {
        return 'Request timed out. Please try again.';
      }

      return error.message;
    }

    return 'An unknown error occurred.';
  }
}
