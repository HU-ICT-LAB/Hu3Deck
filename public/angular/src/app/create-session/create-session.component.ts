import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
    session_name: string = '';
    scenes = [];
    users = [];
    updateSession;

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
          user: ''
      });
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
      console.log(data);
  }

}