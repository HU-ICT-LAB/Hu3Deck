import { ElementRef, ViewEncapsulation,  ViewChild, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WebSocketService } from '../web-socket.service';
import { Chart } from 'chart.js';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class DashboardOverviewComponent implements OnInit, AfterViewInit {
  scenes = [];
  session_form;
  heartRateChart;
  name: string = "Example";

  hidden = [
    'Fortnite',
    'Apple',
    'Hond',
    'Vogel',
    'Zwarte bloem',
    'Boom',
    'Groene boom',
    'Plant',
    'Schaap'
  ];

  shown = [
   
  ];

  @ViewChild('sliders') sliders: ElementRef;


  ngAfterViewInit() {
    console.log(this.sliders.nativeElement.innerHTML);
  }

  constructor(private formBuilder: FormBuilder, private webSocketService: WebSocketService) {
    this.scenes = [
      "Scene 1",
      "Scene 2",
      "Scene 3",
      "Scene 4",
      "Scene 5",
    ];
    console.log(document);
    this.session_form = this.formBuilder.group({
      scene: ''
    });

  }

  onSubmit(data) {

    this.webSocketService.emit('change scene', data);
    // console.log(data);
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
      var div = document.createElement("div");
      var input = document.createElement("input");
      var title = document.createElement("p");

      div.setAttribute('class', 'volume-prop')
      div.setAttribute('id', event.item.element.nativeElement.innerHTML)
      input.setAttribute('type', 'range')
      input.setAttribute('name', event.item.element.nativeElement.innerHTML)
      title.innerHTML = event.item.element.nativeElement.innerHTML;

      div.appendChild(title);
      div.appendChild(input);
      this.sliders.nativeElement.appendChild(div);



    }
    else if (event.container.id == 'cdk-drop-list-0' && event.previousContainer.id == 'cdk-drop-list-1') {
      console.log(this);
      (<HTMLInputElement>document.getElementById(event.item.element.nativeElement.innerHTML)).remove();
    }

  }


}
