<template>
 <div class="container">
   <section class="k-menu-bar">
     <div class="logo" v-on:click="toggle" v-bind:class="{ compacted: compacted  }">
       <img v-show="!compacted" src="../../../assets/logo-kytos.svg" class="logo-kytos" alt="Kytos" height="35">
       <img v-show="compacted" src="../../../assets/icon-kytos.svg" class="icon-kytos" alt="Kytos" height="35">
     </div>
     <k-button v-for="(component, index) in components"
               v-bind:class="{ active: activeItem==(index+1) }"
               :key="component.name"
               :icon="component.icon"
               :tooltip="component.tooltip"
               @click.native="setItem(index+1)"/>

     <div id="kytos-version">
          Kytos version {{version}}
     </div>

   </section>
   <k-toolbar :active="activeItem" :components.sync="components" :compacted="compacted"></k-toolbar>
 </div>
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'
import Icon from '../../../../node_modules/vue-awesome/components/Icon.vue'

export default {
  name: 'k-menu-bar',
  mixins: [KytosBaseWithIcon],
  props: ['toggle', 'compacted'],
  data() {
    return {
      version: this.$kytos_version,
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
      $(".k-toolbar").show();

      this.$nextTick(function () {
      // DOM is now updated
        $(".k-toolbar .k-menu-item").not(":hidden").each(function() {
            $(this).each(function(){
                if ($(this).find(".compact").length == 0){
                    $(".compacted .k-toolbar").css("display","none");
                }
            });
        });
      });
    }
  }


}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-menu-bar
 -webkit-order: 1
 -ms-flex-order: 1
 order: 1
 z-index: 998
 width: 40px
 height: 100vh
 background: $gradient-gray
 box-shadow: 5px 0px 10px $fill-panel

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

 .k-menu-bar
   box-shadow: none

.k-menu-bar

 .k-button
  width: 40px
  height: 40px
  margin: 0px
  padding: 0px
  background: $fill-menubar

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

  &::-moz-focus-inner
   border: 0

  &.active
   background: $fill-panel
   border-color: $fill-menubar-b

   > svg
    border-left: 3px solid $fill-menubar-h

.compacted
 .k-menu-bar
  .logo
   width: 40px

#kytos-version
  bottom: 0px
  position: absolute
  padding: 2px
  font-size: 0.5em
  cursor: pointer
  width: 35px

</style>
