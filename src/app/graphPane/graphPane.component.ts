import { Component } from '@angular/core';

@Component({
  selector: 'graph-pane',
  templateUrl:  './graphPane.component.html'
  
})

export class GraphPane {
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
    maintainAspectRatio: false
  };
  }