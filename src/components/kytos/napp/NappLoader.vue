<script>
import Vue from 'vue'
import httpVueLoader from "./httpVueLoader.js"

export default {
  name: 'napp-loader',
  props: ["active", "expanded", "components"],
  data () {
    return {
     template: null,
    }
  },
  render: function(createElement){
    if (this.template) {
      return this.template();
    }
  },
  created() {
    this.load_components()
    setTimeout(this.load_template, 1000);
  },
  methods: {
    load_template () {
      this.template = Vue.compile(this.template_context()).render;
    },
    load_components (){
      var self = this
      $.each(self.components, function(index, component){
        if('url' in component){
          self.$options.components[component.name] = httpVueLoader(component.url)
        }
      })
    },
    template_context() {
      var context = ''
      $.each(this.components, function(index, component){
        var vif = 'v-if'
        if (index > 0) vif= 'v-else-if'
        context += '<'+ component.name +' :expanded="expanded"'+  vif  +'="active =='+(index+1)+'"/>'
      })
      return context
    }
  }
}
</script>
