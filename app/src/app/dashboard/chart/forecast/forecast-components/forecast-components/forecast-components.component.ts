import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-forecast-components',
  template: '<img [src]="\'data:image/png;base64,\' + plot_image.image_data" />\n',
  styleUrls: ['./forecast-components.component.css']
})
export class ForecastComponentsComponent {
  @Input() plot_image: any;
}
