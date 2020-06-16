import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-assign-object',
  templateUrl: './assign-object.component.html',
  styleUrls: ['./assign-object.component.css']
})
export class AssignObjectComponent implements OnInit {
    scenes: Object;
    propsData: Object;
    form1;
    selectScene: string = '';
    selectedValue: string = '';

    prohibited = [
        'Apex',
        'Android'
    ];

    allowed= [
        //'Fortnite',
        //'90s',
        //'Bouwen',
        //'Noskin',
        //'Slurp juice',
        //'Boom bow',
        //'Quadruple ramp'
    ];

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private _constant: ConstantsService) {

    
    this.http.get(this._constant.apiLocation + "/scenes").subscribe(data => {
      this.scenes = data;
    }); 

    this.form1 = this.formBuilder.group({
      selectScene: '',
      selectedValue: ''
    });

  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.form1.value);
  }

  onSubmit(formData1){
    console.log(formData1);
  }

  async onChangeScene(sceneValue) {
      this.selectScene = sceneValue;
      console.log(sceneValue);
      

    const propsData = await this.http.get(this._constant.apiLocation + "/scene/"+this.selectScene+"/props").toPromise();

    console.log(propsData);
    this.allowed = Object.values(propsData).map(data => `${data.name} [${data.prop_type}]`);

    this.allowed.forEach(obj => {
        this.propSlider(obj);
    });
      
  }



    drop(event: CdkDragDrop<string[]>) {
        console.log(event.container['data'])
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

}
