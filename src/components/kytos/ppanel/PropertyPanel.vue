<template>
  <div :id="id" class="k-property-panel no-compact">
  <table>
     <!-- @slot Define a table content inside, a PropertyPanelItem can be used. -->
      <slot />
  </table>
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';

/**
 * This component allows to create a table with two columns ( *name* and *value*). Each row in the table is a ``k-property-panel-item`` component, with the *value* and *name*.
 *
 * @example /_static/imgs/components/ppanel/k-property-panel.png
 * @example
 *   <k-property-panel>
 *     <k-property-panel-item v-if="napps"
 *                            v-for="napp in this.napps"
 *                            :key="napp.name"
 *                            :name="napp.name"
 *                            :value="napp.version">
 *     </k-property-panel-item>
 *   </k-property-panel>
 */
export default {
  name: 'k-property-panel',
  mixins: [KytosBase],
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-property-panel
 color: $fill-text
 overflow: auto
 max-height: 250px
 text-align: left
 margin: 0 auto
 display: block
 padding: 0.5em 0 1em 0.3em

 table
  display: table
  width: 100%

</style>
