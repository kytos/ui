<template>
<div class="container">
  <section class="kytos-menu-bar">
    <div class="logo" v-on:click="this.toggle" v-bind:class="{ compacted: compacted  }">
      <img v-show="!this.compacted" src="../../assets/logo-kytos.svg" class="logo-kytos" alt="Kytos" height="35">
      <img v-show="this.compacted" src="../../assets/icon-kytos.svg" class="icon-kytos" alt="Kytos" height="35">
    </div>
    <icon v-for="(component, index) in components" :key="component.icon" :name="component.icon"
          v-bind:class="{ active: activeItem==(index+1) }"
          v-on:click.native="setItem(index+1)"></icon>
  </section>
  <napp-loader :active="activeItem" :components.sync="components" :expanded="expanded" :url="url"></napp-loader>
</div>
</template>

<script>
import KytosBaseWithIcon from './base/KytosBaseWithIcon.vue'
import Icon from '../../../node_modules/vue-awesome/components/Icon.vue'

export default {
  name: 'kytos-menu-bar',
  mixins: [KytosBaseWithIcon],
  props: ['toggle', 'compacted'],
  data() {
    return {
      url: this.$kytos_server+ 'ui/menu-items',
      components: [{'icon': 'desktop', 'name':'mapbox-settings'}],
      activeItem: 1
    }
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
    width: 280px
    vertical-align: middle
    padding: 3px 0px 7px 0px
    background: $fill-menubar-h
    cursor: pointer
    text-align: center

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

.compacted
 .kytos-menu-bar
  .logo
   width: 40px

</style>
