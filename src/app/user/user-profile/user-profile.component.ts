import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { mT } from 'src/app/helpers';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  user$: Observable<User> = this._route.params.pipe(
    switchMap(params => this._userService.getUser(params['name']).pipe(
      tap(user => this._title.setTitle(mT(user.name)))
    ))
  )

  constructor(private _route: ActivatedRoute, private _userService: UserService, private _title: Title) { }

  ngOnInit(): void {
  }

}
