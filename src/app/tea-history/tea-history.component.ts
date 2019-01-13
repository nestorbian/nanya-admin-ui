import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tea-history',
  templateUrl: './tea-history.component.html',
  styleUrls: ['./tea-history.component.scss']
})
export class TeaHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
