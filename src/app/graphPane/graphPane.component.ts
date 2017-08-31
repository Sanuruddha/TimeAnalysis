import { Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../app.messageservice';
import { ChartModule } from 'angular2-chartjs';
import { StatisticFunctions } from '../statisticFunctions';

@Component({
  
  selector: 'graph-pane',
  templateUrl: './graphPane.component.html'
 
})

export class GraphPaneComponent implements OnDestroy{
  
  message: any;
  subscription: Subscription;
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
  public lineChartOptions:any;
  public lineChartColors:Array<any>;
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  static graphCount:number = 0;
  private msgArray = [];

    constructor(private messageService: MessageService){
      this.createChart();
      //this.messageService.newMessageSubject.subscribe(message => console.log(message));
      this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; this.drawChart(); });
    }

    createChart(){
      this.lineChartData = [
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series B'},
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series C'},
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series D'}
      ];
      this.lineChartLabels = ['Run 0', 'Run 1', 'Run 2', 'Run 3', 'Run 4', 'Run 5', 'Run 6','Run 7', 'Run 8', 'Run 9'];
  
      this.lineChartOptions = {
        responsive: true
      };
  
      this.lineChartColors = [
        { // grey
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {  //green 
          backgroundColor: 'rgba(47, 132, 71, 0.1)',
          borderColor: 'rgba(47, 132, 71, 0.8)',
          pointBackgroundColor: 'rgba(47, 132, 71, 0.8)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor:'rgba(47, 132, 71, 0.8)'
        },
        { //purple
          backgroundColor: 'rgba(103, 58, 183, .1)',
          borderColor: 'rgb(103, 58, 183)',
          pointBackgroundColor: 'rgb(103, 58, 183)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
        }
      ];
    }
    public drawChart():void {
      this.msgArray.push(this.message);
      console.log(this.msgArray);
      let _lineChartData:Array<any> = new Array(this.lineChartData.length);
      for (let i = 0; i < this.msgArray.length; i++) {
        _lineChartData[i] = {data: new Array(this.message.length), label: this.lineChartData[i].label};
       
          _lineChartData[i].data = this.msgArray[i];
        
      }
      if (this.msgArray.length <= this.lineChartData.length){
        
        for (let i = (this.msgArray.length); i < this.lineChartData.length; i++) {
          _lineChartData[i] = {data: new Array(this.message.length), label: this.lineChartData[i].label};
          _lineChartData[i].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
      }
      else{
        alert("Cannot display more charts");
      }
      this.lineChartData = _lineChartData;
    }
   

    // events
    public chartClicked(e:any):void {
      if(e.active.length > 0){
        var points = [];
        var pointSelected = e.active[0]._chart.tooltip._model.caretY;
        var legends = e.active[0]._chart.legend.legendItems;
      
        for (var i = 0; i < e.active.length; ++i) {
          points.push(e.active[i]._model.y);
        }
      
        let position = points.indexOf(pointSelected);
        let label = legends[position].text
      
        console.log(pointSelected);

        document.getElementById('normalDist').click();
        
      }
     
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }
  

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

    public clearCanvas(){
      this.msgArray = [];
      this.lineChartData = [
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series B'},
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series C'},
        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series D'}
      ];
      
    }

  

}






