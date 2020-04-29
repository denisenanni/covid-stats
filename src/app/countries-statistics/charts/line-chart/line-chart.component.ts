import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
  Input,
  OnChanges,
} from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { Utils } from 'src/app/shared/utils/utils';
import { ChartUtils } from 'src/app/shared/utils/charts-utils';

@Component({
  selector: 'linechart-component',
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input()
  inputData: any[];
  loaded: boolean;
  @ViewChild(BaseChartDirective, { static: false })
  lineChart: BaseChartDirective;
  lineChartLabels: Label[];
  lineChartData: ChartDataSets[];
  lineChartType = 'line';
  lineChartColors: Color[];
  lineChartOptions = {
    responsive: true,
    responsiveAnimationDuration: 3000,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 0,
            stepsize: 0,
          },
        },
      ],
    },
  };
  lineChartLegend = true;
  lineChartPlugins = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.lineChartData = [];
    this.lineChartColors = [];
    this.lineChartLabels = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.inputData !== undefined) {
      this.lineChartData = [];
      this.lineChartColors = [];
      this.lineChartLabels = [];
      this.createLineChart(this.inputData.reverse());
    }
  }

  private createLineChart(data: any[]) {
    let cleanData = [];
    ChartUtils.getLabelsAndCleanedData(data, this.lineChartLabels, cleanData);

    // console.log('Xa', this.lineChartLabels.length);
    // total cases
    let totalCasesDataSet: ChartDataSets = {};
    totalCasesDataSet.label = 'Total cases';
    this.lineChartColors.push({
      borderColor: 'rgba(38, 51, 33, 1)',
      backgroundColor: 'rgba(177, 237, 157, .5)',
    });
    this.lineChartData.push(
      ChartUtils.getCases(totalCasesDataSet, data, 'total')
    );
    let limit = 0;
    let step = 0;
    // console.log('LINE CHART DATA', this.lineChartData);
    // get the upper limit for this chart based on total case max value
    this.lineChartData[0].data.forEach((element) => {
      if (element > limit) {
        // console.log(element);
        limit = element;
      }
    });

    // console.log('before rounding', limit);
    let stepLimitArray = Utils.round(limit);
    limit = stepLimitArray[0];
    step = stepLimitArray[1];

    this.lineChartOptions.scales.yAxes[0].ticks.max = limit;
    this.lineChartOptions.scales.yAxes[0].ticks.stepsize = step;

    let newCasesDataSet: ChartDataSets = {};
    newCasesDataSet.label = 'New cases';
    this.lineChartColors.push({
      borderColor: 'rgba(110, 110, 79, 1)',
      backgroundColor: 'rgba(227, 227, 163, 1)',
    });
    this.lineChartData.push(ChartUtils.getCases(newCasesDataSet, data, 'new'));
    let criticalCasesDataSet: ChartDataSets = {};
    criticalCasesDataSet.label = 'Critical cases';
    this.lineChartColors.push({
      borderColor: 'rgba(122, 4, 0, 1)',
      backgroundColor: 'rgba(201, 104, 101, 1)',
    });
    this.lineChartData.push(
      ChartUtils.getCases(criticalCasesDataSet, data, 'critical')
    );

    let activeCasesDataSet: ChartDataSets = {};
    activeCasesDataSet.label = 'Active cases';
    this.lineChartColors.push({
      borderColor: 'rgba(94, 50, 0, 1)',
      backgroundColor: 'rgba(255, 140, 8, 1)',
    });
    this.lineChartData.push(
      ChartUtils.getCases(activeCasesDataSet, data, 'active')
    );
    let recoveredCasesDataSet: ChartDataSets = {};
    recoveredCasesDataSet.label = 'Recovered cases';
    this.lineChartColors.push({
      borderColor: 'rgba(46, 71, 71, 1)',
      backgroundColor: 'rgba(144, 232, 229, 1)',
    });
    this.lineChartData.push(
      ChartUtils.getCases(recoveredCasesDataSet, data, 'recovered')
    );

    let newDeathsDataSet: ChartDataSets = {};
    newDeathsDataSet.label = 'New deaths';
    this.lineChartColors.push({
      borderColor: 'rgba(15, 15, 54, 1)',
      backgroundColor: 'rgba(66, 66, 227, 1)',
    });
    this.lineChartData.push(
      ChartUtils.getDeaths(newDeathsDataSet, data, 'new')
    );

    let totalDeathsDataSet: ChartDataSets = {};
    totalDeathsDataSet.label = 'Total deaths';
    this.lineChartColors.push({
      borderColor: 'rgba(33, 30, 30, 1)',
      backgroundColor: 'rgba(112, 101, 101, 1)',
    });
    this.lineChartData.push(
      ChartUtils.getDeaths(totalDeathsDataSet, data, 'total')
    );
    this.loaded = true;

    // detect the baseChart in the DOM after loaded is true
    this.changeDetectorRef.detectChanges();
    // console.log('MAYBE HERE', this.lineChart);
    this.updateConfigAsNewObject(this.lineChartOptions);
    // console.log('AND NOW???', this.lineChart);
  }

  updateConfigAsNewObject(lineChartOptions) {
    // console.log('IN UPDATE ', this.lineChart);
    //  console.log('BEFORE UPDATE', this.lineChart.options);
    this.lineChart.chart.config.options = lineChartOptions;
    // console.log('AFTER UPDATE', this.lineChart.options);
    // update chart options on DOM
    this.lineChart.ngOnChanges({} as SimpleChanges);
  }
}
