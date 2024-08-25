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

  async plotPoints(div: string) {
    this.viewer = new Cesium.Viewer(div);
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    try {
      const tileset = await Cesium.createGooglePhotorealistic3DTileset();
      this.viewer.scene.primitives.add(tileset);
    } catch (error) {
      console.log(`Error creating tileset: ${error}`);
    }
  }

  randomizeTilesColor() {
    const tileset = this.viewer.scene.primitives.get(0);
    if (tileset) {
      this.setupMouseEvents(tileset)
      const tilesetColors = new Map<number, string>()
      const totalTiles = 2000
      for (let i = 0; i < totalTiles; i++) {
        tilesetColors.set(i, this.getRandomColor());
      }
      const style = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            [true, this.getRandomColor()],
          ]
        },
        labelText: `"Current timestamp: ${Date.now()}"`, // Добавить текст для проверки
        labelVerticalOrigin: Cesium.VerticalOrigin.CENTER,
        labelFillColor: 'rgba(255, 0, 0, 1)', // Сделать цвет лейбла ярким для проверки видимости
        labelOutlineColor: 'rgba(255, 255, 255, 1)', // Обводка, чтобы лейбл был заметнее
        labelOutlineWidth: 10
      })
      tileset.style = style;
    }
  }

  resetTileColor() {
    const tileset = this.viewer.scene.primitives.get(0);
    this.resetMouseEvent()
    if (tileset) {
      tileset.style = undefined
    }
  }

  setupMouseEvents(tileset: Cesium.Cesium3DTileset) {
    this.handler.setInputAction((movement: {
      startPosition: Cesium.Cartesian2,
      endPosition: Cesium.Cartesian2
    }) => {
      const pickedTile = this.viewer.scene.pick(movement.endPosition)
      if(pickedTile?.content?._tile && Cesium.defined(pickedTile.content?._tile)){
        const tile = pickedTile?.content?._tile
        /*console.log(tile?.extras )*/
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  resetMouseEvent() {
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  }

  private getRandomColor() {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    const a = 0.5
    return `rgba(${r},${g},${b},${a})`
  }
}
