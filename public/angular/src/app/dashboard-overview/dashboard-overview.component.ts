import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {
  scenes = [];
  session_form;
  name: string = "Example";


  constructor(private formBuilder: FormBuilder) {
    this.scenes = [
      "Scene 1",
      "Scene 2",
    ];

    this.session_form = this.formBuilder.group({
      scene: ''
    });

   }

   onSubmit(data) {
     console.log(data);
   }

  ngOnInit(): void {
    
  }

}
