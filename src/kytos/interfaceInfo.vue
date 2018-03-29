<template>
    <kytos-accordion>

      <kytos-accordion-item title="Interface Plot" v-if="chartJsonData">
        <kytos-button-group>
            <!-- input type="text" class="kytos-input" placeholder="Zoom" disabled -->
            <kytos-button title="5" tooltip="5 minutes" v-on:click.native="change_plotRange(5)"></kytos-button>
            <kytos-button title="10" tooltip="10 minutes" v-on:click.native="change_plotRange(10)"></kytos-button>
            <kytos-button title="15" tooltip="15 minutes" v-on:click.native="change_plotRange(15)"></kytos-button>
            <kytos-button title="60" tooltip="60 minutes" v-on:click.native="change_plotRange(60)"></kytos-button>
            <kytos-button title="120" tooltip="120 minutes" v-on:click.native="change_plotRange(120)"></kytos-button>
          </kytos-button-group>
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
import KytosBaseWithIcon from "../components/kytos/base/KytosBaseWithIcon"
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
      interval: null,
      plotRange: null
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
    build_url() {
        var parameters_url = "";
        if (this.plotRange !== null) {
            var unix = Math.round(+new Date()/1000);
            var start = unix - (this.plotRange * 60);
            parameters_url = parameters_url + "?start=" + start + "&end=" + unix;
        }
        var endpoint_url = this.endpoint + parameters_url;
        return endpoint_url;
    },
    update_chart() {
        json(this.build_url(), this.parseInterfaceData)
    },
    change_plotRange(range) {
        this.plotRange = range
        this.update_chart()
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
