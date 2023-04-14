import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from './../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  todoForm !: FormGroup;
  todoList : ITask [] = [];
  inProgress : ITask [] = [];
  done : ITask [] = [];
  updateId !: any;
  isEditEnabled : boolean = false;


  constructor(private fb : FormBuilder) {}

 ngOnInit() {
   this.todoForm = this.fb.group({
     item : ['',Validators.required]
   });
 }
 onEdit(item : ITask , i : number){
  this.todoForm.controls['item'].setValue(item.description);
  this.updateId = i;
  this.isEditEnabled = true;
 }
 updateTask(){
   this.todoList[this.updateId].description = this.todoForm.value.item;
   this.todoList[this.updateId].done = false;
   this.todoForm.reset();
   this.updateId= undefined;
   this.isEditEnabled = false;
 }

addTask(){
  this.todoList.push({
    description:this.todoForm.value.item,
    done:false
  })
  this.todoForm.reset();
}

deleteTask(i:number){
  this.todoList.splice(i, 1);
}
deleteInProgressTask(i:number){
  this.inProgress.splice(i, 1);
}
deleteDoneTask(i:number){
  this.done.splice(i, 1);
}
 drop(event: CdkDragDrop<ITask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
}
