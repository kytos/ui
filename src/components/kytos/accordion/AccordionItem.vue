<template>
  <div class="tab">
    <input class="kytos-accordion-input" :id="id" type="checkbox" name="tabs" checked>
    <label class="kytos-accordion-label" :for="id">{{title}}</label>
    <div class="tab-content">
     <!-- @slot Empty Pannel, please define some items inside. -->
    <slot>
       <p>Empty Pannel created, please define some items inside.</p>
    </slot>
    </div>
  </div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue';

/**
 * Accordion item that can be switched between hiding and showing content
 */
export default {
  name: 'kytos-accordion-item',
  mixins: [KytosBaseWithIcon],
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-accordion-input
  position: absolute
  opacity: 0
  z-index: 99

.tab:hover .kytos-accordion-label
 color: #DDD

.kytos-accordion-label
  position: relative
  display: block
  padding: 1px 0 5px 20px
  margin-top: 5px
  cursor: pointer
  font-size: 0.7em
  color: rgba(255,255,255,0.5)
  border-bottom: 1px solid rgba(0,0,0,0.5)

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
    color: rgba(255,255,255,0.8)
    overflow: hidden

  .tab-content
    max-height: 0
    overflow: hidden
    width: 100%
    -webkit-transition: max-height .35s
    -o-transition: max-height .35s
    transition: max-height .35s
    border-top: 1px solid rgba(255,255,255,0.05)

    p
      margin: 1em

.kytos-accordion-input
  &:checked
    & ~ .tab-content
      max-height: 100%
      overflow: hidden

  &[type=checkbox]
    & + .kytos-accordion-label:after
      content: "▾"

  &[type=checkbox]:checked
    & + .kytos-accordion-label:after
      content: "▴"

.compacted
 .tab
   display: inline-flex

 .kytos-accordion-input
   display: none
 .kytos-accordion-label
   display: none

 .kytos-accordion-input
   & ~ .tab-content
    display: inline-flex
    margin-top: 0px
    height: 35px
    max-height: 100%
    overflow: hidden

   &[type=checkbox]
     & + .kytos-accordion-label:after
       content: ""

   &[type=checkbox]:checked
     & + .kytos-accordion-label:after
       content: ""

 .tab
  .tab-content
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


</style>
