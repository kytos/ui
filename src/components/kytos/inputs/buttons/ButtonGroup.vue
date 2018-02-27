<template>
<div class="kytos-button-wrapper">
    <a v-if="tooltip" v-bind:title="tooltip" class="kytos-button-wrapper-tooltip"></a>
    <slot />
</div>
</template>

<script>
import KytosBase from '../../base/KytosBase.vue';

export default {
  name: 'kytos-button-group',
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

.kytos-button-wrapper
 display: inline-flex
 position: relative
 vertical-align: middle

</style>
