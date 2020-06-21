import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-assign-object',
  templateUrl: './assign-object.component.html',
  styleUrls: ['./assign-object.component.css']
})
export class AssignObjectComponent implements OnInit {
    scenes: Object;
    form1;
    selectScene: string = '';
    selectedValue: string = '';
    submitted = false;

    prohibited = [];
    allowed = [];

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private _constant: ConstantsService) {

    
    this.http.get(`${this._constant.apiLocation}/scenes`).subscribe(data => {
      this.scenes = data;
    }); 

    this.form1 = this.formBuilder.group({
      selectScene: ['', Validators.required],
      selectedValue: ''
    });

  }

  get f() { return this.form1.controls; }

  ngOnInit(): void {
  }

  changeStatus(item) {
    if(item.default_shown) {
      item.default_shown = false;
      return;
    }

    item.default_shown = true;
  }

  async save() {
    this.submitted = true;

    if (this.form1.invalid) {
      return;
  }

    const allowedProps = Object.values(this.allowed).map(data => {
      return {
        id: data.id,
        default_shown: data.default_shown
      };
    });

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const toSend = JSON.stringify(allowedProps);

    const body = new HttpParams().set('allowedProps', toSend);

    const propsData = await this.http.post(`${this._constant.apiLocation}/scene/${this.selectScene}/assignprops`, body.toString(), options).toPromise();


    if(propsData['rowCount'] >= 0) {
      document.querySelector(`[role=alert]`)['style'].display = 'block';
      setTimeout(() => {
        document.querySelector(`[role=alert]`)['style'].display = 'none';
      }, 3000);
    }
  }



  async onChangeScene(sceneValue) {
      this.selectScene = sceneValue;      

      const propsData = await this.http.get(`${this._constant.apiLocation}/scene/${this.selectScene}/props`).toPromise();
      this.allowed = Object.values(propsData).map(data => data);

      const propsDataNotActive = await this.http.get(`${this._constant.apiLocation}/scene/${this.selectScene}/props/notactive`).toPromise();
      this.prohibited = Object.values(propsDataNotActive).map(data => {
        return {
          ...data,
          default_shown: false
        };
      });
  }



    drop(event: CdkDragDrop<string[]>) {
        // console.log(event.container['data'])
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    cancel(){
      window.location.href = "/";
    }

}
