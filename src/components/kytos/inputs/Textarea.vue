<template>
  <div class="kytos-textarea-wrap no-compact">
    <icon v-if="icon" v-bind:name="icon"></icon>
    <textarea ref="textarea" @textarea="updateText($event.target.value)"  type="text" :id="id" class="kytos-textarea" :value="value" :tooltip="tooltip" :placeholder="placeholder"
      v-bind:disabled="isDisabled" onshow="this.focus()" autofocus>
    </textarea>
  </div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue';

export default {
  name: 'kytos-textarea',
  mixins: [KytosBaseWithIcon],
  props: {
   value: {
      type: String
    },
   modelValue: {
      default: ""
    },
   tooltip: {
      type: String
    },
   placeholder: {
      type: String
    }
  },
  methods: {
    updateText(value){
      this.$emit('textarea', value)
    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-textarea-wrap
 border: 1px solid $fill-input-bg
 border-radius: 0.2em
 background: $fill-input-bg
 display: flex
 flex-direction: row

 &:hover
  border-color: $fill-input-hover
  background: $fill-input-hover

  textarea, svg
   background: $fill-input-hover
   fill: $fill-icon-h

 svg
  fill: $fill-icon
  padding: 0.3em 0.5em

.kytos-textarea
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
