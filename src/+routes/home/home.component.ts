import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { CoinccapService } from '../../services/coincap/coinccap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allAssets: any[];
  displayedAssets: any[];
  queryFilter: any;
  
  constructor(private cc: CoinccapService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.displayedAssets = this.allAssets = this.route.snapshot.data['assets'];  
    console.log('Assets', this.allAssets);
  }

  
  /*
    Filter Results By Name and Symbol
  */
    filterResults(queryFilter: string) {
    const formattedQuery = queryFilter.toLowerCase();
    this.displayedAssets = this.allAssets.filter((asset) => {
      return (
        asset.name.toLowerCase().includes(formattedQuery) ||
        asset.symbol.toLowerCase().includes(formattedQuery)
      )
    })
    if (queryFilter == '') {
      this.displayedAssets = this.allAssets;
    }
  }

}
