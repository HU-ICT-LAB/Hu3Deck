import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  updateForm;
  background_images = [];


  constructor(private webSocketService: WebSocketService, private formBuilder: FormBuilder) {
    this.background_images = [
      "/assets/first.jpg",
      "/assets/second.jpg",
      "/assets/third.png",
      "/assets/last.png",
    ];

    this.updateForm = this.formBuilder.group({
      background_image: ''
    });

  }

  ngOnInit() {

  }

  onSubmit(data) {
    console.log(data);
    this.webSocketService.emit('change background', data);
  }

  
}
