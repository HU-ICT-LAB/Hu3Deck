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
    const name = this.createProp.get('triggerName').value;
    const token = this.createProp.get('token').value;
    const apiLink = 'https://maker.ifttt.com/trigger/' + name + '/with/key/' + token + '?value1=';
    // this.webhookApi(apiLink);

    console.log("hallo dit is etestestest", data);
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
        console.log(data);

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
      console.log(data);
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

