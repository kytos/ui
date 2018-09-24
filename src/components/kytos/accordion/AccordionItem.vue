<template>
  <div class="tab">
    <input class="k-accordion-input" :id="id" type="checkbox" name="tabs" v-model="checked">
    <label class="k-accordion-label" :for="id">{{title}}</label>
    <div class="tab-content">
     <!-- @slot Empty Pannel, please define some items inside. -->
    <slot>
       <p>Empty Pannel created, please define some items inside.</p>
    </slot>
    </div>
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * A GUI widget that can be switched between hiding and showing content
 *
 * @example <k-accordion>
 *    <k-accordion-item title="Background">
 *        <k-button-group>
 *          <k-button tooltip="Map Background" icon="globe"></k-button>
 *          <k-button tooltip="Image Background (disabled)" icon="photo" :is-disabled="true"></k-button>
 *          <k-button tooltip="No Background" icon="window-close-o"></k-button>
 *        </k-button-group>
 *        <k-slider icon="adjust" :initial-value="mapOpacity" :action="emitMapOpacity"></k-slider>
 *    </k-accordion-item>
 *   </k-accordion>
 * @example /_static/imgs/components/accordion/k-accordion-item.png
 */
export default {
  name: 'k-accordion-item',
  mixins: [KytosBaseWithIcon],
  props:{
    /**
    * Boolean value to represent whether the accordion item is checked.
    */
    checked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-accordion-input
  position: absolute
  opacity: 0
  z-index: 99

.tab:hover .k-accordion-label
 color: $fill-icon-h

.k-accordion-label
  position: relative
  display: block
  padding: 1px 0 5px 20px
  margin-top: 5px
  cursor: pointer
  font-size: 0.7em
  color: $fill-icon
  border-bottom: 1px solid $fill-bar

  &:after
    position: absolute
    left: 0
    top: 0
    display: block
    width: 2em
    text-align: center
    -webkit-transition: all .35s
    -o-transition: all .35s
    transition: all .35s

.accordion-wrapper
  .tab
    position: relative
    margin-bottom: 1px
    width: 100%
    color: $fill-bar
    overflow: hidden

  .tab-content
    max-height: 0
    overflow: hidden
    width: 100%
    -webkit-transition: max-height .35s
    -o-transition: max-height .35s
    transition: max-height .35s
    border-top: 1px solid $fill-panel-dark

    p
      margin: 1em

.k-accordion-input
  &:checked
    & ~ .tab-content
      max-height: 100%
      overflow: hidden

  &[type=checkbox]
    & + .k-accordion-label:after
      content: "▾"

  &[type=checkbox]:checked
    & + .k-accordion-label:after
      content: "▴"

.compacted
 .tab
   display: inline-flex
   width: auto
   float: left

 .k-accordion-input
   display: none
 .k-accordion-label
   display: none

 .k-accordion-input
   & ~ .tab-content
    display: inline-flex
    margin-top: 0px
    height: 35px
    max-height: 100%
    overflow: hidden

   &[type=checkbox]
     & + .k-accordion-label:after
       content: ""

   &[type=checkbox]:checked
     & + .k-accordion-label:after
       content: ""

 .tab
  .tab-content
   min-width: 230px
   margin-left: 15px
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
     border-bottom: 1px solid $fill-bar
     pointer-events: none
     width: 35px
     height: 10px
     position: absolute
     left: -10px
     top: 15px

  .k-button-wrapper
   min-width: 120px

</style>
