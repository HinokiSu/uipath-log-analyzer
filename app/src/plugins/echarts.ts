import * as echarts from 'echarts/core'

import {
  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  GridComponent,
  TransformComponent,
  DatasetComponentOption,
  GridComponentOption,
  LegendComponent
} from 'echarts/components'
import { LineChart, RadarChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

export const Charts = [
  TitleComponent,
  TooltipComponent,
  LabelLayout,
  CanvasRenderer,
  DatasetComponent,
  GridComponent,
  TransformComponent,
  LegendComponent,
  LineChart,
  RadarChart
]

export type BarEChartsOption = echarts.ComposeOption<DatasetComponentOption | GridComponentOption>

export const ChartRegister = (instance: any) => Charts.map((_) => instance.use(_))
