import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../app.messageservice';

@Component({
  
  selector: 'graph-pane',
  templateUrl: './graphPane.component.html'
 
})

export class GraphPaneComponent implements OnDestroy {
  message: any;
  subscription: Subscription;
    type = 'line';
    data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    options = {
      responsive: true,
      maintainAspectRatio: true
    };


  // constructor(private messageService: MessageService) {
  //     // subscribe to home component messages
  //     this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  // }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

}






