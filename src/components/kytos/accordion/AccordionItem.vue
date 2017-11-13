<template>
  <div class="tab">
	<input class="kytos-accordion-input" :id="id" type="checkbox" name="tabs" checked>
    <label class="kytos-accordion-label" :for="id">{{title}}</label>
    <div class="tab-content">
    <slot>
	 <p>Empty Pannel created, please define some items inside.</p>
    </slot>
    </div>
  </div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue';

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

</style>
