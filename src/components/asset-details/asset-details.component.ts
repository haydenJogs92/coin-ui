import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  @Input() asset: any;
  positiveChange: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    if (this.asset) {
      this.positiveChange = !this.asset.changePercent24Hr.includes('-');
    }
  }

}
