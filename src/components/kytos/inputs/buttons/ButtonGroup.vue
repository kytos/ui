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

.kytos-button-wrapper-tooltip
  display: block
  width: 15px
  height: 40px
  overflow: hidden
  margin: 0px
  padding: 0px

  &:before 
    content: ';;;;;;;'
    font: 8px monospace
    line-height: 5px
    color: $fill-bar
    filter: invert(50%)
    opacity: 0.2
    -webkit-transform: rotate(90deg)
    -moz-transform: rotate(90deg)
    -ms-transform: rotate(90deg)
    transform: rotate(90deg)
    padding: 0px
    margin: 0px
    border-bottom: 1px solid $fill-bar
    pointer-events: none
    display: block
    width: 35px
    height: 10px
    position: absolute
    left: -10px
    top: 15px

</style>
