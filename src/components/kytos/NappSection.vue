<script>
import Vue from 'vue'
export default {
  name: 'napp-section',
  props: ["active", "expanded"],
  data () {
    return {
     template: null,
     components: [
       {'name':'maps-component', 'url': 'http://localhost:8000/MapsComponent.vue'},
       {'name':'mef-eline-component', 'url': 'http://localhost:8000/MefElineComponent.vue'},
       {'name':'status-component', 'url': 'http://localhost:8000/StatusComponent.vue'}
     ]
    }
  },
  render: function(createElement){
    if (!this.template) {
      return createElement('div', 'Loading...');
    } else {
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
    template_context() {
      var self= this
      var context = '<kytos-context-panel v-show="expanded">'
      $.each(self.components, function(index, component){
        context += '<'+ component.name +' v-show="active =='+(index+1)+'"/>'
      })
      context += '</kytos-context-panel>'
      return context
    },
    load_components (){
      var self = this
      $.each(self.components, function(index, component){
        self.$options.components[component.name] = httpVueLoader(component.url)
      })
    }
  }
}
</script>
