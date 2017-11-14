<template>
<div class="container">
  <section class="kytos-menu-bar">
    <div class="logo" v-on:click="this.toggle" v-bind:class="{ expanded: expanded  }">
      <img v-show="this.expanded" src="../../assets/logo-kytos.svg" class="icon-kytos" alt="Kytos" height="35">
      <img v-show="!this.expanded" src="../../assets/icon-kytos.svg" class="logo-kytos" alt="Kytos" height="35">
    </div>
    <icon name="desktop" v-bind:class="{ active: activeItem==1 }" v-on:click.native="setItem(1)"></icon>
    <icon name="link" v-bind:class="{ active: activeItem==3 }" v-on:click.native="setItem(3)"></icon>
    <icon name="cube" v-bind:class="{ active: activeItem==2 }" v-on:click.native="setItem(2)"></icon>
  </section>
    <kytos-toolbar v-show="!expanded" :switchLabels="switchLabels" :interfaceLabels="interfaceLabels" :mapOpacity="mapOpacity" :emitMapOpacity="emitMapOpacity"></kytos-toolbar>
    <kytos-context-panel v-show="expanded">
      <kytos-accordion v-show="activeItem==1">
        <kytos-accordion-item title="Custom Labels">
          <kytos-dropdown title="Switch Labels:" icon="circle-o" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></kytos-dropdown>
          <kytos-dropdown title="Interface Labels:" icon="plug" :options="interfaceLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'interface'}}"></kytos-dropdown>
        </kytos-accordion-item>

        <kytos-accordion-item title="Background">
          <kytos-button-group>
            <kytos-button tooltip="Map Background" icon="globe"></kytos-button>
            <kytos-button tooltip="Image Background (disabled)" icon="photo" :isDisabled="true"></kytos-button>
            <kytos-button tooltip="No Background" icon="window-close-o"></kytos-button>
          </kytos-button-group>
          <kytos-slider icon="adjust" :initialValue="mapOpacity" :action="emitMapOpacity"></kytos-slider>
        </kytos-accordion-item>
      </kytos-accordion>

      <kytos-accordion v-show="activeItem==3">
        <kytos-accordion-item title="Request E-Line Circuit">
          <kytos-input id="name-input" title="Circuit Name:" tooltip="Circuit name" placeholder="Circuit Name" icon="pencil"></kytos-input>
          <kytos-input id="endpoint-a-input" title="Endpoint A:" tooltip="Endpoint A (format: dpid:port_number)" placeholder="First endpoint" icon="arrow-right"></kytos-input>
          <kytos-input id="vlan-a-input" title="VLAN A:" tooltip="Vlan id at endpoint A" placeholder="Vlan id" icon="tag"></kytos-input>
          <kytos-input id="endpoint-z-input" title="Endpoint Z:" tooltip="Endpoint Z (format: dpid:port_number)" placeholder="Last endpoint" icon="arrow-left"></kytos-input>
          <kytos-input id="vlan-z-input" title="VLAN Z:" tooltip="Vlan id at endpoint Z" placeholder="Vlan id" icon="tag"></kytos-input>
          <kytos-button tooltip="Request Circuit" title="Request Circuit" icon="gear" v-on:click.native="request_circuit()"></kytos-button>
        </kytos-accordion-item>
      </kytos-accordion>

      <kytos-accordion v-show="activeItem==2">
        <kytos-accordion-item title="Installed NApps">
          <kytos-property-panel>
            <kytos-property-panel-item :name="napp.name" :value="napp.version"  v-if="napps" v-for="napp in this.napps" :key="napp.name"></kytos-property-panel-item>
          </kytos-property-panel>
        </kytos-accordion-item>
      </kytos-accordion>
    </kytos-context-panel>
</div>
</template>

<script>
import Icon from '../../../node_modules/vue-awesome/components/Icon.vue'
import KytosBaseWithIcon from './base/KytosBaseWithIcon.vue'

import About from '../../kytos/about.vue'

export default {
  name: 'kytos-menu-bar',
  mixins: [KytosBaseWithIcon],
  props: ['toggle', 'expanded'],
  components: {
    'icon': Icon,
  },
  data() {
    return {
      activeItem: 1,
      napps: [],
      switchLabels: [],
      hostLabels: [],
      interfaceLabels: [],
      mapOpacity: 100
    }
  },
  methods: {
    emitMapOpacity (value) {
      this.$kytos.$emit('change-map-opacity', value)
    },
    about () {
      this.$kytos.$emit("showInfoPanel", About)
    },
    setItem (item) {
      this.activeItem = item
      if (item == 2) {
        this.update_napps()
      }
    },
    update_napps () {
      var self = this
      $.ajax({
        async: true,
        dataType: "json",
        url: this.$kytos_server_api + "kytos/status/v1/napps",
        success: function(data) {
          self.napps = data['napps']
        }
      });
    },
    addSwitchLabel (content) {
      let value = content.value
      let exist = this.switchLabels.filter(label => label.value == value)
      if (exist.length == 0)
        this.switchLabels.push({value: value,
                                description: content.description,
                                selected: content.selected})
    },
    addInterfaceLabel (content) {
      let value = content.value
      let exist = this.interfaceLabels.filter(label => label.value == value)
      if (exist.length == 0)
        this.interfaceLabels.push({value: value,
                                   description: content.description,
                                   selected: content.selected})
    },
    toggleLabel (type, label) {
      this.$kytos.$emit('topology-toggle-label', type, label)
    },
    request_circuit () {
      // TODO: FIx this to use model properly when on own component
      var circuit_name = $("#name-input").find('input:visible:first')[0].value
      var endpoint_a = $("#endpoint-a-input").find('input:visible:first')[0].value
      var vlan_a = $("#vlan-a-input").find('input:visible:first')[0].value
      var endpoint_z = $("#endpoint-z-input").find('input:visible:first')[0].value
      var vlan_z = $("#vlan-z-input").find('input:visible:first')[0].value

      var dpid_a = endpoint_a.split(":").slice(0,8).join(":")
      var port_a = endpoint_a.split(":").slice(8,9).join(":")

      var dpid_z = endpoint_z.split(":").slice(0,8).join(":")
      var port_z = endpoint_z.split(":").slice(8,9).join(":")

      var request =  {"name": circuit_name,
                      "uni_a": {"dpid": dpid_a,
                                "port": port_a,
                                "tag": {"tag_type": "VLAN",
                                        "value": vlan_a}},
                      "uni_z": {"dpid": dpid_z,
                                "port": port_z,
                                "tag": {"tag_type": "VLAN",
                                        "value": vlan_z}},
                      "bandwidth": 100000000000}

      $.ajax({
        url: "http://demo.kytos.io:8181/api/kytos/mef_eline/circuits",
        type:"POST",
        data: request,
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        success: function(message){
          console.log(message)
        }
      })
    }
  },
  created () {
    // Registering listeners
    this.$kytos.$on('menu-add-switch-label', this.addSwitchLabel)
    this.$kytos.$on('menu-add-interface-label', this.addInterfaceLabel)
  }
}
</script>

<style lang="sass">

@import '../../assets/styles/variables'

.kytos-menu-bar
 -webkit-order: 1
 -ms-flex-order: 1
 order: 1
 z-index: 998
 width: 40px
 height: 100vh
 background: $fill-menubar
 box-shadow: 10px 0px 20px -10px $fill-menubar

 .logo
    padding: 0
    margin: 0
    display: block
    height: 30px
    vertical-align: middle
    padding: 3px 0px 7px 0px
    background: $fill-menubar-h
    cursor: pointer
    text-align: center

 .expanded
    width: 280px
    background: $fill-menubar-h

.expanded 
 .kytos-menu-bar
   box-shadow: none

.kytos-menu-bar

 .active
  background: $fill-panel
  border-color: $fill-menubar-b

 > svg
  vertical-align: middle
  height: 20px
  width: 23px
  padding: 10px 9px 10px 5px
  cursor: pointer
  fill: $fill-icon
  border-left: 3px solid transparent
 
  &:hover
   fill: $fill-icon-h
   border-color: $fill-menubar-b
   background: $kytos-dark-gray

</style>
