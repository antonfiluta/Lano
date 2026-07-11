import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './ui/sidebar/sidebar';
import { Header } from './ui/header/header';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
