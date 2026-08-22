import { inject, Injectable } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { AuthChangeEvent } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private messageService = inject(MessageService);

  public showByAuthEvent(eventType: AuthChangeEvent): void {
    switch (eventType) {
      case 'SIGNED_IN':
        this.success({ detail: 'You have successfully signed in.' });
        break;
      case 'SIGNED_OUT':
        this.info({ detail: 'You have been signed out.' });
        break;
      case 'PASSWORD_RECOVERY':
        this.info({
          detail: 'Password recovery email sent. Check your inbox.',
        });
        break;
      case 'USER_UPDATED':
        this.success({ detail: 'Your profile has been updated.' });
        break;
    }
  }

  public success({ summary, detail, sticky }: ToastMessageOptions) {
    this.messageService.add({
      key: 'global',
      severity: 'success',
      summary: summary ?? 'Success',
      detail,
      sticky,
    });
  }

  public error(
    { summary, detail, sticky }: ToastMessageOptions,
    context?: string, //ToDo: delete in production
  ) {
    this.messageService.add({
      key: 'global',
      severity: 'error',
      summary: summary ?? 'Error',
      detail,
      sticky,
    });

    if (context) {
      console.error(`[${context}]`, detail);
    }
  }

  public warning({ summary, detail, sticky }: ToastMessageOptions) {
    this.messageService.add({
      key: 'global',
      severity: 'warn',
      summary: summary ?? 'Warning',
      detail,
      sticky,
    });
  }

  public info({ summary, detail, sticky }: ToastMessageOptions) {
    this.messageService.add({
      key: 'global',
      severity: 'info',
      summary: summary ?? 'Information',
      detail,
      sticky,
    });
  }

  public clear(): void {
    this.messageService.clear();
  }
}
