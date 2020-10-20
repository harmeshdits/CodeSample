// Angular
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-user-delete-modal',
	templateUrl: './DeleteModal.component.html'
})
export class DeleteModalComponent {
	// Public properties
	viewLoading = false;

	constructor(
		public dialogRef: MatDialogRef<DeleteModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
	) {
        console.log(this.data)
     }	
	

	/* Close dialog with false result */
	onNoClick(): void {
		this.dialogRef.close();
	}

	/* Close dialog with true result */
	onYesClick(): void {
		/* Server loading imitation. Remove this */
		this.viewLoading = true;
		setTimeout(() => {
			this.dialogRef.close(true); // Keep only this row
		}, 2500);
	}
}
