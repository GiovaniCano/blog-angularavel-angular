import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
