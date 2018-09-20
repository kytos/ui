<template>
  <div class="k-input-wrap">
    <icon v-if="icon" v-bind:name="icon"></icon>
    <input :value="value" :id="id" class="k-input" :tooltip="tooltip" :placeholder="placeholder"
      @input="updateText"
      ref="inputValue"
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
 * @example /_static/imgs/components/input/k-input.png
 */

export default {
  name: 'k-input',
  mixins: [KytosBaseWithIcon],
  props: {
   /**
    * The value to input button.
    */
   value: {
      type: String,
      default: ""
   },
   /*
   * Tooltip string for the input.
   */
   tooltip: {
      type: String
   },
   /**
   * Placeholder string displayed in input field.
   */
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
    updateText(){
      this.$emit('update:value', this.$refs.inputValue.value)
      this.action(this.$refs.inputValue.value)
    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-input-wrap
 border: 1px solid $fill-input-bg
 border-radius: 0.2em
 background: $fill-input-bg
 display: flex
 flex-direction: row

 &:hover
  border-color: $kytos-extra-dark
  background: $kytos-extra-dark

  input, svg
   background: $kytos-extra-dark
   fill: $fill-icon-h

 svg
  fill: $fill-icon
  padding: 0.3em 0.5em

.k-input
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
  background: $kytos-extra-dark

</style>
