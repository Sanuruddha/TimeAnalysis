import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../app.messageservice';
import { StatisticFunctions } from '../statisticFunctions';




@Component({
   selector: 'chart-pane',
   
   styles: [`
     chart {
       display: block;
     }
   `],
   templateUrl:  './hc.component.html'
})
export class ChartHCComponent implements OnDestroy {
    message: any;
    subscription: Subscription;
    legendInfo: any;
    private stat: StatisticFunctions = new StatisticFunctions();
    chart :any;
    options: Object;
   //plotOptions: Object;
    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }
    
    constructor(private messageService: MessageService) { 
        this.initializeChart();
        this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message["yAxis"]; this.legendInfo = message["legendInfo"];this.drawChart(this.message, this.legendInfo); });
    } 
    
    drawChart(dataArray:any, legend:any){
        let tempLegend = this.formatLegend(legend);
        this.chart.addSeries({name: tempLegend, data: dataArray});    
    }

    initializeChart(){
        this.options = {
            "title" : { text : 'Time Analysis' },
            chart: {
                type: 'spline',
                events: {
                    oncontextmenu: function(e) {
                    alert('chart - double click!')
                    }
                }
            },
            
            plotOptions : {
                series: {
                    point: {
                        events: {
                                    
                                rightClick: function(e){
                                    alert("happiness");
                                }
                        }
                    }
                }
            },
            series: []
        
        };

        

    }

    private formatLegend(legendInfo){
        let str: string = "";
        for (var key in legendInfo){
          str = legendInfo[key] + "- " + str; 
        }
        return str;
      }

      clearCanvas(){
          this.initializeChart();
      }

      

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
    
}

