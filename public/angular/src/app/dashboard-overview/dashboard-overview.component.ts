import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WebSocketService } from '../web-socket.service';
import { Chart } from 'chart.js';

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


  constructor(private formBuilder: FormBuilder, private webSocketService: WebSocketService) {
    this.scenes = [
      "Scene 1",
      "Scene 2",
      "Scene 3",
      "Scene 4",
      "Scene 5",
    ];

    this.session_form = this.formBuilder.group({
      scene: ''
    });

   }

   onSubmit(data) {

      this.webSocketService.emit('change scene', data);
      console.log(data);
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

}
