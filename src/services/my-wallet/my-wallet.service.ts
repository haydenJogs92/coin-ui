import { Injectable } from '@angular/core';

export interface IAssetTransaction {
  assetId: string,
  pricePerUnit: string, // today's purchase price
  quantity: string
}

export interface IUserWallet {
  balance: number,
  assets: {[assetID: string]: IWalletAsset}
}

export interface IWalletAsset {
  priceAverage: number, // average of purchasePrices
  quantity: number, // quantity of purchases
  totalReturn?: number // computed present day value
}

@Injectable({
  providedIn: 'root'
})
export class MyWalletService {

  constructor() { }

  wallet: IUserWallet;

  /* Get Wallet For User */
  getWallet(userId: number): IUserWallet {
    // TODO - get this from session
    if (this.wallet) {
      return this.wallet;
    } else {
      return {'assets': {} as {[key: string]: IWalletAsset}} as IUserWallet; 
    }
    
  }

  /* Set Wallet For User */
  /* 
    !!Not a good idea, point of truth for this information should be on the server
  */
  setWallet(userId: number, wallet: IUserWallet): void {
    this.wallet = wallet;
  }

  /* Add To Wallet */
  addToWallet(userId: number, transaction: IAssetTransaction): void {
    console.log('add to wallet', userId);
    console.log('transaction', transaction);
    let walletAsset: IWalletAsset = this.getWalletAsset(userId, transaction.assetId);
    const todayTotalPrice: number = parseFloat((parseFloat(transaction.pricePerUnit) * parseFloat(transaction.quantity)).toFixed(2));
    const transactionQuantity: number = parseFloat(transaction.quantity);
    // current quantity
    const currentQuantity = walletAsset.quantity;
    // update quantity
    walletAsset.quantity += transactionQuantity;
    // update priceAverage = existing total price + today's total price / new total quantity
    walletAsset.priceAverage = ((walletAsset.priceAverage * currentQuantity) + todayTotalPrice) / walletAsset.quantity;
    console.log('walletAsset', walletAsset);
    this.setWalletAssetInWallet(userId, transaction.assetId, walletAsset);
    console.log(this.wallet);
  }

  /* Remove From Wallet */
  removeFromWallet(userId: number, transaction: IAssetTransaction): void {

  }

  getWalletAsset(userId: number, assetId: string): IWalletAsset {
    let wallet = this.getWallet(userId);
    let walletAsset = {} as IWalletAsset;
    if (Object.keys(wallet.assets).includes(assetId)) {
      walletAsset = wallet.assets[assetId]
    } else {
      // create new asset in wallet
      wallet.assets[assetId] = {} as IWalletAsset;
      wallet.assets[assetId].quantity = 0;
      wallet.assets[assetId].priceAverage = 0;
      walletAsset = wallet.assets[assetId];
    }
    return walletAsset;
  }

  setWalletAssetInWallet(userId: number, assetId: string, walletAsset: IWalletAsset): void {
    this.wallet = this.getWallet(userId);
    this.wallet.assets[assetId] = walletAsset;
    console.log('updated wallet', this.wallet);
  }
}
