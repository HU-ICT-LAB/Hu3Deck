import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {
  createProp;
  propTypes = ['Model', 'Background'];
  movements = ['Stationary', 'Linear', 'Rotation'];
  propType;
  movement;
  volume = 50;
  backgroundImage;
  audio;
  model;
  triggerSwitch = true;
  backgroundImageFile;
  modelFile;
  audioFile;
  valid = false;


  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.createProp = this.formBuilder.group(
      {
        propType:'',
        propName:'',
        model: '',
        audio: '',
        volume:50,
        animationMixer:'',
        xScale:0,
        yScale:0,
        zScale:0,
        xRotation:0,
        yRotation:0,
        zRotation:0,
        backgroundImage: '',
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
        easing: '',
        triggerName: '',
        token: ''
      }
    );
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

  onChangeAudio(event) {
    if(event.target.files.length > 0){
      this.audio = event.target.files[0].name;
      this.audioFile = event.target.files[0];
    }
  }

  onChangeModel(event) {
    if(event.target.files.length > 0){
      this.model = event.target.files[0].name;
      this.modelFile = event.target.files[0];
    }
  }

  onChangeBG(event) {
    if(event.target.files.length > 0){
      this.backgroundImage = event.target.files[0].name;
      this.backgroundImageFile = event.target.files[0];
    }
  }

  onInputVolume(volumeValue){
    this.volume = volumeValue;
  }

  onSubmit(data){
    var propNameValidate = document.getElementById("propNameValidate");
    var backgroundValidate = document.getElementById("backgroundValidate");
    var modelValidate = document.getElementById("modelValidate");
    var xScaleValidate = document.getElementById("xScaleValidate");
    var yScaleValidate = document.getElementById("yScaleValidate");
    var zScaleValidate = document.getElementById("zScaleValidate");
    var xRotationValidate = document.getElementById("xRotationValidate");
    var yRotationValidate = document.getElementById("yRotationValidate");
    var zRotationValidate = document.getElementById("zRotationValidate");
    var xPositionValidate = document.getElementById("xPositionValidate");
    var yPositionValidate = document.getElementById("yPositionValidate");
    var zPositionValidate = document.getElementById("zPositionValidate");
    var xToPositionValidate = document.getElementById("xToPositionValidate");
    var yToPositionValidate = document.getElementById("yToPositionValidate");
    var zToPositionValidate = document.getElementById("zToPositionValidate");
    var xOuterPositionValidate = document.getElementById("xOuterPositionValidate");
    var yOuterPositionValidate = document.getElementById("yOuterPositionValidate");
    var zOuterPositionValidate = document.getElementById("zOuterPositionValidate");
    var durationValidate = document.getElementById("durationValidate");
    var loopValidate = document.getElementById("loopValidate");
    
    const name = this.createProp.get('triggerName').value;
    const token = this.createProp.get('token').value;
    const apiLink = 'https://maker.ifttt.com/trigger/' + name + '/with/key/' + token + '?value1=';
    // this.webhookApi(apiLink);

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

        if(data.propName == ''){
          propNameValidate.innerHTML = "<label style='color:red;'>Prop Name is required.</label>";
          this.valid = false;
        }
        else
        {
          propNameValidate.innerHTML = "";
        }

        if(this.modelFile == undefined || data.model == undefined){
          modelValidate.innerHTML = "<label style='color:red;'>Model is required.</label>";
          this.valid = false;
        }
        else
        {
          modelValidate.innerHTML = "";
        }

        if(data.xScale == null){
          xScaleValidate.innerHTML = "<label style='color:red;'>X scale is required.</label>";
          this.valid = false;
        }
        else
        {
          xScaleValidate.innerHTML = "";
        }

        if(data.yScale == null){
          yScaleValidate.innerHTML = "<label style='color:red;'>Y scale is required.</label>";
          this.valid = false;
        }
        else
        {
          yScaleValidate.innerHTML = "";
        }

        if(data.zScale == null){
          zScaleValidate.innerHTML = "<label style='color:red;'>Z scale is required.</label>";
          this.valid = false;
        }
        else
        {
          zScaleValidate.innerHTML = "";
        }

        
        if(data.xRotation == null){
          xRotationValidate.innerHTML = "<label style='color:red;'>X rotation is required.</label>";
          this.valid = false;
        }
        else
        {
          xRotationValidate.innerHTML = "";
        }

        if(data.yRotation == null){
          yRotationValidate.innerHTML = "<label style='color:red;'>Y rotation is required.</label>";
          this.valid = false;
        }
        else
        {
          yRotationValidate.innerHTML = "";
        }

        if(data.zRotation == null){
          zRotationValidate.innerHTML = "<label style='color:red;'>Z rotation is required.</label>";
          this.valid = false;
        }
        else
        {
          zRotationValidate.innerHTML = "";
        }

        if(data.xPosition == null){
          xPositionValidate.innerHTML = "<label style='color:red;'>X Position is required.</label>";
          this.valid = false;
        }
        else
        {
          xPositionValidate.innerHTML = "";
        }

        if(data.yPosition == null){
          yPositionValidate.innerHTML = "<label style='color:red;'>Y Position is required.</label>";
          this.valid = false;
        }
        else
        {
          yPositionValidate.innerHTML = "";
        }

        if(data.zPosition == null){
          zPositionValidate.innerHTML = "<label style='color:red;'>Z Position is required.</label>";
          this.valid = false;
        }
        else
        {
          zPositionValidate.innerHTML = "";
        }

        if(propNameValidate.innerHTML == "" && modelValidate.innerHTML == "" && 
        xScaleValidate.innerHTML == "" && yScaleValidate.innerHTML == "" &&
        zScaleValidate.innerHTML == "" && xRotationValidate.innerHTML == "" &&
        yRotationValidate.innerHTML == "" && zRotationValidate.innerHTML == "" &&
        xPositionValidate.innerHTML == "" &&  yPositionValidate.innerHTML == "" &&
        zPositionValidate.innerHTML == "")
        {
          this.valid = true;
        }

        if(!this.valid){   
          return;
        }

        data.modelFile = this.modelFile;
        data.audioFile = this.audioFile;
    
        const body = new FormData();
        body.append('modelFile', this.modelFile);
        body.append('audioFile', this.audioFile);
        body.append('propName', data.propName);
        body.append('propType', data.propType);
        body.append('model', data.model = this.model);
        body.append('audio', data.audio = this.audio);
        body.append('volume', data.volume);
        body.append('animationMixer', data.animationMixer);
        body.append('xScale', data.xScale);
        body.append('yScale', data.yScale);
        body.append('zScale', data.zScale);
        body.append('xRotation', data.xRotation);
        body.append('yRotation', data.yRotation);
        body.append('zRotation', data.zRotation);
        body.append('movement', data.movement);
        body.append('xPosition', data.xPosition);
        body.append('yPosition', data.yPosition);
        body.append('zPosition', data.zPosition);
        body.append('url', apiLink);

        this.http.post('http://localhost:3000/prop/createModel', body).subscribe(dataa => {
          console.log(dataa);
        }, response => {
          console.log(response);
        });
      }
      else if(this.movement == 'Linear'){
        delete data.backgroundImage;
        delete data.xOuterPosition;
        delete data.yOuterPosition;
        delete data.zOuterPosition;
        
        if(data.propName == ''){
          propNameValidate.innerHTML = "<label style='color:red;'>Prop Name is required.</label>";
          this.valid = false;
        }
        else
        {
          propNameValidate.innerHTML = "";
        }

        if(this.modelFile == undefined || data.model == undefined){
          modelValidate.innerHTML = "<label style='color:red;'>Model is required.</label>";
          this.valid = false;
        }
        else
        {
          modelValidate.innerHTML = "";
        }

        if(data.xScale == null){
          xScaleValidate.innerHTML = "<label style='color:red;'>X scale is required.</label>";
          this.valid = false;
        }
        else
        {
          xScaleValidate.innerHTML = "";
        }

        if(data.yScale == null){
          yScaleValidate.innerHTML = "<label style='color:red;'>Y scale is required.</label>";
          this.valid = false;
        }
        else
        {
          yScaleValidate.innerHTML = "";
        }

        if(data.zScale == null){
          zScaleValidate.innerHTML = "<label style='color:red;'>Z scale is required.</label>";
          this.valid = false;
        }
        else
        {
          zScaleValidate.innerHTML = "";
        }

        
        if(data.xRotation == null){
          xRotationValidate.innerHTML = "<label style='color:red;'>X rotation is required.</label>";
          this.valid = false;
        }
        else
        {
          xRotationValidate.innerHTML = "";
        }

        if(data.yRotation == null){
          yRotationValidate.innerHTML = "<label style='color:red;'>Y rotation is required.</label>";
          this.valid = false;
        }
        else
        {
          yRotationValidate.innerHTML = "";
        }

        if(data.zRotation == null){
          zRotationValidate.innerHTML = "<label style='color:red;'>Z rotation is required.</label>";
          this.valid = false;
        }
        else
        {
          zRotationValidate.innerHTML = "";
        }

        if(data.xPosition == null){
          xPositionValidate.innerHTML = "<label style='color:red;'>X Position is required.</label>";
          this.valid = false;
        }
        else
        {
          xPositionValidate.innerHTML = "";
        }

        if(data.yPosition == null){
          yPositionValidate.innerHTML = "<label style='color:red;'>Y Position is required.</label>";
          this.valid = false;
        }
        else
        {
          yPositionValidate.innerHTML = "";
        }

        if(data.zPosition == null){
          zPositionValidate.innerHTML = "<label style='color:red;'>Z Position is required.</label>";
          this.valid = false;
        }
        else
        {
          zPositionValidate.innerHTML = "";
        }

        if(data.xToPosition == null){
          xToPositionValidate.innerHTML = "<label style='color:red;'>X To Position is required.</label>";
          this.valid = false;
        }
        else
        {
          xToPositionValidate.innerHTML = "";
        }

        if(data.yToPosition == null){
          yToPositionValidate.innerHTML = "<label style='color:red;'>Y To Position is required.</label>";
          this.valid = false;
        }
        else
        {
          yToPositionValidate.innerHTML = "";
        }

        if(data.zToPosition == null){
          zToPositionValidate.innerHTML = "<label style='color:red;'>Z To Position is required.</label>";
          this.valid = false;
        }
        else
        {
          zToPositionValidate.innerHTML = "";
        }

        if(data.duration == null){
          durationValidate.innerHTML = "<label style='color:red;'>Duration is required.</label>";
          this.valid = false;
        }
        else
        {
          durationValidate.innerHTML = "";
        }

        if(data.loop == ""){
          loopValidate.innerHTML = "<label style='color:red;'>Loop is required.</label>";
          this.valid = false;
        }
        else
        {
          loopValidate.innerHTML = "";
        }


        if(propNameValidate.innerHTML == "" && modelValidate.innerHTML == "" && 
        xScaleValidate.innerHTML == "" && yScaleValidate.innerHTML == "" &&
        zScaleValidate.innerHTML == "" && xRotationValidate.innerHTML == "" &&
        yRotationValidate.innerHTML == "" && zRotationValidate.innerHTML == "" &&
        xPositionValidate.innerHTML == "" &&  yPositionValidate.innerHTML == "" &&
        zPositionValidate.innerHTML == "" && xToPositionValidate.innerHTML == "" &&
        yToPositionValidate.innerHTML == "" && zToPositionValidate.innerHTML == "" &&
        durationValidate.innerHTML == "" && loopValidate.innerHTML == "")
        {
          this.valid = true;
        }

        if(!this.valid){   
          return;
        }

        data.modelFile = this.modelFile;
        data.audioFile = this.audioFile;
    
        const body = new FormData();
        body.append('modelFile', this.modelFile);
        body.append('audioFile', this.audioFile);
        body.append('propName', data.propName);
        body.append('propType', data.propType);
        body.append('model', data.model = this.model);
        body.append('audio', data.audio = this.audio);
        body.append('volume', data.volume);
        body.append('animationMixer', data.animationMixer);
        body.append('xScale', data.xScale);
        body.append('yScale', data.yScale);
        body.append('zScale', data.zScale);
        body.append('xRotation', data.xRotation);
        body.append('yRotation', data.yRotation);
        body.append('zRotation', data.zRotation);
        body.append('movement', data.movement);
        body.append('xPosition', data.xPosition);
        body.append('yPosition', data.yPosition);
        body.append('zPosition', data.zPosition);
        body.append('xToPosition', data.xToPosition);
        body.append('yToPosition', data.yToPosition);
        body.append('zToPosition', data.zToPosition);
        body.append('duration', data.duration);
        body.append('loop', data.loop);
        body.append('easing', data.easing);
        body.append('url', apiLink);

        this.http.post('http://localhost:3000/prop/createModel', body).subscribe(dataa => {
          console.log(dataa);
        }, response => {
          console.log(response);
        });
      }
      else if(this.movement == 'Rotation'){
        delete data.backgroundImage;
        console.log(data);

        const options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

        if(data.propName == ''){
          propNameValidate.innerHTML = "<label style='color:red;'>Prop Name is required.</label>";
          this.valid = false;
        }
        else
        {
          propNameValidate.innerHTML = "";
        }

        if(this.modelFile == undefined || data.model == undefined){
          modelValidate.innerHTML = "<label style='color:red;'>Model is required.</label>";
          this.valid = false;
        }
        else
        {
          modelValidate.innerHTML = "";
        }

        if(data.xScale == null){
          xScaleValidate.innerHTML = "<label style='color:red;'>X scale is required.</label>";
          this.valid = false;
        }
        else
        {
          xScaleValidate.innerHTML = "";
        }

        if(data.yScale == null){
          yScaleValidate.innerHTML = "<label style='color:red;'>Y scale is required.</label>";
          this.valid = false;
        }
        else
        {
          yScaleValidate.innerHTML = "";
        }

        if(data.zScale == null){
          zScaleValidate.innerHTML = "<label style='color:red;'>Z scale is required.</label>";
          this.valid = false;
        }
        else
        {
          zScaleValidate.innerHTML = "";
        }

        
        if(data.xRotation == null){
          xRotationValidate.innerHTML = "<label style='color:red;'>X rotation is required.</label>";
          this.valid = false;
        }
        else
        {
          xRotationValidate.innerHTML = "";
        }

        if(data.yRotation == null){
          yRotationValidate.innerHTML = "<label style='color:red;'>Y rotation is required.</label>";
          this.valid = false;
        }
        else
        {
          yRotationValidate.innerHTML = "";
        }

        if(data.zRotation == null){
          zRotationValidate.innerHTML = "<label style='color:red;'>Z rotation is required.</label>";
          this.valid = false;
        }
        else
        {
          zRotationValidate.innerHTML = "";
        }

        if(data.xPosition == null){
          xPositionValidate.innerHTML = "<label style='color:red;'>X Position is required.</label>";
          this.valid = false;
        }
        else
        {
          xPositionValidate.innerHTML = "";
        }

        if(data.yPosition == null){
          yPositionValidate.innerHTML = "<label style='color:red;'>Y Position is required.</label>";
          this.valid = false;
        }
        else
        {
          yPositionValidate.innerHTML = "";
        }

        if(data.zPosition == null){
          zPositionValidate.innerHTML = "<label style='color:red;'>Z Position is required.</label>";
          this.valid = false;
        }
        else
        {
          zPositionValidate.innerHTML = "";
        }

        if(data.xToPosition == null){
          xToPositionValidate.innerHTML = "<label style='color:red;'>X To Position is required.</label>";
          this.valid = false;
        }
        else
        {
          xToPositionValidate.innerHTML = "";
        }

        if(data.yToPosition == null){
          yToPositionValidate.innerHTML = "<label style='color:red;'>Y To Position is required.</label>";
          this.valid = false;
        }
        else
        {
          yToPositionValidate.innerHTML = "";
        }

        if(data.zToPosition == null){
          zToPositionValidate.innerHTML = "<label style='color:red;'>Z To Position is required.</label>";
          this.valid = false;
        }
        else
        {
          zToPositionValidate.innerHTML = "";
        }

        if(data.xOuterPosition == null){
          xOuterPositionValidate.innerHTML = "<label style='color:red;'>X Outer Position is required.</label>";
          this.valid = false;
        }
        else
        {
          xOuterPositionValidate.innerHTML = "";
        }

        if(data.yOuterPosition == null){
          yOuterPositionValidate.innerHTML = "<label style='color:red;'>Y Outer Position is required.</label>";
          this.valid = false;
        }
        else
        {
          yOuterPositionValidate.innerHTML = "";
        }

        if(data.zOuterPosition == null){
          zOuterPositionValidate.innerHTML = "<label style='color:red;'>Z Outer Position is required.</label>";
          this.valid = false;
        }
        else
        {
          zOuterPositionValidate.innerHTML = "";
        }

        if(data.duration == null){
          durationValidate.innerHTML = "<label style='color:red;'>Duration is required.</label>";
          this.valid = false;
        }
        else
        {
          durationValidate.innerHTML = "";
        }

        if(data.loop == ""){
          loopValidate.innerHTML = "<label style='color:red;'>Loop is required.</label>";
          this.valid = false;
        }
        else
        {
          loopValidate.innerHTML = "";
        }


        if(propNameValidate.innerHTML == "" && modelValidate.innerHTML == "" && 
        xScaleValidate.innerHTML == "" && yScaleValidate.innerHTML == "" &&
        zScaleValidate.innerHTML == "" && xRotationValidate.innerHTML == "" &&
        yRotationValidate.innerHTML == "" && zRotationValidate.innerHTML == "" &&
        xPositionValidate.innerHTML == "" &&  yPositionValidate.innerHTML == "" &&
        zPositionValidate.innerHTML == "" && xToPositionValidate.innerHTML == "" &&
        yToPositionValidate.innerHTML == "" && zToPositionValidate.innerHTML == "" &&
        durationValidate.innerHTML == "" && loopValidate.innerHTML == "" &&
        xOuterPositionValidate.innerHTML == "" && yOuterPositionValidate.innerHTML == "" &&
        zOuterPositionValidate.innerHTML == "")
        {
          this.valid = true;
        }

        if(!this.valid){   
          return;
        }
  
        data.modelFile = this.modelFile;
        data.audioFile = this.audioFile;
    
        const body = new FormData();
        body.append('modelFile', this.modelFile);
        body.append('audioFile', this.audioFile);
        body.append('propName', data.propName);
        body.append('propType', data.propType);
        body.append('model', data.model = this.model);
        body.append('audio', data.audio = this.audio);
        body.append('volume', data.volume);
        body.append('animationMixer', data.animationMixer);
        body.append('xScale', data.xScale);
        body.append('yScale', data.yScale);
        body.append('zScale', data.zScale);
        body.append('xRotation', data.xRotation);
        body.append('yRotation', data.yRotation);
        body.append('zRotation', data.zRotation);
        body.append('movement', data.movement);
        body.append('xPosition', data.xPosition);
        body.append('yPosition', data.yPosition);
        body.append('zPosition', data.zPosition);
        body.append('xToPosition', data.xToPosition);
        body.append('yToPosition', data.yToPosition);
        body.append('zToPosition', data.zToPosition);
        body.append('xOuterPosition', data.xOuterPosition);
        body.append('yOuterPosition', data.yOuterPosition);
        body.append('zOuterPosition', data.zOuterPosition);
        body.append('duration', data.duration);
        body.append('loop', data.loop);
        body.append('easing', data.easing);
        body.append('url', apiLink);

        this.http.post('http://localhost:3000/prop/createModel', body).subscribe(dataa => {
          console.log(dataa);
        }, response => {
          console.log(response);
        });
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
      delete data.token;
      delete data.triggerName;

      if(this.backgroundImageFile == undefined || this.backgroundImage == undefined){
        backgroundValidate.innerHTML = "<label style='color:red;'>Background image is required.</label>";
        this.valid = false;
      }
      else
      {
        backgroundValidate.innerHTML =  "";
      }
      
      if(data.propName == ''){
        propNameValidate.innerHTML = "<label style='color:red;'>Prop Name is required.</label>";
        this.valid = false;
      }
      else
      {
        propNameValidate.innerHTML = "";
      }

      if(propNameValidate.innerHTML == "" && backgroundValidate.innerHTML == ""){
        this.valid = true;
      }

      if(!this.valid){   
        return;
      }

      const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }

      data.backgroundImageFile = this.backgroundImageFile;
      data.audioFile = this.audioFile;
  
      const body = new FormData();
      body.append('backgroundFile', this.backgroundImageFile);
      body.append('audioFile', this.audioFile);
      body.append('propName', data.propName);
      body.append('propType', data.propType);
      body.append('backgroundImage', data.backgroundImage = this.backgroundImage);
      body.append('audio', data.audio = this.audio);
      body.append('volume', data.volume);   

      this.http.post('http://localhost:3000/prop/createBackground', body).subscribe(dataa => {
        console.log(dataa);
      }, response => {
        console.log(response);
      }); 
      }
    }

  webhookApi(url: string) {
    const addTriggerValue = url + this.triggerSwitch;
    url = addTriggerValue;

    return fetch(url, {mode: 'no-cors'})
      .then(response => {
        if (this.triggerSwitch) {
          this.triggerSwitch = false;
          console.log(url);
        }
        else {
          this.triggerSwitch = true;
          console.log(url);
        }
      });
  }





}

