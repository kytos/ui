<template>
<section class="k-context-panel">
  <icon v-if="icon" v-bind:name="icon"></icon>
  <div v-if="title" class="pannel-title">
    <h1>{{title}} <small>{{subtitle}}</small></h1>
  </div>
  <!--@slot Can be filled with the panel content -->
  <slot />
</section>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * Represents a context where the developer can add any desired content.
 */
export default {
  name: 'k-context-panel',
  mixins: [KytosBaseWithIcon],
  props: {
    subtitle: {
        type: String
    },
  },
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-context-panel
  -webkit-order: 2
  -ms-flex-order: 2
  order: 2
  background: $fill-panel
  max-height: 100vh
  width: 220px
  margin-top: 40px
  padding: 5px 10px
  z-index: 99
  box-shadow: 10px 0px 20px -10px $fill-panel
  color: red

  > svg
   vertical-align: middle
   color: $fill-icon

  .pannel-title
    padding: 5px 0
    background: $fill-panel-h
    height: 35px

  > h1
    font-size: 0.9em
    line-height: 3em
    font-weight: bold
    float: left
    color: $fill-text

  .pannel-title
    small
      font-size: 0.5em
      font-weight: bold
      margin: 0.5em
      color: $fill-text

</style>
