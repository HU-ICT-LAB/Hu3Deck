import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-assign-object',
  templateUrl: './assign-object.component.html',
  styleUrls: ['./assign-object.component.css']
})
export class AssignObjectComponent implements OnInit {
  form1;
  form2;
  form3;
  form4;
  form5;

  constructor(private formBuilder: FormBuilder) {

    this.form1 = this.formBuilder.group({
      selectScene: '',
      duration: 0,
      loop: '',
      direction: ''
    });

    this.form2 = this.formBuilder.group({
      xPosition: 0,
      yPosition: 0,
      zPosition: 0
    });

    this.form3 = this.formBuilder.group({
      xPositionTo: 0,
      yPositionTo: 0,
      zPositionTo: 0
    });

    this.form4 = this.formBuilder.group({
      xScale: 0,
      yScale: 0,
      zScale: 0
    });

    this.form5 = this.formBuilder.group({
      xRotation: 0,
      yRotation: 0,
      zRotation: 0
    });
  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.form3.value);
  }

  onSubmit(formData1, formData2, formData3, formData4, formData5){
    console.log(formData1);
    console.log(formData2);
    console.log(formData3);
    console.log(formData4);
    console.log(formData5);
  }

}
