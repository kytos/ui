<template>
  <div :id="id" class="k-table no-compact">

    <table class="table">
      <thead>

      <tr>
        <th scopr="col">#</th>
        <th scope="col" v-for="header in headers"> {{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in rows">
        <th scope="row"> {{ index + 1 }}</th>
        <td v-for="column in row"> {{ column }}</td>
      </tr>

      </tbody>
    </table>

  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';

/**
 * This component allows to create a table.
 *
 * @public
 * @example: <k-table :headers=headers :rows=rows></k-table>
 *
 * @param {list}:
 *
 * rows:
 * [{name:"Item1 - Row1", item2:"Item2 - Row1"}, {name:"Item1 - Row2", item2:"Item2 - Row2"}]
 *
 * @param {list}:
 *
 * headers:
 * ['Header1 ', 'Header2', ... ]
 */
export default {
  name: 'k-table',
  mixins: [KytosBase],
  props: {
    headers: {
      type: Array,
      default: function () {
        return []
      }
    },
    rows: {
      type: Array,
      default: function () {
        return []
      }
    },

  }

}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-table
  color: $fill-text
  overflow: auto
  max-height: 250px
  text-align: center
  margin: 0 auto
  display: block
  padding: 0.5em 0 1em 0.3em
  font-size: .8em

  table
    display: table
    width: 100%

  thead
    font-weight: bold
    background: $kytos-purple

  th
    padding: 10px 0

  tbody
    tr:nth-child(even)
      background: $kytos-medium-gray

    tr:hover
      color: $fill-text-h
      background-color: rgba(0, 0, 0, 0.15)

</style>
