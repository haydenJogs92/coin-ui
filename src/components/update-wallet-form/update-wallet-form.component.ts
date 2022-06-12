import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyWalletService } from '../../services/my-wallet/my-wallet.service';
import { UserService } from '../../services/user/user.service';

export enum ComponentState {
  Buy,
  Sell
}

@Component({
  selector: 'app-update-wallet-form',
  templateUrl: './update-wallet-form.component.html',
  styleUrls: ['./update-wallet-form.component.scss']
})
export class UpdateWalletFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private mw: MyWalletService,
    private us: UserService,
    private cdRef: ChangeDetectorRef
  ) { }

  @Input() asset: any;
  readonly ComponentState: typeof ComponentState = ComponentState;
  componentState = ComponentState.Buy;
  form: FormGroup;
  assetPricePerUnit: number;
  canSell: boolean = false;
  purchaseComplete: boolean = false;
  failure: boolean = false;
  walletAsset: any;
  
  get formQuantity() { return this.form.get('quantity'); }
  get buyOrSell() { return this.form.get('buyOrSell'); }
  get formPrice() { return isNaN(parseFloat(this.formQuantity?.value)) ? 0 : parseFloat(this.formQuantity?.value) * this.assetPricePerUnit }

  
  ngOnInit(): void {
    this.assetPricePerUnit = parseFloat(this.asset.priceUsd);
    // Purchase Asset Form
    this.form = this.fb.group({
      buyOrSell: this.fb.control(ComponentState.Buy, Validators.required), 
      quantity: this.fb.control('', Validators.required),
      assetId: this.fb.control(this.asset.id),
      pricePerUnit: this.fb.control(this.assetPricePerUnit),
    });

    // determine whether user can sell asset

    this.buyOrSell?.valueChanges.subscribe((value) => {
      this.componentState = value;
    });

    this.form.valueChanges.subscribe((value) => {
      this.purchaseComplete = false;
    });
    
    this.walletAsset = this.mw.getWalletAsset(this.us.getUserId(), this.asset.id);
    this.canSell = (this.walletAsset != null);
    
  }

  submitForm() {
    let result;
    if (this.componentState === ComponentState.Buy) {
      result = this.mw.addToWallet(this.us.getUserId(), this.form.value);
    } else {
      result = this.mw.removeFromWallet(this.us.getUserId(), this.form.value);
    }

    if (result) {
      this.purchaseComplete = true;
      this.failure = false;
    } else {
      this.purchaseComplete = false;
      this.failure = true;
    }
    this.cdRef.detectChanges();
  }
}
