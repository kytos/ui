<script>
import Vue from 'vue'
import httpVueLoader from "./httpVueLoader.js"

export default {
  name: 'napp-loader',
  props: ["active", "expanded"],
  data () {
    return {
     template: null,
     components: null
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
    }
  }
}
</script>
