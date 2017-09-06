import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
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
  legendInfo: any;
  subscription: Subscription;
  private stat: StatisticFunctions = new StatisticFunctions();
  stdDeviation: number;
  mean: number;
  //paramters for the line charts
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
  public lineChartOptions:any;
  public lineChartColors:Array<any>;
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  static graphCount:number = 0;
  private msgArray = []; 

  //parameters for the normal distribution chart of a selected chart 
  public lineChartData2:Array<any>;
  public lineChartLabels2:Array<any>;
  public lineChartOptions2:any;
  public lineChartColors2:Array<any>;
  public lineChartLegend2:boolean = true;
  public lineChartType2:string = 'line';

    constructor(private messageService: MessageService){ 
      this.initializeCharts();
      this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message["yAxis"]; this.legendInfo = message["legendInfo"]; this.drawChart(); });
    }

    private initializeCharts(){
      this.createChart();
      this.createNormalDistChart();
    }

    public chartHovered(event, active):void {
      
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
          
      }

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

    createNormalDistChart(){
      this.lineChartData2 = [
          {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series A'}
        
        ];
      this.lineChartLabels2 = ['Run 0', 'Run 1', 'Run 2', 'Run 3', 'Run 4', 'Run 5', 'Run 6','Run 7', 'Run 8', 'Run 9'];
    
      this.lineChartOptions2 = {
          responsive: true,
          onClick: "null"
      };
    
      this.lineChartColors2 = [
          { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          }
        ];
    }

    private formatLegend(legendInfo){
      let str: string = "";
      for (var key in legendInfo){
        str = legendInfo[key] + "- " + str; 
      }
      return str;
    }

    public drawChart():void {
      this.msgArray.push([this.message, this.legendInfo]);
      let _lineChartData:Array<any> = new Array(this.lineChartData.length);
      for (let i = 0; i < this.msgArray.length; i++) {
        let str = this.formatLegend(this.msgArray[i][1]);
        _lineChartData[i] = {data: new Array(this.message.length), label: str};
       
          _lineChartData[i].data = this.msgArray[i][0];
        
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
      if(e.active &&  e.active.length > 0){
        var points = [];
        var pointSelected = e.active[0]._chart.tooltip._model.caretY;
        var legends = e.active[0]._chart.legend.legendItems;
      
        for (var i = 0; i < e.active.length; ++i) {
          points.push(e.active[i]._model.y);
        }
      
        let position = points.indexOf(pointSelected);
        let label = legends[position].text
        let datasetOfTheSelectedChart: number[] = [];
        for (var i=0; i<this.lineChartData.length; i++){
          if (this.lineChartData[i].label == label){
            datasetOfTheSelectedChart = this.lineChartData[i].data.slice(0, 10);
          }
        }

        this.lineChartData2 = this.stat.getNormalDistribution(datasetOfTheSelectedChart);
        this.stdDeviation = this.stat.getStandardDeviation(datasetOfTheSelectedChart);
        this.mean = this.stat.getMean(datasetOfTheSelectedChart);

        document.getElementById("openModalButton").click();
        
      }
     
    }
   
    
 
  

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

    public clearCanvas(){
      this.msgArray = [];
      this.createChart();
      
      
    }

   

}






