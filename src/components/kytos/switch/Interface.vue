<template>
  <div :id="id" class="kytos-interface" v-on:click="open_interface">
      <div class="usage" :class="utilization_color_class"></div>
      <div class="details" :title="mac">
        <div class="name">{{name}} ({{port_number}})</div>
        <div class="x_bytes">
          <div class="padding-top-bottom"></div>
          <div class="tx_bytes">{{ tx_bytes * 8 | humanize_bytes }} T&nbsp;</div>
          <div class="padding-middle"></div>
          <div class="rx_bytes">{{ rx_bytes * 8 | humanize_bytes }} R&nbsp;</div>
          <div class="padding-top-bottom"></div>
        </div>
      </div>

      <kytos-chart-timeseries v-if="chartJsonData" :interface_id="interface_id" :jsonData="chartJsonData" :showGrid="false" :showAxis="false" :plotArea="false" :chartHeight="45"></kytos-chart-timeseries>
      <div class="warn" v-else=>&nbsp;Interface speed is unavailable</div>

  </div>
</template>

<script>
import KytosBase from '../base/KytosBase.vue'
import InterfaceInfo from '../../../kytos/interfaceInfo.vue'
import {json} from "d3-request"

/**
 * Representation of the interfaces used.
 */

export default {
  name: 'kytos-interface',
  mixins: [KytosBase],
  props: {
    name: {
      type: String,
      required: true,
    },
    mac: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      required: false,
    },
    port_number: {
      type: Number,
      required: true,
    },
    interface_id: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      chartJsonData: null,
      interval: null,
      tx_bytes: null,
      rx_bytes: null,
    }
  },
  computed: {
    dpid () {
      return this.interface_id.split(":").slice(0,-1).join(":")
    },
    endpoint () {
      let url = this.$kytos_server_api + "kytos/of_stats/v1/"
      return url + this.dpid + "/ports/" + Number(this.port_number)
    },
    utilization_color_class: function () {
      if (this.speed === null) return ''

      // Calculate highest interface utilization (tx or rx)
      let max_Bps = Math.max(this.tx_bytes, this.rx_bytes)
      let utilization = max_Bps / this.speed

      if (utilization > 0.8) return 'high'
      if (utilization > 0.5) return 'medium'
      return 'low'
    }
  },
  methods: {
    open_interface() {
      var content = {"component": InterfaceInfo,
                     "content": this,
                     "maximized": true,
                     "icon": "gear",
                     "title": "Interface Details",
                     "subtitle": this.name}
      this.$kytos.$emit("showInfoPanel", content)

    },
    parseInterfaceData (data) {
      if (!data) {
        var msg = "Error while trying to fetch interface data."
        this.$kytos.$emit('statusMessage', msg, true)
      } else {
        this.chartJsonData = data['data']
      }
    },
    update_chart() {
      json(this.endpoint, this.parseInterfaceData)
    }
  },
  mounted () {
    this.update_chart()
    this.interval = setInterval(this.update_chart, 60000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },

  watch: {
    chartJsonData () {
      let data = this.chartJsonData
      let last_index = data.tx_bytes.length - 1
      this.tx_bytes = data.tx_bytes[last_index]
      this.rx_bytes = data.rx_bytes[last_index]
    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-interface
  display: flex
  cursor: pointer
  padding-top: 0.3em
  width: 100%
  background-color: $fill-button-bg

  &:hover *
   color: $fill-link-h
   background: $fill-button-bg-h

  .usage
    min-width: 4px

    &.high
      background-color: $kytos-red
    &.medium
      background-color: $kytos-yellow
    &.low
      background-color: $kytos-green

  .details
    min-width: 90px
    background-color: $fill-input-bg
    display: flex
    flex-direction: column

    .name
      font-size: 0.7em
      display: block
      overflow: hidden
      height: 10px
      padding: 5px 5px 5px
      flex: 0 0 auto
      text-align: center

    .x_bytes
      font-size: 0.7em
      font-family: monospace
      white-space: nowrap
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: flex-end

      .tx_bytes
        color: #66FFFF
        flex: 4

      .rx_bytes
        color: #FF66FF
        flex: 4

      .padding-middle
        min-height: 5px
        flex: 2

      .padding-top-bottom
        min-height: 2.5px
        flex: 1

  .warn
    color: $kytos-yellow
    flex: 1 0 auto
    width: 100%
    align-self: center
    justify-content: center

</style>
