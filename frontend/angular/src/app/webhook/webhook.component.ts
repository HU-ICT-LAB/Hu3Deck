import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.css']
})
export class WebhookComponent implements OnInit {
  webhookForm
  triggerSwitch = true;

  constructor(private formBuilder: FormBuilder) {

    this.webhookForm = this.formBuilder.group({
        triggerName: '',
        token: ''
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    const name = this.webhookForm.get('triggerName').value;
    const token = this.webhookForm.get('token').value;
    if (name !== '' && token !== '') {
      const apiLink = 'https://maker.ifttt.com/trigger/' + name + '/with/key/' + token + '?value1=';
      this.webhookApi(apiLink);
    }


  }

  webhookApi(url: string) {
    const addTriggerValue = url + this.triggerSwitch;
    url = addTriggerValue;

    return fetch(url, {mode: 'no-cors'})
      .then(response => {
          if (this.triggerSwitch) {
            this.triggerSwitch = false;
            console.log(url);
          }
          else {
            this.triggerSwitch = true;
            console.log(url);
          }
      });
  }
}
