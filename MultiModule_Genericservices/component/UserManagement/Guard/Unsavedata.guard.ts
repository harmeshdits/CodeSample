import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddUserComponent } from '../Components/AddUser/AddUser.component';

@Injectable()
export class HasUnsavedDataGuard implements CanDeactivate<AddUserComponent> {

  canDeactivate(component: AddUserComponent): boolean {
  
    if (component.userForm.dirty) {
      return confirm('You have some unsaved data. Are you sure, you want to leave this page without save?');
    }
    return true;
  }
}