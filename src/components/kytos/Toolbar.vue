<template>
<section class="kytos-toolbar">
  <kytos-button-group tooltip="Custom Labels">
    <kytos-dropdown class="inline" tooltip="Switch Labels:" icon="circle-o" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></kytos-dropdown>
    <kytos-dropdown class="inline" tooltip="Interface Labels:" icon="plug" :options="interfaceLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'interface'}}"></kytos-dropdown>
  </kytos-button-group>
  <kytos-button-group tooltip="Background">
    <kytos-button tooltip="Map Background" icon="globe"></kytos-button>
    <kytos-button tooltip="Image Background (disabled)" icon="photo" :isDisabled="true"></kytos-button>
    <kytos-button tooltip="No Background" icon="window-close-o"></kytos-button>
  </kytos-button-group>
  <kytos-button-group>
    <kytos-slider icon="adjust" :initialValue="mapOpacity" :action="emitMapOpacity"></kytos-slider>
  </kytos-button-group>
</section>
</template>

<script>
import KytosBaseWithIcon from './base/KytosBaseWithIcon.vue';

export default {
  name: 'kytos-toolbar',
  mixins: [KytosBaseWithIcon],
  props: ['switchLabels', 'interfaceLabels', 'mapOpacity', "emitMapOpacity"]
}
</script>

<style lang="sass">

@import '../../assets/styles/variables'

.kytos-toolbar
  -webkit-order: 2;
  -ms-flex-order: 2;
  order: 2;
  height: 45px;
  width: 100%;
  background: $fill-bar;
  height: 40px;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  box-shadow: 0px 10px 20px -10px $fill-bar;
  overflow: hidden;
  z-index: 99;

</style>
