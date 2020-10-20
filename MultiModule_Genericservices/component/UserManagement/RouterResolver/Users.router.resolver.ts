/**** Angular core modules ***/
import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';

/*** Model Classes ***/ 
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

/*** ngrx ***/
import { select, Store } from '@ngrx/store';
import { areUsersLoaded } from '../State/User.selectors';
import { UsersLoadRequest } from '../State/User.actions';
import { Users } from '../State/User.state';
import { UserRequestModel } from '../Models/UserRequest.model';


@Injectable()
export class UsersResolver implements Resolve<Observable<any>> {
    
    constructor(private store: Store<Users>) {  }  
    resolve(): Observable<any> {
        return this.store.pipe(select(areUsersLoaded), tap((userLoaded) => {
            if (!userLoaded) {                
                this.store.dispatch(UsersLoadRequest({User: new UserRequestModel}));
            }
        }), filter(userLoaded => userLoaded),first());
    }
}