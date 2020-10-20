/* ngrx core modules */
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
/* models */
import { UsersManagementModel } from '../Models/UserManagement.model';
import { UserRequestModel } from '../Models/UserRequest.model';

export const UsersLoadRequest = createAction("[User List] User GET Service Request",  props<{ User: UserRequestModel }>());
export const UsersLoadedSuccess = createAction("[User List Component] Courses loaded success", props<{ Users: UsersManagementModel[] }>());
export const UsersLoadedFailed = createAction("[User List Component] Courses loaded Failed", props<{ error: any }>());


export const UserPostRequest = createAction("[User Effect] User POST Api Request", props<{ User: UsersManagementModel }>());
export const UserPostSuccess = createAction("[User Component] User Post Success", props<{ User: UsersManagementModel }>());
export const UserPostFailed = createAction("[User Component] User Post Failed", props<{ error: any }>());

export const UserUpdateRequest = createAction("[User List Component] User Update Api Request", props<{ update: Update<UsersManagementModel> }>());
export const UserUpdateSuccess = createAction("[User List Component] Update User Success", props<{ payload: UsersManagementModel }>());
export const UserUpdateFailed = createAction("[User List Component] Update User Failed", props<{ error: any }>());


export const ShowLoader = createAction('[Utility] Show Loader');
export const HideLoader = createAction('[Utility] Show Loader');

export const courseActionTypes = {
    UsersLoadRequest, UsersLoadedSuccess, UsersLoadedFailed,
    UserPostRequest, UserPostSuccess, UserPostFailed,    
    UserUpdateRequest, UserUpdateSuccess, UserUpdateFailed
} 