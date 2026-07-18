import { Component } from '@angular/core';
import { Background } from '../background/background';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-initial-page',
  imports: [Background, Logo],
  templateUrl: './initial-page.html',
  styleUrl: './initial-page.css',
})
export class InitialPage {}
