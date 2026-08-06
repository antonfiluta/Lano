import { computed, effect, inject, Service, signal } from '@angular/core';
import { NAV_ROUTES } from '../utils/nav-routes';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Service()
export class NavSerice {
  private router = inject(Router);

  public routes = NAV_ROUTES;

  public isBgAnimated = computed(() => {
    return this.navigationCount() > 1;
  });
  public bgPosition = computed(() => {
    return `translateY(${this.activeIndex() * 40.35}px)`;
  });

  private navigationCount = signal<number>(0);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.url),
    ),
    { initialValue: '' },
  );

  private activeIndex = computed(() => {
    const url = this.currentUrl();

    if (url === '/') return 0;

    return this.routes.findIndex((route) => url.includes(route.path));
  });

  constructor() {
    effect(() => {
      if (this.currentUrl()) {
        this.navigationCount.update((v) => v + 1);
      }
    });
  }
}
