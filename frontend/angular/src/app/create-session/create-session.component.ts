import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConstantsService } from '../constants.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent {
    session_name: string = '';
    first_name: string = '';
    middle_name: string = '';
    last_name: string = '';
    age: 0;
    scenes: Object;
    users: Object;
    updateSession;
    selectedLink: string="existingUser"; 
    private _constant: ConstantsService;      
    valid = false; 
  

  constructor(private formBuilder: FormBuilder, private constant: ConstantsService, private http: HttpClient) { 
    this._constant = constant;
    this.http.get(this._constant.apiLocation + "/scenes").subscribe(data => {
      this.scenes = data;
    });

    this.http.get(this._constant.apiLocation + "/users").subscribe(data => {
      this.users = data;
    });



      this.updateSession = this.formBuilder.group({
          session_name: ['' , [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]],
          scene: '',
          user: '',
          first_name: '',
          middle_name: '',
          last_name: '',
          age: 0
      });

  }


  setradio(e: string): void   {  
  
    this.selectedLink = e;  
          
  }  
  
  isSelected(name: string): boolean {  
  
      if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
          return false;  
      }  

      return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
    }  

  onSubmit(data) {

    var sessionNameValidate = document.getElementById("sessionNameValidate");
    var sceneValidate = document.getElementById("sceneValidate");
    var userValidate = document.getElementById("userValidate");
    var firstNameValidate = document.getElementById("firstNameValidate");
    var middleNameValidate = document.getElementById("middleNameValidate");
    var lastNameValidate = document.getElementById("lastNameValidate");
    var ageValidate = document.getElementById("ageValidate");
      
    let requestBody;
    
    const requestHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
  

      if(this.selectedLink == "existingUser"){
        requestBody = new HttpParams()
        .set('name', data.session_name)
        .set('scene_id', data.scene)
        .set('user_id', data.user);

        if(data.user == ''){
          userValidate.innerHTML = "<label style='color:red;'>Select a user.</label>";
          this.valid = false;
        }
        else
        {
          userValidate.innerHTML = "";
        }

        if(userValidate.innerHTML == "" && sceneValidate.innerHTML == "" &&
        sessionNameValidate.innerHTML == ""){
          this.valid = true;
        }

      } else{
        requestBody = new HttpParams()
        .set('name', data.session_name)
        .set('scene_id', data.scene)
        .set('firstname', data.first_name)
        .set('middlename', data.middle_name)
        .set('lastname', data.last_name)
        .set('age', data.age);

        if(data.first_name == ''){
          firstNameValidate.innerHTML = "<label style='color:red;'>First name is required.</label>";
          this.valid = false;
        }
        else if(!data.first_name.match(/^[a-zA-Z ]+$/)){
          firstNameValidate.innerHTML = "<label style='color:red;'>First name is invalid.</label>";
          this.valid = false;
        }
        else
        {
          firstNameValidate.innerHTML = "";
        }

        if(data.last_name == ''){
          lastNameValidate.innerHTML = "<label style='color:red;'>Last name is required.</label>";
          this.valid = false;
        }
        else if(!data.last_name.match(/^[a-zA-Z ]+$/)){
          lastNameValidate.innerHTML = "<label style='color:red;'>Last name is invalid.</label>";
          this.valid = false;
        }
        else
        {
          lastNameValidate.innerHTML = "";
        }

        if(data.age == null){
          ageValidate.innerHTML = "<label style='color:red;'>Age is required.</label>";
          this.valid = false;
        }
        else
        {
          ageValidate.innerHTML = "";
        }

        if(sceneValidate.innerHTML == "" && ageValidate.innerHTML == "" &&
        lastNameValidate.innerHTML == "" && firstNameValidate.innerHTML == ""){
          this.valid = true;
        }
      }

      if(data.session_name == ''){
        sessionNameValidate.innerHTML = "<label style='color:red;'>Session name is required.</label>";
        this.valid = false;
      }
      else if(!data.session_name.match(/^[a-zA-Z0-9]+$/)){
        sessionNameValidate.innerHTML = "<label style='color:red;'>Session name is invalid.</label>";
        this.valid = false;
      }
      else
      {
        sessionNameValidate.innerHTML = "";
      }

      if(data.scene == ''){
        sceneValidate.innerHTML = "<label style='color:red;'>Select a scene.</label>";
        this.valid = false;
      }
      else
      {
        sceneValidate.innerHTML = "";
      }

      if(!this.valid){
        return;
      }

      this.http.post(`${this._constant.apiLocation}/sessions/create`, requestBody.toString(), {
        headers: requestHeaders
      }).subscribe(data => {

        if("id" in data) {
          alert('Session is succesfully created.');
          location.href = `/dashboard/${data['id']}`;
        }
      });

  }

}