import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css'],
})
export class CreateObjectComponent implements OnInit {
  createProp;
  selectedValue
  propTypes = ['Model', 'Background'];
  propName;
  propType;
  audio;
  model;
  animationMixer;
  backgroundImage;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.audio);
    this.createProp = this.formBuilder.group(
      {
      propType: '',
    });
  } 

  onChangePropType(propTypeValue) {
    this.audio = undefined;
    this.propType = propTypeValue;
    if(propTypeValue == 'Model'){
      this.createProp = this.formBuilder.group(
        {
        propName: '',
        propType: propTypeValue,
        model: '',
        audio: '',
        volume: '',
        animationMixer: ''
      });
    }
    else if(propTypeValue == 'Background') {
      this.createProp = this.formBuilder.group(
        {
        propName: '',
        propType: propTypeValue,
        backgroundImage: '',
        audio: '',
        volume: ''
      });
    }
  }

  onChangeAudio(fileValue) {
    if(fileValue != undefined){
      this.audio = fileValue;
    }
  }

  onChangeModel(fileValue) {
    if(fileValue != undefined){
      this.model = fileValue;
    }
  }

  onChangeBG(fileValue) {
    if(fileValue != undefined) {
      this.backgroundImage = fileValue;
    }
  }

  onSubmit(data){
    console.log(data);
  }
}

