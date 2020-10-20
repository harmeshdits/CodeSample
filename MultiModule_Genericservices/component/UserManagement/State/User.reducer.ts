/* ngrx core modules */
import { createReducer, on} from "@ngrx/store";
import * as userActions from './User.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Users } from './User.state';


/* models */
export interface UserState extends EntityState<Users> {
    isLoaded?: boolean;
    error?: string;
    isLoading: boolean;
}

/* create entity adaptor instance */
export const adapter: EntityAdapter<Users> = createEntityAdapter<Users>({
    selectId: entity => entity.staffId,
    sortComparer: (l: Users, r: Users) => l.staffId.toString().localeCompare(r.staffId.toString())
})

/* initial state */
export const initialState: UserState = adapter.getInitialState({
    isLoaded: false,
    isLoading: false,
    error: null,
});

/* create reducer */
export const reducer = createReducer(
    initialState,
    on(userActions.UsersLoadRequest, (state) => {
        return { ...state, isLoaded: false }
    }),
    on(userActions.UsersLoadedSuccess, (state,action) => {
        return adapter.addAll(action.Users,{ ...state, isLoaded: true })
    }),
    on(userActions.UsersLoadedFailed, (state, action) => {
        return { ...state, isLoaded: false, error: action.error }
    }),
    
);

export const { selectAll, selectIds } = adapter.getSelectors();