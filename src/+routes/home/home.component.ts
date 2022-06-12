import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allAssets: any[];
  displayedAssets: any[];
  queryFilter: string;
  selectedSortProperty: string;
  sortByForm: FormGroup;
  sortProperies: {[key: string]: boolean} = {
    'priceUsd': false, // Sort By Price
    'changePercent24Hr': false, // Sort By Percent Change
    'volumeUsd24Hr': false, // Sort By Volume
    'marketCapUsd': false // Sort By Market Cap
  };

  // form getters
  get selectedSortByPropertyValue() {return this.sortByForm.get('selectedSortProperty')?.value }
  get selectedSortByPropertyControl() {return this.sortByForm.get('selectedSortProperty') }
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Get Assets from resolver
    this.displayedAssets = this.allAssets = this.route.snapshot.data['assets'];
    console.log('Assets', this.allAssets);

    this.sortByForm = this.fb.group({
      selectedSortProperty: this.fb.control('')
    });

    // Sort By Property Automatically When Sort By Radio is Selected
    this.selectedSortByPropertyControl?.valueChanges.subscribe((property) => {
      this.sortByProperty(property)
    })
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

  /*
    Sort By Property
  */
  sortByProperty(property: string) {
    this.sortProperies[property] = !this.sortProperies[property];
    if (this.sortProperies[property]) {
      // sort property ascending
      this.displayedAssets.sort((assetA, assetB) => {
        return parseFloat(assetA[property]) - parseFloat(assetB[property])
      });
    } else {
      // sort property descending
      this.displayedAssets.sort((assetA, assetB) => {
        return parseFloat(assetB[property]) - parseFloat(assetA[property])
      });
    }
  }

}
