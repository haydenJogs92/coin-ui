import { Component, Input, OnInit } from '@angular/core';
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
    private us: UserService
  ) { }

  @Input() asset: any;
  readonly ComponentState: typeof ComponentState = ComponentState;
  componentState = ComponentState.Buy;
  form: FormGroup;
  assetPricePerUnit: number;
  
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

    this.buyOrSell?.valueChanges.subscribe((value) => {
      this.componentState = value;
    });
  }

  submitForm() {
    if (this.componentState === ComponentState.Buy) {
      this.mw.addToWallet(this.us.getUserId(), this.form.value);
    } else {
      this.mw.removeFromWallet(this.us.getUserId(), this.form.value);
    }
    
  }
}
