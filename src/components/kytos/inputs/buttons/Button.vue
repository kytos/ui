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
import KytosBaseWithIcon from '../../base/KytosBaseWithIcon.vue';

export default {
  name: 'kytos-button',
  mixins: [KytosBaseWithIcon],
  props: ["on_click"],
  methods: {
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
