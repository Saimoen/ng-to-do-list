import { ITask } from './../model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  toDoForm !: FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask [] = [];
  done: ITask [] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.toDoForm = this.fb.group({
      item : ['', Validators.required]
    })
  }

  addTask(){
    this.tasks.push({
      description: this.toDoForm.value.item,
      done: false
    });
    this.toDoForm.reset()
  }

  deleteTask(i: number){
    this.tasks.splice(i, 1)
  }

  deleteInProgressTask(i: number){
    this.inprogress.splice(i, 1)
  }

  deleteDoneTask(i: number){
    this.done.splice(i, 1)
  }

  onEdit(item: ITask, i : number) {
    this.toDoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.toDoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.toDoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
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
