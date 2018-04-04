<template>

    <k-accordion>

    <k-accordion-item title="Usage Radar" v-if="this.metadata.id">
      <k-switch-radar :dpid="metadata.id" :showGrid="true" :showAxis="true" :showLabels="true" :showLegend="false"></k-switch-radar>
    </k-accordion-item>

    <k-accordion-item title="Basic Details">
        <k-property-panel>
            <k-property-panel-item :name="key" :value="value" :key="key" v-if="content" v-for="(value, key) in this.metadata"></k-property-panel-item>
        </k-property-panel>
    </k-accordion-item>

    <k-accordion-item title="Custom Properties" v-if="this.custom_properties">
        <k-property-panel>
            <k-property-panel-item :name="key" :value="value" v-if="content" :key="key" v-for="(value, key) in this.custom_properties"></k-property-panel-item>
        </k-property-panel>
    </k-accordion-item>

    <k-accordion-item title="Interfaces" v-if="this.interfaces">
       <k-interface :interface_id="interface.id" :name="interface.name" :port_number="interface.port_number" :mac="interface.mac" :speed="interface.speed" :key="interface.name" v-for="interface in this.interfaces"></k-interface>
    </k-accordion-item>

    <k-accordion-item title="Flows" v-if="this.flows">
       <k-flow :content="flow" :key="flow.id" v-for="flow in this.flows"></k-flow>
    </k-accordion-item>


    </k-accordion>
</template>

<script>
import KytosBaseWithIcon from '../components/kytos/base/KytosBaseWithIcon'
const d3 = require('d3')

export default {
  name: 'k-switch-info',
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

