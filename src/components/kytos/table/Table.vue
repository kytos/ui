<template>
  <div :id="id" class="k-table no-compact">
    <div class="k-table-divisor">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" class="header" v-for="(header, index) in headers" @click="defineSort(index)">
            {{ header }}
            <span class="order-dir" v-if="currentSort === index" >
              {{ spanDir(index) }}
            </span>
            <span class="order-dir" v-else>&nbsp;</span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, index) in rowsOfPage">
          <th scope="row" style="width: 45px">{{ rowIndex(index) }}</th>
          <td v-for="column in row"> {{ column }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row next-previous" v-if="needPagination">
      <k-button icon="arrow-left" :on_click="this.previousPage"></k-button>
      <p class="page-number" v-for="number in numberOfPages" :id="pageId(number)">{{ number }}</p>
      <k-button icon="arrow-right" :on_click="this.nextPage"></k-button>
    </div>
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
  },
  data() {
    return {
      currentSort: 0,
      currentSortDir: Array(this.headers.length).fill('asc'),
      currentPage: 1,
      pageSize: 5,
      pages: []
    }
  },
  methods: {
    activeCurrentPage() {
      /**
       * Highlight the current page indicator
       */
      let currPages = $('.page-number')

      for (let i = 0; i < currPages.length; i++) {
        (currPages[i].id.includes(this.currentPage)) ?
            $(currPages[i]).addClass('active') : $(currPages[i]).removeClass('active')
      }
    },
    nextPage() {
      /**
       * Move pagination forward
       */
      if ((this.currentPage * this.pageSize) < this.rows.length) {
        this.currentPage++
      }else {
        this.currentPage = 1
      }

      this.activeCurrentPage()
    },
    previousPage() {
      /**
       * Move pagination backwards
       */
      if (this.currentPage > 1) {
        this.currentPage--
      }else {
        this.currentPage = this.lastPage
      }

      this.activeCurrentPage()
    },
    pageId(pageNumber) {
      /**
       * Defines a Id for the pages indicators
       */
      return 'page' + pageNumber
    },
    rowIndex: function (index) {
      /**
       * Defines the row Id. It calculates the max id that
       * the current page can have, and subtracting it by
       * row index in range of the page size
       */
      return (this.currentPage * this.pageSize) - ((this.pageSize - 1) - index)
    },
    defineSort(newSort) {
      /**
      * Identify the direction of the sort for
      * the selected column as sort base
      */
      if(newSort === this.currentSort) {
        let sortDir = (this.currentSortDir[newSort] === 'asc') ? 'desc' : 'asc'

        this.$set(this.currentSortDir, newSort, sortDir)
        /**
        * It is necessary to use a different syntax to replace arrays values
        * by index because Vue cannot detect when directly set an item with
        * the index like it is usually done. In this case should've been:
        * this.currentSortDir[newSort] = sortDir
        */
      }
      this.currentSort = newSort;
    },
    spanDir(index) {
      /**
      * Defines a span marker only for the selected
      * column to indicate its sort direction
      */
      if (this.currentSortDir[index] === 'desc')
        return '▾'

      return '▴'
    }
  },
  computed: {
    needPagination: function () {
      /**
      * Check if the table will really have more
      * than one page. It calculates if the number
      * of rows is greater than page size
      */
      return this.rows.length > this.pageSize
    },
    lastPage: function () {
      return parseInt(this.pages[this.pages.length - 1])
    },
    rowsOfPage: function() {
      /**
       * Orders by ascendant or descendant of a
       * selected column and filters all rows
       * to return only the number of rows
       * that fits in current page size
       */
      return this.rows.sort((a, b) => {

        let modifier = 1,
            key_a = Object.keys(a),
            key_b = Object.keys(b)

        if(this.currentSortDir[this.currentSort] === 'desc')
          modifier = -1;
        if(a[key_a[this.currentSort]] < b[key_b[this.currentSort]])
          return -1 * modifier;
        if(a[key_a[this.currentSort]] > b[key_b[this.currentSort]])
          return modifier;

        return 0;
      }).filter((row, index) => {
        let start, end

        start = (this.currentPage - 1) * this.pageSize;
        end = this.currentPage * this.pageSize;

        if (index >= start && index < end)
          return true;
      });
    },
    numberOfPages: function () {
      /**
       * Defines the set of pages to display in the UI
       */
      let number = Math.ceil(this.rows.length / this.pageSize)

      for (let i = 0; i < number; i++) {
        let pageNumber = (i + 1).toString()

        if (!this.pages.includes(pageNumber))
          this.pages.push(pageNumber)
      }
      return this.pages
    }
  },
  mounted() {
    /**
     * Highlight the first page indicator
     */
    this.activeCurrentPage()
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-table
  color: $fill-text
  // overflow: auto
  max-height: 250px
  text-align: center
  margin: 0 auto
  display: block
  padding: 0.5em 0 1em 0.3em
  font-size: .8em
  height: 190px

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
  .header
    cursor: pointer
.next-previous
  display: flex
  justify-content: center
  align-items: center

  button
    background: inherit !important
    svg
      width: 14px
      height: 14px

  .page-number
    display: inline-block
    margin: 2px
    padding: 2px 5px
    font-weight: bold
    &.active
      color: #EEE

.k-table-divisor
  height: 190px

.order-dir
  display: inline-block
  width: 12px

</style>
