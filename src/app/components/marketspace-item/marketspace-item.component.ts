import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-marketspace-item',
  templateUrl: './marketspace-item.component.html',
  styleUrls: ['./marketspace-item.component.scss']
})
export class MarketspaceItemComponent implements OnInit {
  @Input() list;
  constructor() { }

  ngOnInit() {
  }

}
