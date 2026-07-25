import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-board-layout',
  imports: [RouterOutlet],
  templateUrl: './board-layout.html',
  styleUrl: './board-layout.css',
})
export class BoardLayout {
  public id = input.required<string>();
}
