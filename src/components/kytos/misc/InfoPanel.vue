<template>
  <section v-bind:class="classObject" v-hotkey="keymap" v-show="this.infoPanelView">
   <div class="kytos-info-title">
    <icon v-if="myIcon" v-bind:name="myIcon"></icon>
    <div v-if="myTitle" class="panel-title">
      <h1>{{myTitle}} <small v-if="mySubtitle">{{mySubtitle}}</small></h1>
    </div>
   </div>
   <div class="kytos-info-wrapper">
    <component v-bind:is="this.infoPanelView" v-bind:content="this.content">
    </component>
   </div>
</section>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue';

export default {
  name: 'kytos-info-panel',
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
        'kytos-info-panel': true,
        'kytos-info-panel-max': false
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
    show (content) {
      this.infoPanelView = content.component
      this.content = content.content
      this.myTitle = content.title
      this.mySubtitle = content.subtitle
      this.myIcon = content.icon
      this.classObject['kytos-info-panel-max'] =  content.maximized
    },
    register_listeners () {
      this.$kytos.$on('hideInfoPanel', this.hide)
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

.kytos-info-panel-max
  width: 1200px !important
  min-width: 1200px !important
  
.kytos-info-panel
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

.kytos-info-wrapper
 -webkit-flex: 1 1 auto;
 overflow-y: auto;
 height: 0px;

.kytos-info-title
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
