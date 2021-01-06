<template>
  <section v-bind:class="classObject" v-hotkey="keymap" v-show="this.infoPanelView">
    <div class="row" style="display: flex;justify-content: flex-end;">
      <div class="actions-btn">
        <k-button class='info-panel-btn max' icon="window-maximize"
                  tooltip="Maximize Info-Panel"
                  :on_click="this.maximize">
        </k-button>
        <k-button class='info-panel-btn close' icon="times"
                  tooltip="Close Info-Panel"
                  :on_click="this.hide">
        </k-button>
      </div>
    </div>
    <div class="k-info-title">
      <icon v-if="myIcon" v-bind:name="myIcon"></icon>
      <div v-if="myTitle" class="panel-title">
        <h1> {{ myTitle }}
          <small v-if="mySubtitle">{{ mySubtitle }}</small>
        </h1>
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
  data() {
    return {
      infoPanelView: undefined,
      content: undefined,
      myIcon: 'gear',
      myTitle: '',
      mySubtitle: '',
      maximized: false,
      lastContent: {},
      hasContent: false,
      classObject: {
        'k-info-panel': true,
        'k-info-panel-max': false
      }
    }
  },
  methods: {
    toggle() {
      return
    },
    hide() {
      this.infoPanelView = undefined
      this.content = undefined

      if (this.hasContent) {
        this.$kytos.$emit('toggleInfoPanelIcon', 'hide')
      }
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
    show(content) {
      this.lastContent = content
      this.infoPanelView = content.component
      this.content = content.content
      this.myTitle = content.title
      this.mySubtitle = content.subtitle
      this.myIcon = content.icon
      this.classObject['k-info-panel-max'] = content.maximized

      this.hasContent = true
      this.$kytos.$emit('toggleInfoPanelIcon', 'show')
    },
    latestContent() {
      if (this.hasContent) {
        this.show(this.lastContent)
      } else {
        let standard_infoPanel = {
          component: 'search-hosts',
          title: '',
          icon: 'gear'
        }
        this.show(standard_infoPanel)
      }
    },
    maximize() {
      /**
       * Controls the maximized view of the current
       * k-info-panel by adding and removing its css class
      */
      $('.k-info-panel').toggleClass('k-info-panel-max')
    },
    register_listeners() {
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

      /**
       * Show the latest info panel called in the right,
       * event to comunicate with tabs.vue
       *
       * @event showLatestInfoPanel
       * @type {NULL}
       */
      this.$kytos.$on('showLatestInfoPanel', this.latestContent)
    }
  },
  computed: {
    keymap() {
      return {
        'ctrl+alt+space': this.toggle,
        'esc': this.hide,
      }
    }
  },
  mounted: function () {
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
  min-height: calc(100% - 45px)
  padding: 10px
  position: fixed
  right: 0
  top: 0
  background-color: $fill-panel
  width: 420px
  z-index: 999
  box-shadow: 10px 0px 20px 5px rgba(0, 0, 0, 0.4)

.k-info-wrapper
  -webkit-flex: 1 1 auto
  overflow-y: auto
  height: 0px

.k-info-title
  display: flex
  flex-direction: row
  align-items: center

  svg
    fill: $fill-icon
    width: 50px
    height: 50px
    padding: 10px
    margin-right: 5px

  .panel-title
    padding: 0
    margin: 0
    color: $fill-text

    & > h1
      font-size: 1.2em
      font-weight: bold
      color: $fill-text

    small
      font-size: 0.7em
      color: $fill-text
      display: block

.actions-btn
  position: absolute !important

.info-panel-btn
  background: inherit !important
  display: inline-block
  &.max svg
    width: 14px !important

</style>
