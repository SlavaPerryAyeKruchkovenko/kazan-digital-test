import {Injectable} from '@angular/core';
import * as Cesium from 'cesium';

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMjdlNjQyNi00ZDcxLTQ1OTgtODI0YS1hOTlhNmIzMmViOTAiLCJpZCI6MjM2ODAxLCJpYXQiOjE3MjQ1NjUxNDd9.mla8jrEQisREUqbI7QudJm4iBquG3c-35lOVN0kqFog"

@Injectable({
  providedIn: 'root'
})
export class CesiumService {
  constructor() {
  }

  private viewer: any;

  plotPoints(div: string) {
    console.log(div)
    this.viewer = new Cesium.Viewer(div);
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
      point: {
        color: Cesium.Color.RED,
        pixelSize: 16,
      },
    });
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-80.5, 35.14),
      point: {
        color: Cesium.Color.BLUE,
        pixelSize: 16,
      },
    });
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-80.12, 25.46),
      point: {
        color: Cesium.Color.YELLOW,
        pixelSize: 16,
      },
    });
  }
}
