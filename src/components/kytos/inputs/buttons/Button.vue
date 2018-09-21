<template>
  <button :id="id" class="k-button compact"
    @click="this.click"
    v-bind:title="tooltip"
    v-bind:disabled="isDisabled">
      <icon v-if="icon" v-bind:name="icon"></icon>
      {{title}}
  </button>
</template>

<script>
import KytosBase from '../../base/KytosBase';
import KytosBaseWithIcon from '../../base/KytosBaseWithIcon';

/**
 * This component represents a button that triggers an event when clicked.
 * @example <k-button tooltip="Request Circuit" title="Request Circuit" icon="gear" :action="request_circuit"></k-button>
 * @example /_static/imgs/components/input/k-button.png
 */

export default {
  name: 'k-button',
  mixins: [KytosBaseWithIcon],
  props: {
    /**
    * Function called after the button is clicked.
    */
    on_click: {
      type: Function,
      default: function(val) { return },
    }
  },
  methods: {
     /**
     * Call on_click event.
     *
     * @public
     * @param {object} event trigged event
     */
    click(event){
      this.on_click()
    }
  }
}
</script>

<style lang="sass">

@import '../../../../assets/styles/variables'

.k-button
  display: block
  outline: 0
  border: none
  min-width: 25px
  height: 28px
  overflow: hidden
  margin: 2px
  text-align: center
  cursor: Pointer
  padding: 2px 5px
  transition: 0.3s
  color: $fill-button
  background: $fill-button-bg

  svg
   padding: 0 2px
   margin-top: -1px

  &:hover
   color: $fill-button-hover
   background: $fill-button-bg-h

   &> svg
    fill: $fill-icon-h
    outline: 0

  &.active
   & > svg
     fill: $fill-icon-h
     outline: 0

  & > svg
   vertical-align: middle
   fill: $fill-icon
   outline: 0

.k-toolbar

 .k-button
   border-radius: 2px
   font-size: 0.9em

   &:hover
    box-shadow: 0 0 5px 2px $kytos-black

   &:disabled
    opacity: 0.5
    cursor: default

</style>
