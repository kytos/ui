<template>
  <div class="k-action-menu" v-hotkey="keymap" v-show="show">

     <!-- FIXME: o correto seria chamar o parametro abaixo com v-model="search", mas não funciona
      <k-input :value="search" icon="search" id="k-action-menu-input" placeholder="Search for actions"></k-input>
      -->

  <div class="k-input-wrap">
    <icon name="search"></icon>
    <input type="text" id="k-action-menu-input" v-model="search" class="k-input" placeholder="Search for actions" autofocus>
    </input>
  </div>


     <div class="k-action-list">

       <div v-for="item in actionItems" class="k-action-item" @click="show_info_panel(item.content)">
         {{item.name}}
         <div class="k-action-extras">
         <span class="author">{{item.author}}</span>
            <span class="shortkey">{{item.shortkey}}</span>
         </div>
       </div>
     </div>

  </div><!-- .k-action-menu -->
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'
import listSwitches from "../../../kytos/listSwitches.vue"

/**
 * Accordion item that can be switched between hiding and showing content
 *
 * @example /_static/imgs/components/misc/k-action-menu.png
 */
export default {
  name: 'k-action-menu',
  mixins: [KytosBaseWithIcon],
  data () {
    return {
    show: false,
    search: '',
   items: [
        { name: 'Search Switch', author: 'kytos/core', shortkey: 'Ctrl+Alt+S', content: this.searchContent()},
        { name: 'Search Host', author: 'kytos/core', shortkey: 'Ctrl+Alt+H'},
        { name: 'Search Interface', author: 'kytos/core', shortkey: 'Ctrl+Alt+I'}
     ]

    }
  },
  methods: {
    searchContent(){
      return {"component": listSwitches,
                     "content": {},
                     "icon": "search",
                     "title": "Switch Search",
                     "subtitle": "by kytos/topology"}
    },
    toggle() {
       this.show = !this.show
    },
    hide() {
       this.show = false
    },
    show_info_panel(content) {
      this.$kytos.$emit("showInfoPanel", content)
      this.hide()
    }
  },

  computed: {
    keymap () {
      return {
        'ctrl+space': this.toggle,
        'esc': this.hide,
      }
    },
    actionItems() {
       var self=this;
       return this.items.filter(function(cust){return cust.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;});
    }
  },
  updated () {
    document.getElementById('k-action-menu-input').focus()
  }
}

</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-action-menu
 position: fixed
 top: 50%
 left: 50%
 transform: translate(-50%, -50%)
 width: 350px
 max-height: 400px
 overflow: auto
 background: $fill-actionm-bg
 border: 1px solid $fill-menubar
 border-radius: 0.5em
 text-align: center
 padding: 0.3em
 box-shadow: 0px 0px 10px 0px $fill-actionm-bg
 transition: 0.3s
 z-index: 900

.k-action-list
  padding: 0.5em 0.1em
  font-size: 1.1em
  margin-top: 0.3em
  text-align: left

.k-action-item
 display: flex
 flex-direction: column
 font-size: 0.8em
 padding: 0.4em 0.4em
 border-top: 1px solid $fill-input-bg
 color: $fill-text
 background: $fill-actionm-bg
 cursor: Pointer

 &:hover
  color: $fill-link-h
  background: $fill-input-bg

.k-action-extras
 display: flex
 flex-direction: row
 justify-content: space-around

 .author
  text-align: left
  font-size: 0.9em
  padding: 0.2em 0em
  color: $fill-text
  opacity: 0.5
  width: 100%

 .shortkey
  text-align: right
  font-size: 0.8em
  color: $fill-shortkey

</style>
