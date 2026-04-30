import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'page-hero',
  imports: [],
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHero {
  title = input.required<string>();
  image = input.required<string>();
}
