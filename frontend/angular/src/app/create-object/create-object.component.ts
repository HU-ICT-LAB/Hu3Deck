import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {
  createProp;
  propTypes = ['Model', 'Background'];
  propName;
  propType;
  audio;
  volume = 50;
  model;
  animationMixer;
  backgroundImage;
  movement;
  movements = ['Stationary', 'Linear', 'Rotation'];
  xScale;
  yScale;
  zScale;
  xPosition;
  yPosition;
  zPosition;
  xToPosition;
  yToPosition;
  zToPosition;
  xOuterPosition;
  yOuterPosition;
  zOuterPosition;
  duration;
  loop;
  easing;
  xRotation;
  yRotation;
  zRotation;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createProp = this.formBuilder.group(
      {
        propType:'',
        propName:'',
        model:'',
        audio: '',
        volume:50,
        animationMixer:'',
        xScale:0,
        yScale:0,
        zScale:0,
        xRotation:0,
        yRotation:0,
        zRotation:0,
        backgroundImage:'',
        movement:'',
        xPosition:0,
        yPosition:0,
        zPosition:0,
        xToPosition:0,
        yToPosition:0,
        zToPosition:0,
        xOuterPosition:0,
        yOuterPosition:0,
        zOuterPosition:0,
        duration:5000,
        loop:'false',
        easing:''
      }
    )
  } 

  onChangePropType(propTypeValue) {
    this.audio = undefined;
    this.model = undefined;
    this.backgroundImage = undefined;
    this.propType = propTypeValue;
  }

  onChangeMovement(movementType){
    this.movement = movementType;
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

  onInputVolume(volumeValue){
    this.volume = volumeValue;
  }

  onSubmit(data){
    if(this.propType == 'Model'){
      if(this.movement == 'Stationary'){
        delete data.backgroundImage;
        delete data.xToPosition;
        delete data.yToPosition;
        delete data.zToPosition;
        delete data.xOuterPosition;
        delete data.yOuterPosition;
        delete data.zOuterPosition;
        delete data.duration;
        delete data.loop;
        delete data.easing;
        console.log(data);
      }
      else if(this.movement == 'Linear'){
        delete data.backgroundImage;
        delete data.xOuterPosition;
        delete data.yOuterPosition;
        delete data.zOuterPosition;
        console.log(data);
      }
      else if(this.movement == 'Rotation'){
        delete data.backgroundImage;
        console.log(data);
      }
    }
    else if(this.propType == 'Background'){
      delete data.model;
      delete data.animationMixer;
      delete data.movement;
      delete data.xScale;
      delete data.yScale;
      delete data.zScale;
      delete data.xRotation;
      delete data.yRotation;
      delete data.zRotation;
      delete data.xPosition;
      delete data.yPosition;
      delete data.zPosition;
      delete data.xToPosition;
      delete data.yToPosition;
      delete data.zToPosition;
      delete data.xOuterPosition;
      delete data.yOuterPosition;
      delete data.zOuterPosition;
      delete data.duration;
      delete data.loop;
      delete data.easing;
      console.log(data);
    }
  }
}

