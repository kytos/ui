<template>
    <kytos-accordion>

      <kytos-accordion-item title="Interface Plot" v-if="chartJsonData">
        <kytos-chart-timeseries :interface_id="metadata.interface_id" :jsonData="chartJsonData" :display_legend="true" :chartHeight="200" ></kytos-chart-timeseries>
      </kytos-accordion-item>

      <kytos-accordion-item title="Basic Details">
          <kytos-property-panel>
              <kytos-property-panel-item :name="key" :value="value" :key="key" v-if="content" v-for="(value, key) in this.metadata"></kytos-property-panel-item>
          </kytos-property-panel>
      </kytos-accordion-item>

    </kytos-accordion>
</template>

<script>
import KytosBaseWithIcon from "../components/kytos/base/KytosBaseWithIcon.vue"
import {json} from "d3-request"

export default {
  name: 'kytos-interface-info',
  mixins: [KytosBaseWithIcon],
  props: ["content"],
  data () {
    return {
      display: false,
      metadata: {"interface_id": "",
                 "name": "",
                 "port_number": "",
                 "dpid": "",
                 "mac": "",
                 "speed": ""},
      chartJsonData: null,
      interval: null
    }
  },
  computed: {
    endpoint () {
      let url = this.$kytos_server_api + "kytos/of_stats/v1/"
      return url + this.metadata.dpid + "/ports/" + this.metadata.port_number
    }
  },
  methods: {
    update_interface_content () {
      var self = this
      let filter = this.$root.$options.filters.humanize_bytes
      Object.keys(this.metadata).forEach(function (key) {
        let value = self.content[key]
        if (key == 'speed') {
          value = (value === null) ? 'Unavailable' : filter(value * 8)
        }
        self.metadata[key] = String(value)
      });
    },
    parseInterfaceData (data) {
      if (!data) {
        var msg = "Error while trying to fetch interface data."
        this.$kytos.$emit('statusMessage', msg, true)
      } else {
        this.chartJsonData = data["data"]
      }
    },
    update_chart() {
      json(this.endpoint, this.parseInterfaceData)
    }
  },
  mounted () {
    this.update_interface_content()
    this.update_chart()
    this.interval = setInterval(this.update_chart, 60000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  watch: {
    content () {
      if (this.content) {
        this.update_interface_content()
        this.update_chart()
      }
    }
  }
}
</script>
<style lang="sass">

@import '../assets/styles/variables'

</style>
