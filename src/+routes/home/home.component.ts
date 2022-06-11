import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinccapService } from '../../services/coincap/coinccap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  assets: any;

  constructor(private cc: CoinccapService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.assets = this.route.snapshot.data['assets'];
    console.log('Assets', this.assets);
  }

}
