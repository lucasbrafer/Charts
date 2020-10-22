import { ChartService } from './charts.service.service';
import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';
import { Chart as ChartType } from './charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('meuCanvas', { static: true }) elemento: ElementRef;

  private dados: ChartType[];

  private labels: string[] = [];

  private valor: number[] = [];

  public colors: string[] = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)'
  ];

  private displayChart: boolean = false;

  @Input() private type;

  private MyChart: any;

  constructor(private service: ChartService) {}

  async ngOnInit() {
    this.dados = await this.getData();
    this.FixObjects();
    this.RefreshChartFunction();
  }

  ngOnChanges(): void {
    this.RefreshChartFunction();
  }

  ngOnDestroy(): void {
    console.log('destroy foi ativado');
  }

  private getData(): Promise<ChartType[]> {
    return this.service.list().toPromise();
  }

  private FixObjects(): void {
    this.InsertValusInArray();
  }

  private RefreshChartFunction(): void {
    this.updateStatusLegend();
    this.changeChart();
  }

  private InsertValusInArray = () => {
    this.dados.map(dado => {
      this.labels.push(dado.nome);
      this.valor.push(dado.valor);
    });
  }

  private updateStatusLegend(): void {
    if(this.type === 'bar' || this.type === 'line') {
      this.displayChart = false;
    }
    else {
      this.displayChart = true;
    }
  }

  private repeatColor(): any {
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
            data: this.valor,
            backgroundColor: this.repeatColor(),
            fill: false,
          },
        ],
      },
      options: {
        legend: {
          display: this.displayChart,
        },
        scales: {
          yAxes: [{
              display: true,
              ticks: {
                  suggestedMin: 40,
              }
          }]
        }
      },
    });
  }
}
