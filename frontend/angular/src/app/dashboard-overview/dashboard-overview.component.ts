import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {
  scenes = [];
  session_form;
  heartRateChart;
  name: string = "Example";

  allowed = [
    'Hond',
    'Vogel',
    'Zwarte bloem',
    'Boom',
    'Groene boom',
    'Plant',
    'Schaap'
  ];

  not_allowed = [
    'Fortnite',
    'Apple'
  ];

  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private _constant: ConstantsService) {
    let sessionid = this.route.snapshot.paramMap.get('sessionid');
    
    this.http.get(_constant.apiLocation + "/sessions/" + sessionid).subscribe(data => {
        if(Object.keys(data).length < 1) {
          location.href = '/';
          return;
        }

        this.name = data['name'];
      });

    this.http.get(_constant.apiLocation + "/scenes").subscribe(data => {
        this.scenes = Object.values(data);
        console.log(data);
        console.log(this.scenes[0].title);
    });  


      this.session_form = this.formBuilder.group({
      scene: ''
    });

   }

   onSubmit(data) {



      // this.webSocketService.emit('change scene', data);
   }

  ngOnInit(): void {

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
        
        labels: ['10:52:05','10:52:10','10:52:15','10:52:20','10:52:25','10:52:30'],
        datasets: [{
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          label:"Heart rate",
          data: data,
          fill:false
        }]
      },
      options: {
				responsive: true,
				scales: {
          yAxes: [{
              ticks: {
                  stepSize:15,
                  beginAtZero: true,
                  max:Math.max(...data) + (15 - (Math.max(...data) % 15))
              }
          }]
      }
			}
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
