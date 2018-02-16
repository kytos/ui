<template>
 <kytos-context-panel v-if="expanded">
    <kytos-accordion>
        <kytos-accordion-item title="Custom Labels">
          <kytos-dropdown title="Switch Labels:" icon="circle-o" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></kytos-dropdown>
          <kytos-dropdown title="Interface Labels:" icon="plug" :options="interfaceLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'interface'}}"></kytos-dropdown>
        </kytos-accordion-item>
        <kytos-accordion-item title="Background">
          <kytos-button-group>
            <kytos-button tooltip="Map Background" icon="globe"></kytos-button>
            <kytos-button tooltip="Image Background (disabled)" icon="photo" :is-disabled="true"></kytos-button>
            <kytos-button tooltip="No Background" icon="window-close-o"></kytos-button>
          </kytos-button-group>
          <kytos-slider icon="adjust" :initial-value="mapOpacity" :action="emitMapOpacity"></kytos-slider>
        </kytos-accordion-item>
      </kytos-accordion>
  </kytos-context-panel>
  <kytos-toolbar v-else :switchLabels="switchLabels" :interfaceLabels="interfaceLabels" :mapOpacity="mapOpacity" :emitMapOpacity="emitMapOpacity"></kytos-toolbar>
</template>

<script>
module.exports = {
  name: "mapbox-settings",
  props:["expanded"],
  methods: {
    emitMapOpacity (value) {
      this.$kytos.$emit('change-map-opacity', value)
      this.mapOpacity = Number(value)
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
  },
  created: function() {
    // Registering listeners
    this.$kytos.$on('menu-add-switch-label', this.addSwitchLabel)
    this.$kytos.$on('menu-add-interface-label', this.addInterfaceLabel)
  },
  data: function() {
      return {
        switchLabels: [],
        interfaceLabels: [],
        mapOpacity: 100
      }
  }
}
</script>
