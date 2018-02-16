<template>
<div class="container">
  <section class="kytos-menu-bar">
    <div class="logo" v-on:click="this.toggle" v-bind:class="{ expanded: expanded  }">
      <img v-show="this.expanded" src="../../assets/logo-kytos.svg" class="icon-kytos" alt="Kytos" height="35">
      <img v-show="!this.expanded" src="../../assets/icon-kytos.svg" class="logo-kytos" alt="Kytos" height="35">
    </div>
    <icon v-for="(component, index) in components" :key="component.icon" :name="component.icon"
          v-bind:class="{ active: activeItem==(index+1) }"
          v-on:click.native="setItem(index+1)"></icon>
  </section>
  <napp-loader :active="this.activeItem" :components="this.components" :expanded="this.expanded"></napp-loader>
</div>
</template>

<script>
import KytosBaseWithIcon from './base/KytosBaseWithIcon.vue'
import Icon from '../../../node_modules/vue-awesome/components/Icon.vue'

export default {
  name: 'kytos-menu-bar',
  mixins: [KytosBaseWithIcon],
  props: ['toggle', 'expanded'],
  data() {
    return {
      components: [],
      activeItem: 1
    }
  },
  created() {
    this.components = [
        {'icon':'desktop', 'name':'mapbox-settings'},
        {'icon': 'link', 'name':'mef-eline-component', 'url': 'http://localhost:8000/MefElineComponent.kytos-ui'},
        {'icon': 'cube', 'name':'status-component', 'url': 'http://localhost:8000/StatusComponent.kytos-ui'}
      ]
  },
  methods: {
    toggleLabel (type, label) {
      this.$kytos.$emit('topology-toggle-label', type, label)
    },
    setItem (item) {
      this.activeItem = item
    }
  }
}
</script>

<style lang="sass">

@import '../../assets/styles/variables'

.kytos-menu-bar
 -webkit-order: 1
 -ms-flex-order: 1
 order: 1
 z-index: 998
 width: 40px
 height: 100vh
 background: $fill-menubar
 box-shadow: 10px 0px 20px -10px $fill-menubar

 .logo
    padding: 0
    margin: 0
    display: block
    height: 30px
    vertical-align: middle
    padding: 3px 0px 7px 0px
    background: $fill-menubar-h
    cursor: pointer
    text-align: center

 .expanded
    width: 280px
    background: $fill-menubar-h

.expanded
 .kytos-menu-bar
   box-shadow: none

.kytos-menu-bar

 .active
  background: $fill-panel
  border-color: $fill-menubar-b

 > svg
  vertical-align: middle
  height: 20px
  width: 23px
  padding: 10px 9px 10px 5px
  cursor: pointer
  fill: $fill-icon
  border-left: 3px solid transparent

  &:hover
   fill: $fill-icon-h
   border-color: $fill-menubar-b
   background: $kytos-dark-gray

</style>
