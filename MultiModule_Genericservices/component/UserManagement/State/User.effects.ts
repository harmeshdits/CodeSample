import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './User.actions';
import { UserService } from '../Services/User.service';

import { of } from 'rxjs';
import { exhaustMap, startWith, catchError, switchMap} from 'rxjs/operators';
import { UserRequestModel } from '../Models/UserRequest.model';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,        
        private userSerice : UserService
    ) {  } 
        
    loadUsers$ = createEffect(()=> this.actions$.pipe(
        ofType(UserActions.UsersLoadRequest),
        startWith(UserActions.UsersLoadRequest),
        exhaustMap(()=> this.userSerice.GetStaffList(new UserRequestModel())      
        .pipe(
                switchMap((Users)=>[                   
                    UserActions.UsersLoadedSuccess({Users})                    
                ]),catchError((error: any) => of(UserActions.UsersLoadedFailed(error)))
            )      
        )), { dispatch: true })  
        
    
}