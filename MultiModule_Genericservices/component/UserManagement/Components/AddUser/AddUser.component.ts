/*** Angular core module ***/ 
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { UserLables } from "../../Models/Lable.model";

/*** Lodash ***/ 
import {isNil} from 'lodash';

/*** Models ***/
import { UsersManagementModel } from '../../Models/UserManagement.model';
import { UserActivityComponent } from '../../Modals/UserActivity/UserActivityModel.component';

/*** Material module ***/
import { MatDialog } from '@angular/material/dialog';

/*** Services ***/ 
import { UserService } from '../../Services/User.service';
import { Utils } from 'projects/Admin/src/app/SharedModules/Util/Utils';

@Component({
    selector:'AddUser',
    templateUrl:'./AddUser.component.html',
    styleUrls: ['./AddUser.component.scss'],
    providers:[UserLables]
})
export class AddUserComponent implements OnInit{     
  
  /// Global variables
    public users$: Observable<UsersManagementModel[]>;
    public isLoaded$: Observable<boolean>;
    public isLoading$: Observable<boolean>;
    public userLabels: UserLables; 
    
    public userForm: FormGroup;
    public hasFormErrors = false;
    public user: UsersManagementModel; 
    public userData: any;       
     
    public userRole$:Observable<[]>;
    public hsList$:Observable<[]>;
    public floristLocations$: Observable<[]>;
   
    
    @Input() max: any;
    public maxDate = new Date();
    
    constructor(
          private fb: FormBuilder,  public dialog: MatDialog,   private router : Router,
          private activatedRoute: ActivatedRoute,  private userSerivce : UserService,
    ) { 
            this.createForm();
            this.getLocations();  
            this.getRole(); 
    }   

    ngOnInit(){       
      this.maxDate.setDate(this.maxDate.getDate());
      this.userLabels = new UserLables(); 
     
      this.activatedRoute.queryParams.subscribe(params => {        
        const id = params.uId;
        if (!isNil(id)){       
          this.userForm.controls.email.disable()        
          this.getUserDetail(id)
        }
      })
    }

  /// Get locations
    private getLocations() {
      this.floristLocations$= this.userSerivce.getLocations(48);   
      this.hsList$ = this.userSerivce.getHS();   
    }
    
  /// Get Roles
    private getRole(){    
      this.userRole$ =this.userSerivce.getRole();
     
    }

  /// Get user datail by id
    public getUserDetail(id) {     
      let params= {sid:Number(id),At: 1};
      this.userSerivce.getUserById(params).subscribe(response => {
          this.userData = response[0];            
          let artistObj =  this.userData['userArtists'];      
          let artistData = JSON.parse(artistObj);       
          let attributeData= JSON.parse(this.userData['userAttributes']);
       
           this.userForm.patchValue({
              password: this.userData.password,  
              confirmPassword: this.userData.password,            
              firstName: this.userData.firstName, 
              lastName: this.userData.lastName,            
              email:this.userData.email, 
              dob: new Date(this.userData.dob), 
              note: this.userData.note, 
              gridPage: this.userData.gridPageSize, 
              defaultLocation:this.userData.defultLocation, 
              homeScreen: this.userData.homeScreen.toString(), 
              location: this.userData['userLocation'] ? Utils.strNum(this.userData['userLocation'], "LocationId") : '',             
              attributes: attributeData,
              role:  this.userData['userRols'] ? Utils.strNum(this.userData['userRols'], "RoleId") : '', 
              addArtist:true,              
              artists: artistData[0]    
          })
        })
    }

    
  /// Create user form
    private createForm() {
        const user = new UsersManagementModel();
        this.userForm = this.fb.group({                    
            password: [user.password, Validators.required],
            confirmPassword: [user.password, Validators.required],            
            firstName: [user.firstName, Validators.required],
            lastName: [user.lastName, Validators.required],
            profileImage: [],
            status:  [true],          
            email: [user.email, Validators.required],
            dob: [user.dob],
            note: [],
            gridPage: [user.gridPageSize],
            defaultLocation: [50, Validators.required],
            homeScreen: [user.homeScreen],
            location: [user.locations, Validators.required],
            role: [user.roles, Validators.required],
            attributes:[''],
            addArtist: [false], 
            artists:['']                  
        });
    }

  /// Reset form
    public reset():void {     
          this.createForm();
          this.hasFormErrors = false;
          this.userForm.markAsPristine();
          this.userForm.markAsUntouched();
          this.userForm.updateValueAndValidity();
    }

  /// Submit data
    public  onSubmit() {
          this.hasFormErrors = false;
          const controls = this.userForm.controls;
          if (this.userForm.invalid) {
            Object.keys(controls).forEach(controlName =>controls[controlName].markAsTouched());
            this.hasFormErrors = true;         
            return false;
          }   
    }

  /// View user activity
    public viewActivity(): void {
        const addDialogRef = this.dialog.open(UserActivityComponent, {
            width: '640px', disableClose: true
        });
        addDialogRef.afterClosed().subscribe(() => {});
    }  
   
}