import { Component, input, output } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-prime-button',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './prime-button.html',
  styleUrl: './prime-button.css',
})
export class PrimeButton {
  public icon = input.required<string>();
  public pTooltip = input.required<string>();

  public iconSize = input<string>('');
  public class = input<string>('');
  public severity = input<ButtonSeverity>('secondary');

  public action = output();
}
