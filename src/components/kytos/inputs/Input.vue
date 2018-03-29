<template>
  <div class="kytos-input-wrap">
    <icon v-if="icon" v-bind:name="icon"></icon>
    <input ref="input" @input="updateText($event.target.value)"  type="text" :id="id" class="kytos-input" :value="value" :tooltip="tooltip" :placeholder="placeholder"
      v-bind:disabled="isDisabled" onshow="this.focus()" autofocus>
    </input>
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * An input field where the user can enter data.
 *
 * @example /_static/imgs/components/input/kytos-input.png
 */

export default {
  name: 'kytos-input',
  mixins: [KytosBaseWithIcon],
  props: {
   /**
   * Input Current value
   */
   value: {
      type: String
   },
   /*
   * Model value
   */
   modelValue: {
      default: ""
   },
   /*
   * Tooltip string for the input.
   */
   tooltip: {
      type: String
   },
   placeholder: {
      type: String
   },
   /**
   * Function called after input changes.
   */
   action: {
      type: Function,
      default: function(val) {return}
   }
  },
  methods: {
    updateText(value){
      this.$emit('input', value)
      this.action(value)
    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-input-wrap
 border: 1px solid $fill-input-bg
 border-radius: 0.2em
 background: $fill-input-bg
 display: flex
 flex-direction: row

 &:hover
  border-color: $fill-input-hover
  background: $fill-input-hover

  input, svg
   background: $fill-input-hover
   fill: $fill-icon-h

 svg
  fill: $fill-icon
  padding: 0.3em 0.5em

.kytos-input
 padding: 0.2em
 border: none
 border-radius: 0.2em
 outline: none
 background: $fill-input-bg
 color: $fill-input
 font-size: 0.8em
 flex: 1

 &:focus
  border-color: $fill-input-hover

 &:hover
  border-color: $fill-input-hover
  color: $fill-text
  background: $fill-input-hover

</style>
