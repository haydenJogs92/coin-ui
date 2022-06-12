import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentState } from 'src/components/asset-details/asset-details.component';
import { CoinccapService } from 'src/services/coincap/coinccap.service';
import { IUserWallet, MyWalletService } from 'src/services/my-wallet/my-wallet.service';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.scss']
})
export class MyWalletComponent implements OnInit {

  myWallet: IUserWallet;
  userId: number;
  assetIds: string[];
  assets: any[];
  displayedAssets: any[] = [];
  readonly ComponentState: typeof ComponentState = ComponentState;
  constructor(
    private route: ActivatedRoute,
    private mw: MyWalletService,
    private cc: CoinccapService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.myWallet = this.mw.getWallet(this.userId);
    this.assetIds = Object.keys(this.myWallet.assets);
    
    this.cc.getAssets({ids: this.assetIds.join(',')})
    .subscribe((res) => {
      // add corresponding wallet values to asset list
      res.forEach((asset: any) => {
        const myWalletAsset = this.myWallet.assets[asset.id];
        // calculate the current total return
        myWalletAsset['totalReturn'] = parseFloat(asset.priceUsd) - myWalletAsset.priceAverage;
        // calculate portfolio value
        myWalletAsset['totalValue'] = myWalletAsset.priceAverage * myWalletAsset.quantity;
        this.displayedAssets.push(
          Object.assign(asset, myWalletAsset)
        )
        console.log(this.displayedAssets);
      })
    });
    
  }

}
