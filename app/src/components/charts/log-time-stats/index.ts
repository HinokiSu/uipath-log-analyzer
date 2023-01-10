import { TLogTimeObj } from '@/interface/dashboard'
import * as echarts from 'echarts/core'
type TLineSeriesOption = {
  name: string
  type: string
  stack: string
  LineStyle: {
    width: number
  }
  showSymbol: boolean
  areaStyle: {
    opacity: number
    color: any
  }
  emphasis: {
    focus: string
  }
  data: number[]
}

type THandledChartData = {
  xAxisData: string[]
  seriesOption: TLineSeriesOption[]
}

export class CustomLineChart {
  chartInstance: string
  sourceData: TLogTimeObj[]
  constructor(instance: string, source: TLogTimeObj[]) {
    this.chartInstance = instance
    this.sourceData = source
  }

  buildSerieOptionObj(name: string, startColor: string, endcolor: string, data: number[]) {
    return {
      name,
      type: 'line',
      stack: 'Total',
      LineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: startColor
          },
          {
            offset: 1,
            color: endcolor
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data
    }
  }

  handleChartData(): THandledChartData {
    const seriesOption: TLineSeriesOption[] = []
    const seriesData: {
      error: number[]
      warn: number[]
      trace: number[]
      info: number[]
    } = {
      error: [],
      warn: [],
      trace: [],
      info: []
    }

    const xAxisData: string[] = []
    this.sourceData.forEach((item) => {
      seriesData.error.unshift(item.errorCount)
      seriesData.warn.unshift(item.warnCount)
      seriesData.trace.unshift(item.traceCount)
      seriesData.info.unshift(item.infoCount)
      xAxisData.unshift(item.logtime)
    })

    const options = [
      {
        name: 'Error',
        startColor: 'rgb(255, 0, 135)',
        endColor: 'rgb(135, 0, 157)',
        data: seriesData.error
      },
      {
        name: 'Warn',
        startColor: 'rgb(255, 191, 0)',
        endColor: 'rgb(224, 62, 76)',
        data: seriesData.warn
      },
      {
        name: 'Trace',
        startColor: 'rgb(0, 221, 255)',
        endColor: 'rgb(77, 119, 255)',
        data: seriesData.trace
      },
      {
        name: 'Info',
        startColor: 'rgb(128, 255, 165)',
        endColor: 'rgb(1, 191, 236)',
        data: seriesData.info
      }
    ]

    options.forEach((item) => {
      seriesOption.unshift(
        this.buildSerieOptionObj(item.name, item.startColor, item.endColor, item.data)
      )
    })
    return { xAxisData, seriesOption }
  }

  chartConfig(myChart: any, xAxisData: string[], series: TLineSeriesOption[]) {
    myChart.setOption({
      color: ['#80FFA5', '#00DDFF', '#FFBF00', '#FF0087'],
      /* title: {
        text: '时间&日志状态'
      }, */
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Error', 'Warn', 'Trace', 'Info']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series
    })
    window.onresize = () => {
      myChart.resize()
    }
  }

  applyChartConfig() {
    const options = this.handleChartData()
    this.chartConfig(this.chartInstance, options.xAxisData, options.seriesOption)
   
  }
}
