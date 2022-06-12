import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ComponentState } from '../../components/asset-details/asset-details.component';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  asset: any;
  assetHistory: any[];
  lineChartData: ChartConfiguration['data'];
  lineChartPriceData: any[] = [];
  lineChartDateData: string[] = [];
  
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  readonly ComponentState: typeof ComponentState = ComponentState;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.asset = this.route.snapshot.data['asset'];
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

  }

}
