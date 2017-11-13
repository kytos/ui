<template>
    <tr :id="id" class="kytos-property-panel-item">
        <th>{{name}}</th>
        <td>{{value}}</td>
    </tr>
</template>

<script>
import KytosBase from '../base/KytosBase.vue';

export default {
  name: 'kytos-property-panel-item',
  mixins: [KytosBase],
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-property-panel-item
  cursor: pointer
  padding-top: 0.3em

  th
   display: table-cell
   font-size: 0.8em
   border-right: 1px solid $fill-button-bg-h
   border-bottom: 1px solid $fill-button-bg-h
   color: $fill-text
   text-align: right
   padding: 0.5em
   text-transform: capitalize
   min-width: 50%

  td
   display: table-cell 
   color: $fill-text-h
   text-align: left
   border-bottom: 1px solid $fill-button-bg-h
   font-size: 0.8em
   padding: 0.5em
 
  &:nth-child(odd)
   background-color: $fill-button-bg
  
  &:nth-child(even)
   background-color: $fill-button-bg
  
  &:hover *
   color: $fill-shortkey   
   background-color: $fill-button-bg-h
 
</style>
