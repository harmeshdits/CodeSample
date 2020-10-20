import { BaseModel } from 'projects/Admin/src/app/CoreModule/Models/_base.model';

export class Tasks extends BaseModel {
    taskId: number;
    title: string;    
    description: string;
    dueDate: string;   
    createdAt: string;
    status: string;   
  }
  