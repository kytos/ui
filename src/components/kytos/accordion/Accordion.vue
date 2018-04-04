<template>
<div class="accordion-wrapper">
     <!-- @slot Slot to be filled with accordion item -->
    <slot />
</div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * A GUI widget with a list of items that can be switched between hiding and showing content.
 *
 * @example /_static/imgs/components/accordion/k-accordion.png
 */
export default {
  name: 'k-accordion',
  mixins: [KytosBaseWithIcon],
  data: function() {
    return {
      tabs: []
    }
  },
  created: function() {
      this.tabs = this.$children;
  },
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.accordion-wrapper
  position: relative

.compacted
 .accordion-wrapper
  display: inline-flex
</style>
