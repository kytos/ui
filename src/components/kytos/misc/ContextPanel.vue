<template>
  <section class="k-context-panel">
    <div class="k-context-panel-title">
      <icon v-if="icon" v-bind:name="icon"></icon>
      <div v-if="title" class="pannel-title">
        <h1 :style="style">{{ title }} <small>{{ subtitle }}</small></h1>
      </div>
    </div>
    <!--@slot Can be filled with the panel content -->
    <slot/>
  </section>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * Represents a context where the developer can add any desired content.
 *
 * @example:
 * <k-context-panel title_color="#554077" subtitle="Some Subtitle" title="Some Title" icon="gear">
 *     <any-k-component></any-k-component>
 * </k-context-panel>
 *
 * @param {string} title: Title of the k-context-panel
 * @param {string} title_color: Define custom color of the title
 *                      ** Hexadecimal for non CSS standard colors, but it is strongly
 *                         recommended the use of our kytos-colors. **
 * @param {string} icon: Define custom icon to k-context-panel
 * @param {string} subtitle: Subtitle of k-context-panel
 */
export default {
  name: 'k-context-panel',
  mixins: [KytosBaseWithIcon],
  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    },
    subtitle: {
      type: String
    },
    title_color: {
      type: String
    },
  },
  computed: {
    style() {
      let color
      (this.title_color !== undefined) ? color = 'color:' + this.title_color : color = 'color: #CCC'

      return color
    }
  },
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-context-panel
  -webkit-order: 2
  -ms-flex-order: 2
  order: 2
  background: $fill-panel
  max-height: 100vh
  width: 220px
  margin-bottom: 10px
  z-index: 99
  box-shadow: 10px 0px 20px -10px $fill-panel

  .pannel-title
    background: inherit
    text-transform: capitalize

  .k-context-panel-title
    display: flex
    flex-direction: row
    align-items: center
    margin: 5px 0

    > svg
      vertical-align: middle
      color: $fill-icon
      width: 20px
      height: 20px
      margin-right: 5px

    h1
      font-size: 1em
      font-weight: bold

  .pannel-title
    small
      font-size: 0.65em
      font-weight: bold
      color: $fill-text
      display: block


</style>
