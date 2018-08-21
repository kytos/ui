<template>
  <section v-bind:class="classObject" v-hotkey="keymap" v-show="this.infoPanelView">
   <div class="k-info-title">
    <icon v-if="myIcon" v-bind:name="myIcon"></icon>
    <div v-if="myTitle" class="panel-title">
      <h1>{{myTitle}} <small v-if="mySubtitle">{{mySubtitle}}</small></h1>
    </div>
   </div>
   <div class="k-info-wrapper">
    <component v-bind:is="this.infoPanelView" v-bind:content="content"></component>
   </div>
  </section>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * Shows details about selected kytos components. This panel appears on the
 * right of the Kytos GUI and the NApp developer can choose what to display on
 * the panel.
 *
 * @example /_static/imgs/components/misc/k-info-panel.png
 */

export default {
  name: 'k-info-panel',
  mixins: [KytosBaseWithIcon],
  props: {
    subtitle: {
        type: String,
    },
  },
  data () {
    return {
      display: false,
      infoPanelView: undefined,
      content: undefined,
      myIcon: 'gear',
      myTitle: '',
      mySubtitle: '',
      maximized: false,
      classObject: {
        'k-info-panel': true,
        'k-info-panel-max': false
      }
    }
  },
  methods: {
    toggle () {
      return
    },
    hide () {
      this.infoPanelView = undefined
      this.content = undefined
    },
    /**
     * Show the Info Panel displayed in the right.
     *
     * @public
     * @param {object} content An object filled with:
     *
     *                         {
     *                          **component**: "search-hosts",
     *                          **content**: {**msg**:"content used in the component"},
     *                          **title**: "Search Hosts",
     *                          **icon**: "desktop"
     *                         }
     */
    show (content) {
      this.infoPanelView = content.component
      this.content = content.content
      this.myTitle = content.title
      this.mySubtitle = content.subtitle
      this.myIcon = content.icon
      this.classObject['k-info-panel-max'] =  content.maximized
    },
    register_listeners () {
      /**
       * Hide the info panel displayed in the right.
       *
       * @event hideInfoPanel
       * @type {NULL}
       */
      this.$kytos.$on('hideInfoPanel', this.hide)

      /**
       * Show the info panel in the right.
       *
       * @event showInfoPanel
       * @type {Object} An content to be displayed by InfoPanel.
       */
      this.$kytos.$on('showInfoPanel', this.show)
    }
  },
  computed: {
    keymap () {
      return {
        'ctrl+alt+space': this.toggle,
        'esc': this.hide,
      }
    }
  },
  mounted: function() {
    this.register_listeners()
  },
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-info-panel-max
  width: 900px !important
  min-width: 900px !important

.k-info-panel
 -webkit-order: 4
 -ms-flex-order: 4
 order: 4
 display: flex
 flex-direction: column
 min-height: 100%
 padding: 10px
 position: fixed
 right: 0
 top: 0
 background-color: #222
 width: 420px
 z-index: 999
 box-shadow: 10px 0px 20px 5px rgba(0, 0, 0, 0.4)

.k-info-wrapper
 -webkit-flex: 1 1 auto;
 overflow-y: auto;
 height: 0px;

.k-info-title
 display: flex
 flex-direction: row
 align-items: center

 svg
  fill: $fill-icon-h
  width: 50px
  height: 50px
  padding: 10px
  margin-right: 5px

 .panel-title
  padding: 0
  margin: 0

  & > h1
    font-size: 1.2em
    font-weight: bold
    color: $fill-text-h

  small
    font-size: 0.7em
    color: $fill-text
    display: block

</style>
