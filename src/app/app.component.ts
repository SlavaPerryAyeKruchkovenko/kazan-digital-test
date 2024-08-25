import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CesiumComponentComponent} from "./cesium-component/cesium-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CesiumComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'kamaz-digital-test';
}
