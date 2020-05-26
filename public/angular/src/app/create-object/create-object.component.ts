import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {
  createProp;
  propName;
  model;
  audio;
  animationMixer;

  constructor(private formBuilder: FormBuilder) {
    this.createProp = this.formBuilder.group({
      propName: '',
      model: '',
      audio: '',
      animationMixer: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    console.log(data);
  }
}

