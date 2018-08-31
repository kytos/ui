<template>
<div>
  <div class="k-action-menu" v-show="show">
  <span  v-for="item in keymap"  v-hotkey = "item" v-show="false"></span>
  <div class="k-input-wrap">
    <k-input :value.sync="search" icon="search" id="k-action-menu-input" placeholder="Search for actions"></k-input>
  </div>
  <div class="k-action-list">
     <div v-for="item in actionItems" class="k-action-item" @click="show_info_panel(item)">
     {{item.name}}
     <div class="k-action-extras">
     <span class="author">{{item.author}}</span>
        <span class="shortkey">{{item.shortkey}}</span>
         </div>
       </div>
     </div>
  </div>
  <k-action-menu-item ></k-action-menu-item>
</div>
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'

/**
 * Menu with a list of actions and their shortcuts. The menu can be shown or
 * hidden using the shortcut *Ctrl+Alt+Space*.
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
    items: [ ]
    }
  },
  methods: {
    toggle() {
       this.show = !this.show
    },
    hide() {
       this.show = false
    },
    show_info_panel(item) {
      item.action()
      this.hide()
    },
    /**
     * Method to add new action menu item
     *
     * @public
     * @param {object} options An object with the params [name, author, shortkey, content]
     */
    add_action_menu_item(options){
      var found = false
      for(var i in this.items){if(options.name == this.items[i].name) found = true}
      if(found == false){ this.items.push(options) }
    },
    register_listeners(){
      /**
       * Add a new action item in the k-action-menu.
       *
       * @event addActionMenuItem
       * @type {object}
       */
      this.$kytos.$on('addActionMenuItem', this.add_action_menu_item)
    },
  },
  mounted() {
    this.register_listeners()
  },
  computed: {
    keymap () {
      var keys = [{'ctrl+space': this.toggle, 'esc': this.hide }]
      $.each(this.items, function(index, item){
        var key = {}
        key[item.shortkey] = item.action
        keys.push(key)
      })
      return keys
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

#k-action-menu-input
 width: 100vh

</style>
