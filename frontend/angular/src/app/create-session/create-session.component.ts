import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  
  constructor(private formBuilder: FormBuilder, private constant: ConstantsService, private http: HttpClient) { 
    this._constant = constant;
    this.http.get(this._constant.apiLocation + "/scenes").subscribe(data => {
      this.scenes = data;
    });

    this.http.get(this._constant.apiLocation + "/users").subscribe(data => {
      this.users = data;
    });





      this.updateSession = this.formBuilder.group({
          session_name: '',
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
      
    let requestBody;
    
    const requestHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
  

      if(this.selectedLink == "existingUser"){
        requestBody = new HttpParams()
        .set('name', data.session_name)
        .set('scene_id', data.scene)
        .set('user_id', data.user);
      } else{
        requestBody = new HttpParams()
        .set('name', data.session_name)
        .set('scene_id', data.scene)
        .set('firstname', data.first_name)
        .set('middlename', data.middle_name)
        .set('lastname', data.last_name)
        .set('age', data.age);
      }

      
      

      this.http.post(this._constant.apiLocation + "/sessions/create", requestBody.toString(), {
        headers: requestHeaders
      }).subscribe(data => {

        if("id" in data) {
          location.href = '/dashboard/' + data['id'];
        }
      });



  }

}