import { Component, Input, OnInit } from '@angular/core';

export enum ComponentState {
  ListView,
  AssetDetailsView
}

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  @Input() asset: any;
  @Input() componentState = ComponentState.ListView;
  positiveChange: boolean = false;
  readonly ComponentState: typeof ComponentState = ComponentState;
  
  
  constructor() { }

  ngOnInit(): void {
    if (this.asset) {
      this.positiveChange = !this.asset.changePercent24Hr.includes('-');
    }
  }

}
