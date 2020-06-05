import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-assign-object',
  templateUrl: './assign-object.component.html',
  styleUrls: ['./assign-object.component.css']
})
export class AssignObjectComponent implements OnInit {
    scenes = [];
    form1;
    selectScene: string = '';
    selectedValue: string = '';

    prohibited = [
        'Apex',
        'Android'
    ];

    allowed= [
        'Fortnite',
        '90s',
        'Bouwen',
        'Noskin',
        'Slurp juice',
        'Boom bow',
        'Quadruple ramp'
    ];

    constructor(private formBuilder: FormBuilder) {

    this.scenes = [
        "test",
        "test2",
    ]

    this.form1 = this.formBuilder.group({
      selectScene: '',
      selectedValue: ''
    });

  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.form1.value);
  }

  onSubmit(formData1){
    console.log(formData1);
  }

  onChangeScene(sceneValue) {
      this.selectScene = sceneValue;
      console.log(sceneValue);
  }



    drop(event: CdkDragDrop<string[]>) {
        console.log(event.container['data'])
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

}
