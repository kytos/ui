<template>
<div class="accordion-wrapper">
    <slot />
</div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue';

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
  width: 100%
  position: relative

</style>
