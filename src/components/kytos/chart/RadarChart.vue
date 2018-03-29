<template>
  <div class="chart-radar" :id="plotId"></div>
</template>

<script>
import KytosBase from "../base/KytosBase"
import { RadarChart } from "../../../assets/js/chart/radarChart.js"
import { scaleOrdinal } from "d3-scale"
import { select } from "d3-selection"

export default {
  name: "kytos-chart-radar",
  mixins: [KytosBase],
  props: {
    data: {
      type: Array,
      required: true
    },
    showGrid: {
      type: Boolean,
      default: true
    },
    showAxis: {
      type: Boolean,
      default: true
    },
    showLabels: {
      type: Boolean,
      default: true
    },
    showLegend: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      margin: {top: 30, right: 30, bottom: 30, left: 30},
      chart: null,
      exampleData: [
        {
          "key":"rx",
          "values":[
            {  "axis":"I1", "value": 0.26 },
            {  "axis":"I2", "value": 0.30 },
            {  "axis":"I3", "value": 0.05 }
          ]
        },
        {
          "key":"tx",
          "values":[
            {  "axis":"I1", "value": 0.86 },
            {  "axis":"I2", "value": 0.10 },
            {  "axis":"I3", "value": 0.60 }
          ]
        }
      ]
    }
  },
  computed: {
    chartWidth () {
      let container = document.getElementById(this.plotId).parentElement
      return container.getBoundingClientRect().width * 0.75
    },
    chartHeight () {
      return this.chartWidth
    },
    plotId () { return "radar-" + this.id },
    maxSpeed () { return Number(this.jsonData.speed) || 0 },
    colors () { return scaleOrdinal().range(["#66FFFF", "#FF66FF"]) },
    options () {
      return {
        width: this.chartWidth,
        widthMax: this.chartWidth,
        height: this.chartHeight,
        heightMax: this.chartHeight,
        margins: this.margin,
        colors: this.colors,
        axes: {
          display: this.showAxis
        },
        legend: {
          display: this.showLegend
        }
      }
    }
  },
  methods: {
    init () {
      this.chart = RadarChart()
      select("#" + this.plotId).call(this.chart)
      this.chart.options(this.options).update()
    },
    updateChart () {
      this.chart.data(this.data).duration(100).update()
    }
  },
  mounted () {
    this.init()
    this.updateChart()
    this.chart.data(this.data).duration(100).update()

    // this.chart.filterAxes(7);
    // this.chart.options({circles: {maxValue: 1, levels: 4}}).update();

    // this.chart.maxValue(.5).levels(7).update();

    // this.chart.invert(4).update();

    // this.chart.ranges({'rx': [-1, 2]}).update();

    // let chart_data = JSON.parse(JSON.stringify(this.exampleData));
    // chart_data.forEach(function(e) { e.values.forEach(function(v) { v.value = (Math.random() * .6) + .2; }) })
    // this.chart.data(chart_data).update();

    // let one = this.chart.slice(1, 2);
    // this.chart.data(one).update();

    // this.chart.ranges({'rx': []}).invert(4);
    // this.chart.data(this.exampleData).update();

    // this.chart.options({circles: {fill: 'violet', color: '#FF99CC'}});
    // this.chart.options({axes: {lineColor: "lightyellow"}});
    // this.chart.colors({'rx': 'black', 'tx': 'green'});
    // this.chart.update();

    // this.chart.options({circles: {maxValue: 1, levels: 3}, legendSymbol: 'circle', filter: false}).update();

    // this.chart.height(300).width(300).options({'areas': {'dotRadius': 2}}).update();

    // this.chart.height(600).width(600).options({'areas': {'dotRadius': 4}}).update();

    // this.chart.options({circles: {fill: '#CDCDCD', color: '#CDCDCD'}});
    // this.chart.options({filter: 'rc_glow'});
    // this.chart.maxValue(.5).levels(7).filterAxes(7);
    // this.chart.colors({}).data(this.exampleData).update();
  },
  updated () {
    this.updateChart()
  },
  watch: {
    data () {
      this.updateChart()
    }
  }
}
</script>

<style lang="sass">

@import "../../../assets/styles/variables"

.chart-radar
  width: 100%;
  //float: left;
  background-color: $fill-button-bg-h;

  svg
    display: block;
    margin: 0 auto;

  .kytosAxisWrapper

    text
      pointer-events: none;

    .kytosGridCircle
        fill: #795ca7;
        fill-opacity: 0.1
        stroke: #795ca7;
        stroke-width: 0.6;
        stroke-opacity: 0.2;

  .kytosRadarArea
    fill-opacity: 0.3;
    stroke-width: 0;
    stroke-opacity: 0;

  .kytosRadarStroke
    fill-opacity: 0;
    stroke-width: 1.5;
    stroke-opacity: 0.7;

  .kytosRadarArea,
  .kytosRadarStroke

    &.tx
      fill: rgba(102, 255, 255, 0.6);
      stroke: rgba(102, 255, 255, 0.6);

    &.rx
      fill: rgba(255, 102, 255, 0.6);
      stroke: rgba(255, 102, 255, 0.6);

    &:hover
      fill-opacity: 0.7;

  .kytosAxis
    display: none;

  .kytosTooltip
    fill: rgba(255, 255, 255, 0.7)
    font-size: 14px;

</style>
