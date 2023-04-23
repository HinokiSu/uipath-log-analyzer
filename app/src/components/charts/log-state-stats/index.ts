import { TLogStateObj } from '@/interface/dashboard'
import { graphic } from 'echarts/core'

type TIndicator = {
  name: string
  max: number
  min: number
}
export class CustomRadar {
  chartInstance: string
  sourceData: TLogStateObj[]
  constructor(instance: string, source: TLogStateObj[]) {
    this.chartInstance = instance
    this.sourceData = source
  }

  chartConfig(myChart: any, options: any) {
    myChart.setOption({
      color: ['#80FFA5', '#00DDFF', '#FFBF00', '#FF0087'],
      ...options
    })
  }
  handleChartData() {
    const indicator: TIndicator[] = []
    const seriesData: number[] = []
    const legendData: string[] = []
    this.sourceData.forEach((item) => {
      if (item.log_state !== 'Info') {
        seriesData.push(item.total)
      }
    })
    const max = Math.max(...seriesData) + 50
    this.sourceData.forEach((item) => {
      if (item.log_state !== 'Info') {
        legendData.push(item.log_state)
        indicator.push({
          name: item.log_state,
          max: max,
          min: 0
        })
      }
    })

    return {
      tooltip: {},
      radar: [
        {
          indicator: indicator,
          center: ['50%', '50%'],
          radius: 100,
          axisName: {
            color: '#fff',
            backgroundColor: '#666',
            borderRadius: 3,
            padding: [3, 5]
          }
        }
      ],

      series: [
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          data: [
            {
              value: seriesData,
              name: 'State',
              areaStyle: {
                color: new graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: 'rgba(255, 145, 124, 0.1)',
                    offset: 0
                  },
                  {
                    color: 'rgba(255, 145, 124, 0.9)',
                    offset: 1
                  }
                ])
              }
            }
          ]
        }
      ]
    }
  }

  applyChartConfig() {
    const options = this.handleChartData()
    this.chartConfig(this.chartInstance, options)
  }
}
