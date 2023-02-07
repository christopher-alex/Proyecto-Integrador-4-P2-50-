import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 50, 51, 56, 55, 40], label: 'Ene' },
  ];
  public lineChartLabels: Label[] = [
    'Película 1',
    'Película 2',
    'Película 3',
    'Película 4',
    'Película 5',
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          align: 'end',
          position: 'top',
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: '#ffffff',
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: '#ffffff',
          },
        },
      ],
    },
    tooltips: {
      displayColors: false,
      callbacks: {
        label: (tooltipItem) => {
          return `Vistas: ${tooltipItem.yLabel}`;
        },
      },
    },
  };
  public lineChartColors: Color[] = [{}];
  public lineChartLegend = true;
  public barChartType: ChartType = 'bar';
}
