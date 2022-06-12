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
  totalReturn?: number // computed present day value compared to average purchase price
  totalValue?: number // total value of asset
}

@Injectable({
  providedIn: 'root'
})
export class MyWalletService {

  constructor() { }

  wallet: IUserWallet;

  /* Get Wallet For User */
  getWallet(userId: number): IUserWallet {
    if (this.wallet) {
      return this.wallet;
    } else {
      // first check if Wallet exists in local storate
      // otherwise, initialize new wallet
      const localStorageWallet = this.getWalletInLocalStorage(userId);
      console.log('wallet in local storage?', localStorageWallet);
      this.wallet = localStorageWallet != null
        ? localStorageWallet
        : {
            'balance': 0,
            'assets': {} as {[key: string]: IWalletAsset}
          } as IUserWallet
      return this.wallet;
    }
  }

  /* Add To Wallet */
  addToWallet(userId: number, transaction: IAssetTransaction): boolean {
    // Get current wallet asset
    const walletAsset: IWalletAsset = this.getOrCreateWalletAsset(userId, transaction.assetId);
    const todayTotalPrice: number = parseFloat((parseFloat(transaction.pricePerUnit) * parseFloat(transaction.quantity)).toFixed(2));
    const transactionQuantity: number = parseFloat(transaction.quantity);
    // current quantity
    const currentQuantity = walletAsset.quantity;
    // update quantity
    walletAsset.quantity += transactionQuantity;
    // update priceAverage = existing total price + today's total price / new total quantity
    walletAsset.priceAverage = ((walletAsset.priceAverage * currentQuantity) + todayTotalPrice) / walletAsset.quantity;
    
    // Update Wallet asset and balance
    this.wallet.balance -= todayTotalPrice;
    this.setWalletAssetInWallet(userId, transaction.assetId, walletAsset);
    console.log('updated wallet', this.wallet);
    this.setWalletInLocalStorage(userId)
    return true;
  }

  /* Remove From Wallet */
  removeFromWallet(userId: number, transaction: IAssetTransaction): boolean {
    const walletAsset: IWalletAsset = this.getWalletAsset(userId, transaction.assetId) as IWalletAsset;
    const transactionQuantity: number = parseFloat(transaction.quantity);
    // only if wallet is not empty and requested change is not greater than the current quantity
    if (walletAsset != null && transactionQuantity <= walletAsset.quantity) {
      const walletAsset: IWalletAsset = this.getWalletAsset(userId, transaction.assetId) as IWalletAsset;
      const todayTotalPrice: number = parseFloat((parseFloat(transaction.pricePerUnit) * parseFloat(transaction.quantity)).toFixed(2));
      
      // update quantity
      walletAsset.quantity -= transactionQuantity;
      // update balance
      this.wallet.balance += todayTotalPrice;

      // if updated quantity is 0, remove asset from wallet
      if (walletAsset.quantity == 0) {
        delete this.wallet.assets[transaction.assetId]
      } else {
        // Update Wallet asset and balance
        this.setWalletAssetInWallet(userId, transaction.assetId, walletAsset);  
      }
      console.log('updated wallet', this.wallet);
      this.setWalletInLocalStorage(userId)
      return true;
    } else {
      console.log('unable to perform transaction');
      return false;
    }
  }

  /* Get Or Create Asset from wallet */
  getOrCreateWalletAsset(userId: number, assetId: string): IWalletAsset {
    const wallet = this.getWallet(userId);
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

  /* Get Asset from wallet */
  getWalletAsset(userId: number, assetId: string): IWalletAsset|null {
    const wallet = this.getWallet(userId);
    if (Object.keys(wallet.assets).includes(assetId)) {
      return wallet.assets[assetId]
    } else {
      return null
    }
  }

  /* Set Asset In wallet */
  setWalletAssetInWallet(userId: number, assetId: string, walletAsset: IWalletAsset): void {
    this.wallet = this.getWallet(userId);
    this.wallet.assets[assetId] = walletAsset;
  }

  /* Set Current Wallet in Local Storage */
  setWalletInLocalStorage(userId: number): void {
    window.localStorage.setItem(userId.toString(), JSON.stringify(this.wallet));
  }

  /* Get Wallet in Local Storage */
  getWalletInLocalStorage(userId: number): IUserWallet {
    const wallet = window.localStorage.getItem(userId.toString()) as string;
    return JSON.parse(wallet);
  }
}
