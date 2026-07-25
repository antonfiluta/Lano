import { Component } from '@angular/core';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-initial-page',
  imports: [Logo],
  templateUrl: './initial-page.html',
  styleUrl: './initial-page.css',
})
export class InitialPage {}
