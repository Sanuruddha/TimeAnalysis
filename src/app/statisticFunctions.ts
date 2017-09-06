
export class StatisticFunctions {

  public getStandardDeviation(dataset: number[]){
    let mean = this.getMean(dataset);
    let temp=0;
    for (let i=0; i<dataset.length; i++){
      temp = temp + Math.pow((dataset[i]-mean),2);
    }
    let stdDev = Math.sqrt(temp/(dataset.length-1));
    return stdDev;
  }

  public getMean(dataset: number[]){
    let sum = this.getSum(dataset);
    let mean = sum/dataset.length;
    return mean;
  }

  public getNormalDistribution(dataset: number[]){
    let normalDist = [];
    let mean = this.getMean(dataset);
    let stdDev = this.getStandardDeviation(dataset);
    for (let i=0; i<dataset.length; i++){
      normalDist.push((1/Math.sqrt(2*Math.PI*Math.pow(stdDev, 2))) * (Math.exp(-((dataset[i]-mean)/(2*Math.pow(stdDev,2))))));
    }
    return normalDist;
  }

  private getSum(dataset: number[]){
    let sum = 0;
    for (let i=0; i<dataset.length; i++){
      sum = sum+dataset[i];
    }
    return sum;
  }
}
