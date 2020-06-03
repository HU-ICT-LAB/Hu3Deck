import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-create-scene',
  templateUrl: './create-scene.component.html',
  styleUrls: ['./create-scene.component.css']
})
export class CreateSceneComponent implements OnInit {
  createScene;
  title:String;


  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
    this.createScene = this.formBuilder.group({
      title: ''
    });

  }

  ngOnInit(): void {
  }


  onSubmit(data) {

    //this.http.post('http://localhost/scenes/create', JSON.stringify(data));
    console.log(data);
  }


}
