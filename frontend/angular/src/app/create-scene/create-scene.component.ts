import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


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
    if(data.title != ""){
        const options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };


        const body = new HttpParams().set('title', data.title);

        this.http.post('http://localhost:3000/scenes/create', body.toString(), options).subscribe(dataa => {
          console.log(dataa);
        }, response => {
          console.log(response);
        });
        console.log(data);
      }else{
        alert("Scene name cannot be empty");
      }
    }


}
