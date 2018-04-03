<template>
<div class="k-button-wrapper compact">
    <a v-if="tooltip" v-bind:title="tooltip" class="k-button-wrapper-tooltip"></a>
     <!-- @slot Slot to be filled with a buttons set -->
    <slot />
</div>
</template>

<script>
import KytosBase from '../../base/KytosBase';

/**
 * Allows to group buttons (``k-button``), which trigger events when clicked.
 *
 * @example /_static/imgs/components/input/k-button-group.png
 */

export default {
  name: 'k-button-group',
  mixins: [KytosBase],
  data: function() {
    return {
      buttons: []
    }
  },
  created: function() {
      this.buttons = this.$children;
  },

}
</script>

<style lang="sass">

@import '../../../../assets/styles/variables'

.k-button-wrapper
 display: inline-flex
 position: relative
 vertical-align: middle

</style>
