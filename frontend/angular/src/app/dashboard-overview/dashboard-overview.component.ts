import { ElementRef, ViewEncapsulation,  ViewChild, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WebSocketService } from '../web-socket.service';
import { Chart } from 'chart.js';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService } from '../constants.service';




@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class DashboardOverviewComponent implements OnInit {
  scenes = [];
  sessionData:any;
  session_form;
  heartRateChart;

  defaultSelected;

  hidden = [
    'Hond',
    'Vogel',
    'Zwarte bloem',
    'Boom',
    'Groene boom',
    'Plant',
    'Schaap'
  ];

  shown = [
    'Fortnite',
    'Apple',
    'koe',
    'nog iets',
    'android',
    'laptop'
  ];

  sessionData;
  
  @ViewChild('sliders') sliders: ElementRef;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private _constant: ConstantsService) {
    let sessionid = this.route.snapshot.paramMap.get('sessionid');
    this.sessionData = {name: '', id:'', scene_id: ''};
    
    this.http.get(`${_constant.apiLocation}/sessions/${sessionid}`).subscribe(data => {
        if(Object.keys(data).length < 1) {
          location.href = '/';
          return;
        }

        this.defaultSelected = data['scene_id'];
        this.sessionData = data;
      });

    this.http.get(`${_constant.apiLocation}/scenes`).subscribe(data => {
        this.scenes = Object.values(data);
    });  


    this.session_form = this.formBuilder.group({
      scene: ''
    });


    this.shown.forEach(obj =>{
      setTimeout(() =>{
        // console.log(obj);
        this.propSlider(obj);
      }, 1000)
     
    });

  }

  onSubmit(data) {
    console.log(data);
  }

      // this.webSocketService.emit('change scene', data);


  async ngOnInit() {
    let sessionid = this.route.snapshot.paramMap.get('sessionid');
    this.sessionData = await this.http.get(`http://localhost:3000/session/${sessionid}`).toPromise();
    
    if(Object.keys(this.sessionData).length < 1) {
      location.href = '/';
    }

    const propsData = await this.http.get(`http://localhost:3000/scene/${this.sessionData.scene_id}/props`).toPromise();


    let data = [
      68,
      70,
      91,
      70,
      63,
      65,
    ];



    this.heartRateChart = new Chart('heartRate', {
      type: 'line',

      data: {

        labels: ['10:52:05', '10:52:10', '10:52:15', '10:52:20', '10:52:25', '10:52:30'],
        datasets: [{
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          label: "Heart rate",
          data: data,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 15,
              beginAtZero: true,
              max: Math.max(...data) + (15 - (Math.max(...data) % 15))
            }
          }]
        }
      }
    });
  }




  drop(event: CdkDragDrop<string[]>) {
    // console.log(event.container['data'])
    // console.log(event.item.element.nativeElement.innerHTML)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    if (event.container.id == 'cdk-drop-list-1' && event.previousContainer.id == 'cdk-drop-list-0') {
    this.propSlider(event.item.element.nativeElement.innerHTML);
    } else if (event.container.id == 'cdk-drop-list-0' && event.previousContainer.id == 'cdk-drop-list-1') {
      // console.log(this);
      (<HTMLInputElement>document.getElementById(event.item.element.nativeElement.innerHTML)).remove();
    }

  }




  propSlider(prop){
    
      var div = document.createElement("div");
      var input = document.createElement("input");
      var title = document.createElement("p");
    
      div.setAttribute('id', prop)
      input.setAttribute('name', prop)
      title.innerHTML = prop;
      div.setAttribute('class', 'volume-prop')
      input.setAttribute('type', 'range')


      div.appendChild(title);
      div.appendChild(input);
      this.sliders.nativeElement.appendChild(div);

  }




}
