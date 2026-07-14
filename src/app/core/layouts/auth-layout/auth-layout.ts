import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Background } from '@shared/ui/background/background';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Background],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
