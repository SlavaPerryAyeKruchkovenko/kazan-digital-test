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
  private handler: any
  private defaultColor = Cesium.Color.RED.withAlpha(0.1)
  private changeEntity: Cesium.Entity | null = null
  private changeColor: any = null

  async plotPoints(div: string) {
    this.viewer = new Cesium.Viewer(div);
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    for (let i = 0; i < 20; i++) {
      const rectangle = this.getRandomRectangle(i);
      const ellipsoid = Cesium.Ellipsoid.WGS84
      const rectangleCenter = Cesium.Rectangle.center(rectangle)
      const unNormalizeCenter = ellipsoid.cartographicToCartesian(rectangleCenter)
      //const center = ellipsoid.getSurfaceNormalIntersectionWithZAxis(unNormalizeCenter)
      this.viewer.entities.add({
        id: i.toString(),
        rectangle: {
          coordinates: rectangle,
          material: this.defaultColor,
        },
        position: unNormalizeCenter,
        label: {
          show: true,
          text: `${new Date().toLocaleDateString("en-US")}`,
          scale: 1.0,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.TOP,
          font: '12px Helvetica',
          fillColor: Cesium.Color.YELLOW,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 1,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          pixelOffset: new Cesium.Cartesian2(-15, -5)
        }
      });
      this.viewer.zoomTo(this.viewer.entities);
    }
  }

  randomizeTilesColor() {
    this.addHoverEffect()
    this.viewer.entities.values.forEach((entity: Cesium.Entity) => {
      //@ts-ignore
      entity.rectangle.material = this.getRandomColor()
      //@ts-ignore
      entity.label.show = true
    })
  }

  resetTileColor() {
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    this.viewer.entities.values.forEach((entity: Cesium.Entity) => {
      //@ts-ignore
      entity.rectangle.material = this.defaultColor
      //@ts-ignore
      entity.label.show = false
    })
  }

  private addHoverEffect() {
    this.handler.setInputAction((movement: {
      startPosition: Cesium.Cartesian2,
      endPosition: Cesium.Cartesian2
    }) => {
      const pickedObject = this.viewer.scene.pick(movement.endPosition);
      if (this.changeEntity != null && this.changeColor != null) {
        //@ts-ignore
        this.changeEntity.rectangle.material = this.changeColor
        this.changeEntity = null
        this.changeColor = null
      }
      if (pickedObject?.id?.id < 20) {
        //@ts-ignore
        this.changeEntity = pickedObject?.id
        //@ts-ignore
        this.changeColor = this.changeEntity.rectangle.material
        //@ts-ignore
        this.changeEntity.rectangle.material = Cesium.Color.BLACK
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  }

  private getRandomRectangle(index: number) {
    const layerSize = 1
    let step = index
    let south = 54.2
    let north = 55.2
    if (index % 2 === 0) {
      step = index / 2
    } else {
      south = 55.2
      north = 56.2
      step = (index - 1) / 2
    }
    const west = 61 + step
    const east = west + layerSize
    return Cesium.Rectangle.fromDegrees(west, south, east, north);
  }

  private getRandomColor() {
    const r = Math.floor(Math.random() * 255) % 255
    const g = Math.floor(Math.random() * 255) % 255
    const b = Math.floor(Math.random() * 255) % 255
    const a = 0.5
    //Convert to 0.0 .. 1.0 for Cesium
    return new Cesium.Color(r / 255, g / 255, b / 255, a)
  }
}
