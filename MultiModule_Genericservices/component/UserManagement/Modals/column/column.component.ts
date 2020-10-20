import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
})
export class ColumnComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ColumnComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  public onChange(data): void {
    this.dialogRef.close(data);
  }
}
