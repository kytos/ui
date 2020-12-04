<template>
    <k-toolbar-item icon="desktop" tooltip="MapBox Settings">
      <k-context-panel title_color="#554077" title="MapBox Settings" icon="gear">
        <k-accordion>
          <k-accordion-item title="Custom Labels">
            <k-dropdown title="Switch Labels:" icon="circle-o" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></k-dropdown>
            <k-dropdown title="Interface Labels:" icon="plug" :options="interfaceLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'interface'}}"></k-dropdown>
          </k-accordion-item>

          <k-accordion-item title="Background">
            <k-button-group>
              <k-button tooltip="Map Background" icon="globe"></k-button>
              <k-button tooltip="Image Background (disabled)" icon="photo" :is-disabled="true"></k-button>
              <k-button tooltip="No Background" icon="window-close-o"></k-button>
            </k-button-group>
            <k-slider icon="adjust" :initial-value="mapOpacity" :action="emitMapOpacity"></k-slider>
          </k-accordion-item>
        </k-accordion>
      </k-context-panel>
    </k-toolbar-item>
</template>

<script>
module.exports = {

  methods: {
    emitMapOpacity (value) {
      this.$kytos.$emit('change-map-opacity', value)
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
        mapOpacity: 100,
        shapes: []
      }
  }
}
</script>
