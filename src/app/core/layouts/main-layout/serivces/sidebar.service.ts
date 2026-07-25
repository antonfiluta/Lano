import { Service, signal } from '@angular/core';

@Service()
export class SidebarService {
  private _isMobile = signal<boolean>(false);
  private _isOpen = signal<boolean>(true);

  public isMobile = this._isMobile.asReadonly();
  public isOpen = this._isOpen.asReadonly();

  public toggle() {
    this._isOpen.update((v) => !v);
  }

  public close() {
    this._isOpen.set(false);
  }
}
