<template>
  <div :id="id" v-bind:class="{ 'kytos-flow': true, 'kytos-flow-active': isOwner }">
      <div class="info">
        <div class="info-item" title="Priority"><icon name="level-up"></icon> {{content.priority}}</div>
        <div class="info-item" title="Hard/Idle Timeouts"><icon name="clock-o"></icon> {{content.hard_timeout}} / {{content.idle_timeout}}</div>
        <div class="info-item" title="Cookie"><icon name="bookmark-o"></icon> {{content.cookie}}</div>
      </div>

      <div class="match"> 
        <div class="match-l2">
         <!-- L2 match -->
         <div class="match-item"><span>In:</span> {{content.match.in_port | orNone}}</div>
         <div class="match-item"><span>Src:</span> {{content.match.dl_src | orNone}}</div>
         <div class="match-item"><span>Dst:</span> {{content.match.dl_dst | orNone}}</div>
         <div class="match-item"><span>Type:</span> {{content.match.dl_type | orNone}}</div>
         <div class="match-item"><span>Vlan:</span> {{content.match.dl_vlan | orNone}}</div>
        </div>
        <div class="match-l3">
         <!-- L3 match -->
         <div class="match-item"><span>Src:</span> {{content.match.nw_src | orNone}}</div>
         <div class="match-item"><span>Dst:</span> {{content.match.nw_dst | orNone}}</div>
         <div class="match-item"><span>Proto:</span> {{content.match.nw_proto | orNone}}</div>
        </div>
      </div>

      <div class="actions">
        <div class="action-item" v-for="action in content.actions">{{action | formatAction}}</div>
      </div>

  </div>
</template>

<script>
import KytosBase from '../base/KytosBaseWithIcon.vue'
const d3 = require('d3')

export default {
  name: 'kytos-flow',
  mixins: [KytosBase],
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
    isOwner: false,
    }
  },
  filters: {
    orNone: function (value) {
      if (!value) return '*'
      if (value == "00:00:00:00:00:00") return '*'
      if (value == "0.0.0.0") return '*'
      return value
    },
    formatAction: function (action) {
      if (action.action_type == "output")
        return action.action_type + "(" + action.port + ")"
      else
        return action
    }
  },
  methods: {
    get_plot_selector() {
      return "plot-" + this.content.id
    },
    //update_chart() {

    //  // Prepare interface plot
    //  var margin = {top: 5, right: 0, bottom: 0, left: 5},
    //      width = 400 - margin.left - margin.right,
    //      height = 45 - margin.top - margin.bottom;

    //  var parseDate = d3.timeParse("%d-%b-%y")

    //  var x = d3.scaleTime().range([0, width]);
    //  var y = d3.scaleLinear().range([height, 0]);

    //  var txline = d3.line()
    //      .curve(d3.curveMonotoneX)
    //      .x(function(d) { return x(d.timestamp); })
    //      .y(function(d) { return y(d.tx_bytes); });

    //  var rxline = d3.line()
    //      .curve(d3.curveMonotoneX)
    //      .x(function(d) { return x(d.timestamp); })
    //      .y(function(d) { return y(d.rx_bytes); });

    //  var selector = this.get_plot_selector()
    //  var chart = d3.select('#'+selector)
    //      .append("svg")
    //          //.attr("width", width + margin.left + margin.right)
    //          .attr("preserveAspectRatio", "xMinYMin meet")
    //          .attr("height", height + margin.top + margin.bottom)
    //          //.attr("viewBox", "0 0 960 500")
    //      .append("g")
    //          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //  var uri = "http://demo.kytos.io:8181/api/kytos/of_stats/v1/"
    //  var endpoint = uri + this.dpid + "/ports/" + this.port_number + "/random"

    //  d3.json(endpoint, function(error, result) {
    //    var values = result['data']
    //    var data = []
    //    for (var k in values.timestamps) {
    //      data.push({'timestamp': new Date(values.timestamps[k] * 1000),
    //                 'tx_bytes': values.tx_bytes[k],
    //                 'rx_bytes': values.rx_bytes[k]})
    //    }

    //    x.domain(d3.extent(data, function(d) { return d.timestamp; }))
    //    y.domain([0, d3.max(data, function(d) { return d.tx_bytes; })])
    //    chart.append("path")
    //        .attr("class", "tx")
    //        .attr("d", txline(data))

    //    chart.append("path")
    //        .attr("class", "rx")
    //        .attr("d", rxline(data))

    //  })
    //}
  },
  mounted () {
      var vlan = Number(this.content.match.dl_vlan)
      if ((vlan >= 3790) &&
          (vlan <= 3799)) {
        this.isOwner = true
      }
      else {
        this.isOwner = false
      }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'
.kytos-flow
  cursor: pointer
  margin-bottom: 5px
  width: 100%
  font-size: 0.8em
  background: $fill-button-bg

  &:hover
   color: $fill-link-h
   background: $fill-button-bg-h

  span
   font-weight: bold
   font-size: 0.8em

  .info
    display: flex
    background: $fill-button-bg-h
    padding: 3px

    svg
      margin-right: 8px

    .info-item
      align-items: center
      justify-content: center
      display: flex
      width: 30%
      text-align: center

  .match
    width: 100%
    line-height: 1.4em
    flex: 1
    flex-direction: column
    position: relative
    display: table

    .match-l2, .match-l3
     display: flex
     flex-wrap: wrap

    .match-item
     display: table-cell
     max-width: 50%
     min-width: 30%
     padding-left: 3px

  .actions
    background: $fill-button-bg-h
    padding: 5px
    text-align: center

  .details
    width: 130px
    background-color: $fill-input-bg

    .name
      font-size: 0.7em
      display: block
      overflow: hidden
      height: 10px
      padding: 5px 5px 5px

    .speed
      font-size: 1.2em
      padding: 5px 5px 5px

  .chart
    width: 100%
    float: left
    background-color: $fill-button-bg-h

    path
      stroke: #00FFFF
      stroke-width: 1
      fill: none

    .axis path,
    .axis rx
      fill: none
      stroke: grey
      stroke-width: 1
      shape-rendering: crispEdges

    path:first-child
      stroke: #FF00FF

.kytos-flow-active
  .info
    border-left: 3px solid $kytos-purple 

  .match
    border-left: 3px solid $kytos-purple

  .actions
    border-left: 3px solid $kytos-purple 

</style>
