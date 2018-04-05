<template>
 <div class='k-napps-info-panel'>
  <component v-show="false" v-for="component in components" :is="component.name" v-bind:key="component.name"></component>
 </div>
</template>

<script>
import Vue from 'vue'
import httpVueLoader from "./httpVueLoader.js"

export default {
  name: 'k-napps-info-panel',
  data () {
    return {
      url: this.$kytos_server+ 'ui/k-info-panel',
      components: [],
    }
  },
  created() {
      var self = this
      $.get({
        url: this.url,
        datatype: 'json',
        async: true,
        cache: false,
        success: function(data) {
          self.components = self.components.concat(data)
        }
      }).always(function(){
          self.load_components()
      })
  },
  methods: {
    load_components (){
      var self = this
      $.each(self.components, function(index, component){
        if('url' in component){
          // random is needed to avoid cache of components.
          var url = self.$kytos_server+component.url+"?random="+Math.random()
          Vue.component(component.name, httpVueLoader(url))
        }
      })
    },
  }
};
</script>
