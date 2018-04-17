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
         <th scope="row"> {{ index + 1 }} </th>
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
 */
export default {
  name: 'k-table',
  mixins: [KytosBase],
  props: {
    headers: {
        type: Array,
        default: function(){
            return []
        }
    },
    rows: {
        type: Array,
        default: function(){
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
 text-align: left
 margin: 0 auto
 display: block
 padding: 0.5em 0 1em 0.3em

 table
  display: table
  width: 100%

</style>
