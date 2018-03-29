<template>
  <button :id="id" class="kytos-button compact"
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
 * @example <kytos-button tooltip="Request Circuit" title="Request Circuit" icon="gear" :action="request_circuit"></kytos-button>
 * @example /_static/imgs/components/input/kytos-button.png
 */

export default {
  name: 'kytos-button',
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

.kytos-button
  display: block
  outline: 0
  border: none
  min-width: 30px
  height: 30px
  margin: 2px
  margin-top: 5px
  text-align: center
  cursor: Pointer
  padding: 0px
  transition: 0.3s
  color: $fill-button
  background: $fill-button-bg

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

</style>
