<template>
  <div class="chart-timeseries" :id="plotId"></div>
</template>

<script>
import KytosBase from "../base/KytosBase.vue"
const d3 = require("d3")

export default {
  name: "kytos-chart-timeseries",
  mixins: [KytosBase],
  props: {
    chartHeight: {
      type: Number,
      required: true
    },
    interface_id: {
      type: String,
      required: true
    },
    jsonData: {
      type: Object,
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
    plotArea: {
      type: Boolean,
      default: true
    },
    display_legend: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      margin: {top: 10, right: 30, bottom: 30, left: 30},
      data: null,
      chart: null,
      x: null,
      y: null,
      xaxis: null,
      yaxis: null,
      xgrid: null,
      ygrid: null,
      txline: null,
      rxline: null,
      txarea: null,
      rxarea: null,
      updatedHeight: null
    }
  },
  computed: {
    chartWidth () {
      let container = document.getElementById(this.plotId).parentElement
      return container.getBoundingClientRect().width
    },
    height () {
      return this.updatedHeight - this.margin.top - this.margin.bottom
    },
    width () {
      return this.chartWidth - this.margin.left - this.margin.right
    },
    dpid () {
      return this.interface_id.split(":").slice(0,-1).join(":")
    },
    legend_height () {
      return (this.display_legend) ? 40 : 0
    },
    plotId () { return "timeseries-" + this.id },
    maxSpeed () { return Number(this.jsonData.speed) || 0 }
  },
  methods: {
    buildLine (yParam) {
      let x = this.x
      let y = this.y
      return d3.line().curve(d3.curveMonotoneX)
        .x(function(d) { return x(d.timestamp) })
        .y(function(d) { return y(d[yParam]) })
    },
    buildArea (yParam) {
      let x = this.x
      let y = this.y
      return d3.area().curve(d3.curveMonotoneX)
          .x(function(d) { return x(d.timestamp) })
          .y0(this.height)
          .y1(function(d) { return y(d[yParam]) })
    },
    parseJsonData () {
      let data = []
      Object.entries(this.jsonData.timestamps).forEach(([idx, timestamp]) => {
        data.push({"timestamp": new Date(timestamp * 1000),
                   "tx_bytes": this.jsonData.tx_bytes[idx],
                   "rx_bytes": this.jsonData.rx_bytes[idx]})
      })
      this.data = data
    },
    updateMargins () {
      this.updatedHeight = this.chartHeight
      this.margin.left = this.chartWidth * 0.02
      this.margin.right = this.chartWidth * 0.02
      this.margin.top = this.updatedHeight * 0.08
      this.margin.bottom = this.updatedHeight * 0.05
      if (this.showAxis) {
        this.margin.left = this.chartWidth * 0.08
        this.margin.bottom = this.updatedHeight * 0.12
      }
    },
    init () {
      // Init x axis
      this.x = d3.scaleTime().range([0, this.width])
      // Init y axis
      this.y = d3.scaleLinear().range([this.height, 0])

      // Init x axis
      this.xaxis = d3.axisBottom(this.x)

      // Init y axis
      let humanize_bytes = this.$root.$options.filters.humanize_bytes
      this.yaxis = d3.axisLeft(this.y)
        .tickFormat(function(v) { return humanize_bytes(v * 8) })

      // Init x grid
      this.xgrid = d3.axisBottom(this.x)
        .ticks(20)
        .tickSize(-this.height)
        .tickFormat("")

      // Init y grid
      this.ygrid = d3.axisLeft(this.y)
        .tickSize(-this.width)
        .tickFormat("")

      // init lines and areas
      this.txline = this.buildLine("tx_bytes")
      this.rxline = this.buildLine("rx_bytes")
      this.txarea = this.buildArea("tx_bytes")
      this.rxarea = this.buildArea("rx_bytes")

      this.chart = d3.select("#" + this.plotId)
        .append("svg")
          .attr("width", this.width + this.margin.left + this.margin.right)
          .attr("height", this.height + this.margin.top + this.margin.bottom + this.legend_height)
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0 " + (this.width + this.margin.left + this.margin.right) + " " + (this.height + this.margin.top + this.margin.bottom))
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

    },
    initChartData () {
      if (this.display_legend == true){
        // Legend
        var legend_position = this.height + this.margin.top + this.margin.bottom
        var data = ["rx","tx"]
        this.legend = this.chart
          .selectAll("g")
          .data(data)
          .enter()
          .append("g")
          .attr("transform", function(d, i) {
            return "translate(" + i* 100 + ","+legend_position+")";
          })

        this.legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("class", function(d){
          return d + " line area"
        })

        this.legend.append("text")
          .data(data)
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .text(function(d) {
            return d + " bytes";
        });
      }
      // X scale domain
      this.x.domain(d3.extent(this.data, function(d) { return d.timestamp }))

      // Y scale domain
      let max_y = d3.max(this.data, function(d) { return Math.max(d.tx_bytes, d.rx_bytes) })
      max_y = Math.max(max_y, this.maxSpeed)
      this.y.domain([0, max_y])

      // X gridlines
      this.chart.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .classed("x grid", true)
        .classed("hidden", !this.showGrid)
        .call(this.xgrid)

      // Y gridlines
      this.chart.append("g")
        .classed("y grid", true)
        .classed("hidden", !this.showGrid)
        .call(this.ygrid)

      // X Axis
      this.chart.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .classed("x axis", true)
        .classed("hidden", !this.showAxis)
        .call(this.xaxis)

      // Y Axis
      this.chart.append("g")
        .classed("y axis", true)
        .classed("hidden", !this.showAxis)
        .call(this.yaxis)

      // TX Area plot
      this.chart.append("path")
        .classed("rx area", true)
        .classed("hidden", !this.plotArea)
        .attr("d", this.rxarea(this.data))

      // RX Area plot
      this.chart.append("path")
        .classed("tx area", true)
        .classed("hidden", !this.plotArea)
        .attr("d", this.txarea(this.data))

      // RX Line plot
      this.chart.append("path")
        .classed("rx line", true)
        .attr("d", this.rxline(this.data))

      // TX Line plot
      this.chart.append("path")
        .classed("tx line", true)
        .attr("d", this.txline(this.data))


    },
    updateChart () {
      // Set x scale domain
      this.x.domain(d3.extent(this.data, function(d) { return d.timestamp }))

      // Set y scale domain
      let max_y = d3.max(this.data, function(d) { return Math.max(d.tx_bytes, d.rx_bytes) })
      max_y = Math.max(max_y, this.maxSpeed)
      this.y.domain([0, max_y])

      // Select the section we want to apply our changes to
      let container = d3.select("#" + this.plotId).transition()

      // Make the changes
      container.selectAll(".rx.area")
        .duration(750)
        .attr("d", this.rxarea(this.data))
      container.selectAll(".tx.area")
        .duration(750)
        .attr("d", this.txarea(this.data))
      container.selectAll(".rx.line")
        .duration(750)
        .attr("d", this.rxline(this.data))
      container.selectAll(".tx.line")
        .duration(750)
        .attr("d", this.txline(this.data))
      container.selectAll(".x.grid")
        .duration(750)
        .call(this.xgrid)
      container.selectAll(".y.grid")
        .duration(750)
        .call(this.ygrid)
      container.selectAll(".x.axis")
        .duration(750)
        .call(this.xaxis)
      container.selectAll(".y.axis")
        .duration(750)
        .call(this.yaxis)

      // Hide Elements that need to be hidden
      this.toggleElements()
    },
    toggleElements () {
      let container = d3.select("#" + this.plotId)
      container.select(".rx.area").classed("hidden", !this.plotArea)
      container.select(".tx.area").classed("hidden", !this.plotArea)
      container.select(".x.grid").classed("hidden", !this.showGrid)
      container.select(".y.grid").classed("hidden", !this.showGrid)
      container.select(".x.axis").classed("hidden", !this.showAxis)
      container.select(".y.axis").classed("hidden", !this.showAxis)
    }
  },
  mounted () {
    this.parseJsonData()
    this.updateMargins()
    this.init()
    this.initChartData()
    this.toggleElements()
  },
  updated () {
    this.parseJsonData()
    this.updateChart()
  },
  watch: {
    jsonData () {
      this.parseJsonData()
      this.updateChart()
    },
    chartHeight () {
      this.updateMargins()
    }
  }
}
</script>

<style lang="sass">

@import "../../../assets/styles/variables"

.chart-timeseries
  width: 100%;
  float: left;
  background-color: $fill-button-bg-h;

  text
    fill: grey;
    font-size: 0.85;

  .grid
    line
      stroke: grey;
      stroke-opacity: 0.7;

    path
      stroke-width: 0;

  .axis
    font-size: 0.9em;

    path
      fill: none;
      stroke-width: 1;
      stroke: #00FFFF;

  .area
    stroke-width: 0;
    fill-opacity: 0.4;

  .line,
    stroke-width: 2;
    fill: none;

  .rx
    &.line
      stroke: #FF00FF;
    &.area
      fill: #FF00FF;

  .tx
    &.line
      stroke: #00FFFF;
    &.area
      fill: #00FFFF;

  .hidden
    display: none;
</style>
