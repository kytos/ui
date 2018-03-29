<template>
   <label class="kytos-dropdown">
    <div class="kytos-dropdown__title">
      <icon v-if="icon" v-bind:name="icon"></icon>
      {{title}}
    </div>
    <select class="kytos-dropdown__select" v-model="selected" @change.prevent="emitEvent">
      <option v-for="item in options"
              :value="item.value">{{item.description}}</option>
    </select>
   </label>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * A toggleable menu that allows the user to choose one value from a predefined list.
 *
 * @example /_static/imgs/components/input/kytos-dropdown.png
 */

export default {
  name: 'kytos-dropdown',
  mixins: [KytosBaseWithIcon],
  props: {
    options: {
      type: Array,
      required: true
    },
    event: {
      type: Object,
      required: true
    },
    action: {
      type: Function,
      default: function (event_name, content) { return }
    }
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    emitEvent () {
      let content = this.event.content
      content.value = this.selected
      /**
      * Emit an event when the dropdown is changed
      *
      * @event On kytos dropdown change
      * @type {object}
      */
      this.$kytos.$emit(this.event.name, content)
      this.action(this.event.name, content)
    }
  },
  mounted () {
    this.options.forEach((item) => {
      if (this.selected == '' && item.selected) {this.selected = item.value}
    })
  },
  watch: {
    selected () {
      this.emitEvent()
    },
    options () {
      this.options.forEach((item) => {
        if (this.selected == '' && item.selected) {this.selected = item.value }
      })
    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-dropdown
 position: relative
 display: block
 width: 100%
 padding: 0px
 margin: 5px 0px
 font-size: 0.8em
 color: $fill-text

 &:hover svg
  fill: $fill-icon-h

 &:before
  content: '◂▸'
  font: 11px monospace
  line-height: 18px
  color: $fill-icon
  -webkit-transform: rotate(90deg)
  -moz-transform: rotate(90deg)
  -ms-transform: rotate(90deg)
  transform: rotate(90deg)
  opacity: 0.7
  right: 0px
  bottom: 0px
  padding: 0px
  margin: 0px
  -webkit-margin-end: 3px
  border-bottom: 1px solid $fill-icon
  position: absolute
  pointer-events: none
  display: block

 &.inline
  position: relative
  margin-left: 15px
  display: -webkit-flex
  display: flex
  -webkit-align-items: center
  align-items: center
  min-width: 140px
  overflow: hidden

  .kytos-dropdown__title
   padding-bottom: 2px
   padding-left: 3px
   padding-top: 0px

  .kytos-dropdown__select
   margin-left: 5px
   width: 130px
   max-width: 130px

  &:before
   background: $fill-input-bg
   width: 20px
   height: 20px
   text-align: center
   top: 4.5px

.kytos-dropdown__title
 padding-bottom: 10px
 padding-top: 5px
 padding-left: 10px
 position: relative

 svg
  fill: $fill-icon
  margin-bottom: -5px
  margin-right: 5px

.kytos-dropdown__select
 -webkit-appearance: none
 -moz-appearance: none
 appearance: none
 font-size: 1em
 padding-left: 3px
 -webkit-padding-start: 5px
 padding-right: 20px
 margin: 0
 margin-right: -20px
 -webkit-border-radius: 4px
 -moz-border-radius: 4px
 border-radius: 4px
 background: $fill-input-bg
 color: $fill-text
 border: none
 outline: 0
 display: inline-block
 cursor: pointer
 width: 100%
 max-width: 100%
 height: 20px

 &:active,
 &:hover
  box-shadow: 0 0 10px 10px rgba(0,0,0,0.2) inset
  outline: 0
  color: $fill-text-h

 option:focus,
 option:hover
  box-shadow: 0 0 10px 10px rgba(0,0,0,0.5) inset

.compacted
 .kytos-dropdown
  display: inline-flex
  min-width: 100px
  max-width: 400px
  margin-top: 7px
  margin-right: 5px
  margin-left: 2px

 .kytos-dropdown__title
  visibility: hidden
  width: 12px

  svg
   visibility: visible
   margin-left: -8px

 .kytos-dropdown__select
  margin-top: 3px
  margin-right: 2px

</style>
