import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MyWalletService } from 'src/services/my-wallet/my-wallet.service';
import { UserService } from 'src/services/user/user.service';
import { ComponentState } from '../../components/asset-details/asset-details.component';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  asset: any;
  assetPricePerUnit: number;
  assetHistory: any[];
  lineChartData: ChartConfiguration['data'];
  lineChartPriceData: any[] = [];
  lineChartDateData: string[] = [];
  
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  readonly ComponentState: typeof ComponentState = ComponentState;

  form: FormGroup;
  get formQuantity() { return this.form.get('quantity'); }
  get formPrice() { return isNaN(parseFloat(this.formQuantity?.value)) ? 0 : parseFloat(this.formQuantity?.value) * this.assetPricePerUnit }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private mw: MyWalletService,
    private us: UserService) { }

  ngOnInit(): void {
    this.asset = this.route.snapshot.data['asset'];
    this.assetPricePerUnit = parseFloat(this.asset.priceUsd);
    this.assetHistory = this.route.snapshot.data['assetHistory'];
    console.log('assetHistory', this.assetHistory)

    // Format Data For Chart
    this.assetHistory.forEach(data => {
      // this.lineChartPriceData.push(this.currencyPipe.transform(data.priceUsd));
      this.lineChartPriceData.push(parseFloat(data.priceUsd))
      const date = new Date(data.date);
      this.lineChartDateData.push(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    });
    console.log('lineChartPriceData', this.lineChartPriceData);
    console.log('lineChartDateData', this.lineChartDateData);
    this.lineChartData = {
      datasets: [
        {
          label: this.asset.name + " (" + this.asset.symbol + ")",
          data: this.lineChartPriceData,
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ],
      labels: this.lineChartDateData
    };

    // Purchase Asset Form
    this.form = this.fb.group({
      quantity: this.fb.control('', Validators.required),
      assetId: this.fb.control(this.asset.id),
      pricePerUnit: this.fb.control(this.assetPricePerUnit),
    })
  }

  submitForm() {
    console.log('submit form')
    console.log(this.form.value);
    this.mw.addToWallet(this.us.getUserId(), this.form.value)
    
  }
}
