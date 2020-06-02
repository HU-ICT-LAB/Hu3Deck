import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
    session_name: string = '';
    first_name: string = '';
    middle_name: string = '';
    last_name: string = '';
    age: int = 0;
    scenes = [];
    users = [];
    updateSession;
    selectedLink: string="existingUser";        
  
  constructor(private formBuilder: FormBuilder) { 
      this.scenes = [
          "Berg",
          "Bos",
          "Kerk"
      ];
      this.users = [
          "Luuk",
          "Andy",
          "Chan Wai"
      ];

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

  ngOnInit(): void {

   

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
      
       if(this.selectedLink == "existingUser"){
        delete data.middle_name;
        delete data.first_name;
        delete data.last_name;
        delete data.age;
        console.log(data);
      }else{
        delete data.user;
        console.log(data);
      }

  }

}