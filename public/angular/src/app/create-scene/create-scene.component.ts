import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-create-scene',
  templateUrl: './create-scene.component.html',
  styleUrls: ['./create-scene.component.css']
})
export class CreateSceneComponent implements OnInit {
  createScene;
  title:String;
  backgroundImage;


  constructor(private formBuilder: FormBuilder) { 
    this.createScene = this.formBuilder.group({
      title: '',
      backgroundImage: ''
    });
  }

  ngOnInit(): void {
  }

  allowed = [
    'Hond',
    'Vogel',
    'Zwarte bloem',
    'Boom',
    'Groene boom',
    'Plant',
    'Schaap'
  ];

  not_allowed = [
    'Fortnite',
    'Apple'
  ];

 

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  onSubmit(data) {
    console.log(data);
  }


}
