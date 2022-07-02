import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'container-md db'}
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
