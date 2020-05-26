import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  title = 'qwd';
  userForm;
  name = '';
  middlename = '';
  lastname = '';
  age = 0;

  constructor(private formBuilder: FormBuilder) {
    this.name = 'Arjan';
    this.middlename = '';
    this.lastname = 'Rakke';
    this.age = 22;

    this.userForm = this.formBuilder.group({
        name: 'Arjan',
        middlename: '',
        lastname: 'Rakke',
        age: 22
    });

  }

  ngOnInit() {

  }

  onSubmit(data) {
    console.log(data);
  }
}
