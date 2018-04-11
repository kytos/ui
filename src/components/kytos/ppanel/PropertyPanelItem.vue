<template>
    <tr :id="id" class="k-property-panel-item">
        <th>{{name}}</th>
        <td>{{value}}</td>
    </tr>
</template>

<script>
import KytosBase from '../base/KytosBase';

/**
 * This component create a row in the table (``k-property-panel``) with two columns, *name* and *value*.
 *
 * @example /_static/imgs/components/ppanel/k-property-panel-item.png
 */

export default {
  name: 'k-property-panel-item',
  mixins: [KytosBase],
  props: {
    /**
     * Name displayed in the header of property panel item.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Value displayed in the data of property panel item.
     */
    value: {
      type: [String, Number],
      required: true,
    },
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-property-panel-item
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
