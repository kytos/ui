<template>
   <label class="k-select no-compact">
    <div class="k-select__title">
      <icon v-if="icon" v-bind:name="icon"></icon>
      {{title}}
    </div>
    <select class="k-select__select" v-model="selected" @change.prevent="emitEvent"  multiple>
      <option v-for="item in options":value="item.value">
        {{item.description}}
      </option>
    </select>
   </label>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

export default {
  name: 'k-select',
  mixins: [KytosBaseWithIcon],
  props: {
    value: {
        type: Array
    },
    options: {
      type: Array,
      required: true
    },
    event: {
      type: Object,
      default: undefined
    },
      action: {
      type: Function,
      default: function (value) { return }
    }
  },
  data () {
    return {
      selected: []
    }
  },
  methods: {
    emitEvent () {
      if (this.event !== undefined){
        let content = this.event.content
        content.value = this.selected
        this.$kytos.$emit(this.event.name, content)
      }
      this.$emit('update:value', this.selected)
      this.action(this.selected)
    }
  },
  mounted () {
    this.options.forEach((item) => {
      this.selected.push(item)
    })
  },
  watch: {
    selected () {
      this.emitEvent()
    },
    options () {
      this.options.forEach((item) => {

        this.selected.push(item);
      })
    }
  }
}


</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-select
 position: relative
 display: block
 width: 100%
 padding: 0px
 margin: 5px 0px
 font-size: 0.8em
 color: $fill-text

 &:hover svg
  fill: $fill-icon-h

  .k-select__title
   padding-bottom: 2px
   padding-left: 3px
   padding-top: 0px

  .k-select__select
   margin-left: 5px
   width: 130px
   max-width: 130px
   height: 100%

.k-select__title
 padding-bottom: 10px
 padding-top: 5px
 padding-left: 10px
 position: relative

 svg
  fill: $fill-icon
  margin-bottom: -5px
  margin-right: 5px

.k-select__select
 font-size: 1em
 background: $fill-input-bg
 color: $fill-text
 border: none
 outline: 0
 display: block
 cursor: pointer
 width: 100%
 max-width: 100%
 height: 80px
 overflow: auto
 overflow-y: auto
 overflow-x: hidden
 padding: 0px

 &:nth-child(odd)
  background-color: $fill-button-bg

 &:nth-child(even)
  background-color: $fill-button-bg

 &:hover *
  color: $fill-shortkey
  background-color: $fill-button-bg-h
</style>
