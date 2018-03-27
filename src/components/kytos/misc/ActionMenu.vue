<template>
  <div class="kytos-action-menu" v-hotkey="keymap" v-show="show">

     <!-- FIXME: o correto seria chamar o parametro abaixo com v-model="search", mas não funciona
      <kytos-input :value="search" icon="search" id="kytos-action-menu-input" placeholder="Search for actions"></kytos-input>
      -->

  <div class="kytos-input-wrap">
    <icon name="search"></icon>
    <input type="text" id="kytos-action-menu-input" v-model="search" class="kytos-input" placeholder="Search for actions" autofocus>
    </input>
  </div>


     <div class="kytos-action-list">

       <div v-for="item in actionItems" class="kytos-action-item" @click="show_info_panel(item.content)">
         {{item.name}}
         <div class="kytos-action-extras">
         <span class="author">{{item.author}}</span>
            <span class="shortkey">{{item.shortkey}}</span>
         </div>
       </div>
     </div>

  </div><!-- .kytos-action-menu -->
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue'
import listSwitches from "../../../kytos/listSwitches.vue"

var searchContent = {"component": listSwitches,
                     "content": {},
                     "icon": "search",
                     "title": "Switch Search",
                     "subtitle": "by kytos/topology"}

/**
 * Menu with a list of actions. Can be shown or hidden using the *Ctrl+Space* shortcut.
 */

export default {
  name: 'kytos-action-menu',
  mixins: [KytosBaseWithIcon],
  data () {
    return {
    show: false,
    search: '',
   items: [
        { name: 'Search Switch', author: 'kytos/core', shortkey: 'Ctrl+Alt+S', content: searchContent},
        { name: 'Search Host', author: 'kytos/core', shortkey: 'Ctrl+Alt+H'},
        { name: 'Search Interface', author: 'kytos/core', shortkey: 'Ctrl+Alt+I'}
     ]

    }
  },
  methods: {
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
    document.getElementById('kytos-action-menu-input').focus()
  }
}

</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-action-menu
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

.kytos-action-list
  padding: 0.5em 0.1em
  font-size: 1.1em
  margin-top: 0.3em
  text-align: left

.kytos-action-item
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

.kytos-action-extras
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
