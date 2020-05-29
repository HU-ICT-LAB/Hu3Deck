import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-create-scene',
  templateUrl: './create-scene.component.html',
  styleUrls: ['./create-scene.component.css']
})
export class CreateSceneComponent implements OnInit {
  createScene;
  title:String;


  constructor(private formBuilder: FormBuilder) { 
    this.createScene = this.formBuilder.group({
      title: ''
    });
  }

  ngOnInit(): void {
  }


  onSubmit(data) {
    console.log(data);
  }


}
