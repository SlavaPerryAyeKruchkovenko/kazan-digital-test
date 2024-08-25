import {Component, OnInit} from '@angular/core';
import {CesiumService} from '../cesium.service';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-cesium-component',
  templateUrl: './cesium-component.component.html',
  imports: [
    NgClass
  ],
  standalone: true,
  styleUrls: ['./cesium-component.component.sass']
})
export class CesiumComponentComponent implements OnInit {
  constructor(private cesium: CesiumService) {
  }

  isRandomized: boolean = false;

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      this.cesium.plotPoints("cesium");
    }
  }

  toggleRandomize() {
    this.isRandomized = !this.isRandomized;
    if(this.isRandomized){
      this.cesium.randomizeTilesColor()
    }else{
      this.cesium.resetTileColor()
    }
  }
}
