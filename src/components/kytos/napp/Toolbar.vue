<script>
import Vue from 'vue'
import httpVueLoader from "./httpVueLoader.js"

export default {
  name: 'k-toolbar',
  props: ["active", "compacted", "components"],
  data () {
    return {
     url: this.$kytos_server+ 'ui/k-toolbar',
     template: null,
     inner_components: this.components || [] ,
    }
  },
  render: function(createElement){
    if (this.template) return this.template();
  },
  created() {
      var self = this
      $.get({
        url: this.url,
        datatype: 'json',
        async: true,
        cache: false,
        success: function(data) {
          self.inner_components = self.inner_components.concat(data)
        }
      }).always(function(){
          self.load_components()
          self.load_template()
          setTimeout(self.load_icons, 2000)
      })
  },
  methods: {
    load_icons () {
      var self = this
      var components  = $('.k-toolbar .k-menu-item')
      $.each(components, function(index, component){
          self.inner_components[index].icon = component.getAttribute('icon')
          self.inner_components[index].tooltip = component.getAttribute('tooltip')
      })
      self.$emit('update:components', self.inner_components)
    },
    load_template () {
      this.template = Vue.compile(this.template_context()).render;
    },
    load_components (){
      var self = this
      $.each(self.inner_components, function(index, component){
        if('url' in component){
          // random is needed to avoid cache of components.
          var url = self.$kytos_server+component.url+"?random="+Math.random()
          Vue.component(component.name, httpVueLoader(url))
        }
      })
    },
    template_context() {
    var context = '<div class="k-toolbar" >'
    $.each(this.inner_components, function(index, component){
      context += '<'+ component.name +' v-show="active =='+(index+1)+'"/>'
    })
    context += '</div>'
    return context
  }
 }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-toolbar
  -webkit-order: 2
  -ms-flex-order: 2
  z-index: 999
  margin-top: 40px
  padding: 5px 10px
  background: $fill-panel
  width: 220px
  display: block

.compacted
 .k-toolbar
  width: 100vw
  height: 40px
  margin-top: 0px
  box-shadow: 0px 10px 20px -10px $fill-bar;
  overflow: hidden
  padding: 0px

  .no-compact
   display: none

</style>
