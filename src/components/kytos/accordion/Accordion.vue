<template>
<div class="accordion-wrapper">
    <slot />
</div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue';

/**
 * A GUI widget with a list of items that can be switched between hiding and showing content.
 */

export default {
  name: 'kytos-accordion',
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
