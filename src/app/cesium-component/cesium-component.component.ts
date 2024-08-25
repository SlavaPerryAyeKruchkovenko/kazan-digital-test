import {Component, OnInit} from '@angular/core';
import {CesiumService} from '../cesium.service';

@Component({
  selector: 'app-cesium-component',
  templateUrl: './cesium-component.component.html',
  standalone: true,
  styleUrls: ['./cesium-component.component.sass']
})
export class CesiumComponentComponent implements OnInit {
  constructor(private cesium: CesiumService) {}

  ngOnInit(): void {
    if(typeof document !== 'undefined'){
      this.cesium.plotPoints("cesium");
    }

  }
}
