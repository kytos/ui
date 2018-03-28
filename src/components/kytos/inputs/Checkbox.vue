<template>
  <div class="kytos-checkbox-wrap">
  <icon v-if="icon" v-bind:name="icon"></icon>
  <label class="checkbox">
    <input type="checkbox" id="checkbox" v-model="enabled" @change="update_check()">
    <span class="slider"></span>
  </label>
  {{title}}
  </div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue';

/**
 * A GUI widget that permits the user to make a binary choice, checked (ticked) when activated or not checked when disable.
 *
 * @example /_static/imgs/components/input/kytos-checkbox.png
 */

export default {
  name: 'kytos-checkbox',
  mixins: [KytosBaseWithIcon],
  props: {
      model: {
        type: Array,
      },
      value: {
        default: 0
      },
      checked: {
        type: Boolean,
        default: false
      },
      action: {
        type: Function,
        default: function(value) { return }
      }
  },
  methods: {
    update_check(){
      if(this.enabled){
        this.list_of_checked.push(this.value)
      }else{
        this.list_of_checked.splice(this.list_of_checked.indexOf(this.value),1);
      }
      this.action(this.value)
    }
  },
  data () {
    return {
      enabled: this.checked,
      list_of_checked: this.model || []
    }
  },
  mounted () {
    $(document).ready(this.update_check)
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-checkbox-wrap
 display: inline-flex
 align-items: center
 vertical-align: middle
 font-size: 0.8em
 color: $fill-text
 background: $fill-button-bg

 &:hover svg
  fill: $fill-icon-h

 svg
  padding: 0.3em 0.5em
  fill: $fill-icon

 .checkbox
  position: relative
  display: inline-block
  width: 14px
  height: 14px
  margin-right: 5px

 .checkbox input
  display: none

 .slider
  position: absolute
  cursor: pointer
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: $fill-button-bg-h
  -webkit-transition: 0.2s
  transition: 0.2s

  &:before
   line-height: 10px
   content: "✓"
   height: 10px
   width: 10px
   color: transparent
   font-size: 1px
   -webkit-transition: 0.2s
   transition: 0.2s

 input
  &:focus
   + .slider
      box-shadow: 0 0 1px $fill-icon

  &:checked
    + .slider
      background-color: $fill-icon-h

      &:before
        color: $fill-icon
        font-size: 1.7em

 &.round
  .checkbox
   width: 30px

  .slider
   border-radius: 8px
   -webkit-transition: 0.4s
   transition: 0.4s

   &:before
    position: absolute
    content: ""
    height: 10px
    width: 10px
    left: 2px
    bottom: 2px
    background-color: $fill-icon
    -webkit-transition: 0.4s
    transition: 0.4s;
    border-radius: 50%

  input:checked
    + .slider:before
       -webkit-transform: translateX(14px)
       -ms-transform: translateX(14px)
       transform: translateX(14px)

.kytos-toolbar .kytos-checkbox-wrap
 background: none

</style>
