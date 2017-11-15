<template>
  <kytos-chart-radar v-if="data" :data="data" :showGrid="showGrid" :showAxis="showAxis" :showLabels="showLabels" :showLegend="showLegend"></kytos-chart-radar>
</template>

<script>
import KytosBaseWithIcon from '../components/kytos/base/KytosBaseWithIcon.vue'
import {json} from "d3-request"

export default {
  name: 'kytos-switch-radar',
  mixins: [KytosBaseWithIcon],
  props: {
    dpid: {
      type: String,
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
      data: null,
      interval: null
    }
  },
  computed: {
    endpoint () {
      let url = this.$kytos_server_api + "kytos/of_stats/v1/"
      return url + this.dpid + "/ports"
    }
  },
  methods: {
    updateChart () {
      json(this.endpoint, this.parseData)
    },
    parseData (data) {
      if (!data) {
        var msg = "Error while fetching switch data."
        this.$kytos.$emit("statusMessage", msg, true)
      } else {
        let rx = {key: "rx", values: []}
        let tx = {key: "tx", values: []}
        data = data["data"]
        data.forEach((_iface) => {
          if (_iface.speed) {
            let rx_val = Math.round((10000 * _iface.rx_bytes) / _iface.speed) / 10000
            let tx_val = Math.round((10000 * _iface.tx_bytes) / _iface.speed) / 10000
            rx.values.push({axis: String(_iface.port), value: rx_val})
            tx.values.push({axis: String(_iface.port), value: tx_val})
          }
        })

        this.data = [rx, tx]
      }
    },
  },
  mounted () {
    this.updateChart()
    this.interval = setInterval(this.updateChart, 60000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  watch: {
    dpid () {
      this.updateChart()
    }
  }
}
</script>
