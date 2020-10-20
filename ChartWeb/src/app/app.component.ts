import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ChartWeb';

   public _typeChart: string;

  ngOnInit() {
    this._typeChart = 'bar';
  }

  onClick(typeChart: string): void {
    this._typeChart = typeChart;
    console.log(this._typeChart);
  }

   getTypeChart(): any {
    return  this._typeChart;
  }
}
