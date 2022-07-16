import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  // name$ = this._route.params.pipe(map(params => params['name']))
  user$: Observable<User> = this._route.params.pipe(
    switchMap(params => this._userService.getUser(params['name']))
  )

  constructor(private _route: ActivatedRoute, private _userService: UserService) { }

  ngOnInit(): void {
  }

}
