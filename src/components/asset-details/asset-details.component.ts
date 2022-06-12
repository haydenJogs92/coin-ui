import { Component, Input, OnInit } from '@angular/core';

export enum ComponentState {
  ListView,
  AssetDetailsView,
  WalletView
}

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  @Input() asset: any;
  @Input() componentState = ComponentState.ListView;
  dailyPositiveChange: boolean = false;
  totalReturnChange: boolean = false;
  readonly ComponentState: typeof ComponentState = ComponentState;
  
  
  constructor() { }

  ngOnInit(): void {
    if (this.asset) {
      this.dailyPositiveChange = !this.asset.changePercent24Hr.includes('-');
      if (this.componentState == ComponentState.WalletView) {
        this.totalReturnChange = this.asset.totalReturn > 0;
      }
    }
  }

}
