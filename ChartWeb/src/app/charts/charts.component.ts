import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('meuCanvas', { static: true }) elemento: ElementRef;

  private labels: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'];

  private data: number[] = [85, 62, 86, 81, 84, 86, 94, 60, 62, 65, 41, 58];

  private colors: string[] = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
  ];

  @Input() private type;

  private MyChart: any;

  constructor() {} 

  ngOnInit(): void {
    this.colors = this.repeatColor();
    this.changeChart();
  }

  ngOnChanges(): void {
    console.log('EVENTO MUDOU', this.type);
    this.changeChart();
  }

  ngOnDestroy(): void {
    console.log('destroy foi ativado');
  }

  private repeatColor = () => {
    const arRepeatColor = [];
    for (let i = 0; i < this.labels.length; i++) {
      arRepeatColor.push(this.colors[i % this.colors.length]);
    }
    return arRepeatColor;
  }

  private changeChart = () =>  {
    if(this.MyChart){
      this.MyChart.destroy();
    }
    this.MyChart = new Chart(this.elemento.nativeElement, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.colors,
            fill: false,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
      },
    });
  }
}
