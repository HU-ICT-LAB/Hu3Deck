import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-create-scene',
  templateUrl: './create-scene.component.html',
  styleUrls: ['./create-scene.component.css']
})
export class CreateSceneComponent implements OnInit {
  createScene;
  title:String;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
    this.createScene = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]]
    });

  }

  get s() { return this.createScene.controls; }

  ngOnInit(): void {
  }


  onSubmit(data) {
    this.submitted = true;

    if (this.createScene.invalid) {
      return;
  }

    if(data.title != ""){
        const options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };


        const body = new HttpParams().set('title', data.title);

        this.http.post('http://localhost:3000/scenes/create', body.toString(), options).subscribe(dataa => {
          console.log(dataa);
          alert("Scene name is created");
        }, response => {
          console.log(response);
          
        });
      }else{
        alert("Scene name cannot be empty");
      }
    }


}
