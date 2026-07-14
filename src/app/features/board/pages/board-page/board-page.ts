import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-board-page',
  imports: [RouterOutlet],
  templateUrl: './board-page.html',
  styleUrl: './board-page.css',
})
export class BoardPage {
  public id = input.required<string>();
}
