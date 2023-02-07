import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent {
  public lineChartData: ChartDataSets[] = [
    { data: [1, 1, 2, 3], label: '2020' },
  ];
  public lineChartLabels: Label[] = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: '#ffffff',
            beginAtZero: true,
            stepSize: 1,

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
          return `Entradas Vendidas: ${tooltipItem.yLabel}`;
        },
      },
    },
  };
  public lineChartColors: Color[] = [{}];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
}
