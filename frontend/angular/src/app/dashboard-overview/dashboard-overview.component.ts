import { ElementRef, ViewEncapsulation,  ViewChild, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WebSocketService } from '../web-socket.service';
import { Chart } from 'chart.js';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService } from '../constants.service';
import { Subscription, timer, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [WebSocketService]
})

export class DashboardOverviewComponent implements OnInit {
  scenes = [];
  sessionData:any;
  session_form;
  heartRateChart;

  defaultSelected;

  hidden = [];

  shown = [];
  
  @ViewChild('sliders') sliders: ElementRef;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private _constant: ConstantsService, private socket: WebSocketService) {
    this.socket.emit("reload", {});
    this.sessionData = {name: '', id:'', scene_id: ''};

    this.http.get(`${_constant.apiLocation}/scenes`).subscribe(data => {
        this.scenes = Object.values(data);
    });  

    this.session_form = this.formBuilder.group({
      scene: ''
    });
    

  }

  async onSubmit(data) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let requestBody = new HttpParams()
    .set('id', this.route.snapshot.paramMap.get('sessionid'))
    .set('scene_id', data.scene);

    const result = await this.http.post(`${this._constant.apiLocation}/session/update`, requestBody.toString(), options).toPromise();

    if(result['rowCount'] !== undefined && result['rowCount'] > 0) {
      document.querySelectorAll(`[sliderpropid]`).forEach(v => {
        v.remove();
      });
      this.ngOnInit();
      this.socket.emit('reload', {});
    }

    // console.log(body.toString());
  }

      // this.webSocketService.emit('change scene', data);

  subscription: Subscription;
  statusText: string;

  data = [];
  labels = [];

  async ngOnInit() {
    let sessionid = this.route.snapshot.paramMap.get('sessionid');
    this.sessionData = await this.http.get(`${this._constant.apiLocation}/sessions/${sessionid}`).toPromise();
    
    if(Object.keys(this.sessionData).length < 1) {
      location.href = '/';
    }

    this.defaultSelected = this.sessionData['scene_id'];

    const propsData = await this.http.get(`${this._constant.apiLocation}/scene/${this.sessionData.scene_id}/props`).toPromise();
    this.shown = Object.values(propsData).filter(data => data.default_shown === true);
    this.hidden = Object.values(propsData).filter(data => data.default_shown === false);
    // `${data.name} [${data.prop_type}] / ${data.id}`
    this.shown.forEach(obj => {
        this.propSlider(obj);
    });

    this.heartRateChart = new Chart('heartRate', {
      type: 'line',

      data: {
        labels: [],
        datasets: [{
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          label: "Heart rate",
          data: [],
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 5,
              beginAtZero: false,
              // max: Math.max(...this.data) + (25 - (Math.max(...this.data) % 25))
            }
          }],
          // xAxes: [{
          //     type: "linear",
          //     display: true,
          //     scaleLabel: {
          //         display: true,
          //         labelString: 'X-Axis'
          //     },
          //     ticks: {
          //         min: -10,
          //         suggestedMax: 150
          //     }
          // },]
        },
      }
    });

    this.subscription = timer(0, 30000).pipe(
      switchMap(() => this.showHeartbeat())
    ).subscribe(result => false);

    this.heartRateChart.update();

  }

  async showHeartbeat() {
    let minutes = (<HTMLInputElement>document.getElementById("minutes")).value;
    
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const body = new HttpParams().set('minutes', minutes);
    
    let jsonData = await this.http.post('http://localhost:3000/heartbeat/create', body.toString(), options).toPromise();
    let jsonObjects = Object.values(jsonData).slice(-60); 

    this.heartRateChart.data.datasets[0].data = jsonObjects.map( (value) => {
      return value.value;
    });

    this.heartRateChart.data.labels = jsonObjects.map( (value) => {
      return value.time;
    });

    this.heartRateChart.update();
    return this.heartRateChart;
  }



  drop(event: CdkDragDrop<string[]>) {
    // console.log(event.item.element.nativeElement)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    let id = event.item.element.nativeElement.getAttribute('propid');

    if (event.container.id == 'cdk-drop-list-1' && event.previousContainer.id == 'cdk-drop-list-0') {
      this.shown.forEach(obj => {
        if(obj.id == id) {
          this.propSlider(obj);
        }
      });
      this.socket.emit('show prop', { id });
    } else if (event.container.id == 'cdk-drop-list-0' && event.previousContainer.id == 'cdk-drop-list-1') {
      let element = (<HTMLInputElement>document.querySelector(`[sliderpropid='${id}']`));
      
      if(element !== null) {
        element.remove();
      }
      
      


      this.socket.emit('hide prop', { id });
    }

  }




  propSlider(prop){

    if(prop.audio_path === null) {
      return false;
    }
    
    var div = document.createElement("div");
    var input = document.createElement("input");
    var title = document.createElement("p");
  
    title.innerHTML = prop.name;

    div.setAttribute('sliderpropid', prop.id);
    div.setAttribute('class', 'volume-prop');

    input.setAttribute('name', prop.name);
    input.setAttribute('type', 'range');
    input.setAttribute('propId', prop.id);
    input.setAttribute('value', prop.volume);

    input.addEventListener('change', e => {
      this.socket.emit('set volume', {id: prop.id, volume: input.value} );
    });

    div.appendChild(title);
    div.appendChild(input);
    this.sliders.nativeElement.appendChild(div);
  }

}
