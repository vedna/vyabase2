import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-heatmapcomp',
  templateUrl: './heatmapcomp.component.html',
  styleUrls: ['./heatmapcomp.component.scss']
})
export class HeatmapcompComponent implements OnInit {
  heading = 'Frappe-Charts';

  data = [
    {
      title: "Some Data",
      color: "light-blue",
      values: [25, 40, 30, 35, 8, 52, 17, -4]
    },
    {
      title: "Another Set",
      color: "violet",
      values: [25, 50, -10, 15, 18, 32, 27, 14]
    }
  ];

  dataSet = {
    labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am", "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"],
    datasets: this.data
  };


  ngOnInit() {
    // this.getChartData(this.min, this.max, this.len);
    // this.getRandomInt(this.min, this.max);
  }

  getRandomInt(min, max) {    
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getChartData(len = 7) {
    let result = [];
    for (let i = 0; i < len; i++) {
      const element = len[i];
      len[i]=result;
      console.log(element);
    }
  }


}
