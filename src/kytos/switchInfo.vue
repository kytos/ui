<template>

    <kytos-accordion>

    <kytos-accordion-item title="Usage Radar" v-if="this.metadata.id">
      <kytos-switch-radar :dpid="metadata.id" :showGrid="true" :showAxis="true" :showLabels="true" :showLegend="false"></kytos-switch-radar>
    </kytos-accordion-item>

    <kytos-accordion-item title="Basic Details">
        <kytos-property-panel>
            <kytos-property-panel-item :name="key" :value="value" :key="key" v-if="content" v-for="(value, key) in this.metadata"></kytos-property-panel-item>
        </kytos-property-panel>
    </kytos-accordion-item>

    <kytos-accordion-item title="Custom Properties" v-if="this.custom_properties">
        <kytos-property-panel>
            <kytos-property-panel-item :name="key" :value="value" v-if="content" :key="key" v-for="(value, key) in this.custom_properties"></kytos-property-panel-item>
        </kytos-property-panel>
    </kytos-accordion-item>

    <kytos-accordion-item title="Interfaces" v-if="this.interfaces">
       <kytos-interface :interface_id="interface.id" :name="interface.name" :port_number="interface.port_number" :mac="interface.mac" :speed="interface.speed" :key="interface.name" v-for="interface in this.interfaces"></kytos-interface>
    </kytos-accordion-item>

    <kytos-accordion-item title="Flows" v-if="this.flows">
       <kytos-flow :content="flow" :key="flow.id" v-for="flow in this.flows"></kytos-flow>
    </kytos-accordion-item>


    </kytos-accordion>
</template>

<script>
import KytosBaseWithIcon from '../components/kytos/base/KytosBaseWithIcon'
const d3 = require('d3')

export default {
  name: 'kytos-switch-info',
  mixins: [KytosBaseWithIcon],
  props: ["content"],
  data () {
    return {
      display: false,
      metadata: {'id': '',
                 'name': '',
                 'dpid': '',
                 'connection': '',
                 'ofp_version': '',
                 'manufacturer': '',
                 'serial': '',
                 'hardware': '',
                 'software': ''},
      interfaces: [],
      custom_properties: {},
      flows: [],
    }
  },
  methods: {
    update_switch_content () {
      this.interfaces = this.content.interfaces
      this.custom_properties = this.content.custom_properties
      var self = this
      Object.keys(this.metadata).forEach(function (key) {
        let value = self.content[key]
        self.metadata[key] = String(value)
      });

      this.get_flows()
    },
    get_flows() {
      var dpid = this.metadata.dpid
      var endpoint = this.$kytos_server_api + "kytos/flow_manager/v2/flows/" + dpid
      var self = this
      d3.json(endpoint, function(error, result) {
        self.flows = result[dpid].flows
      })
    }
  },
  mounted () {
    this.update_switch_content()
  },
  watch: {
    content () {
      if (this.content) {
        this.update_switch_content()
      }
    }
  }

}
</script>

