<script>
import NappLoader from './NappLoader.vue'

export default {
  name: "napp-bar-context",
  mixins: [NappLoader],
  data () {
    return {
      components: [
       {'name':'mapbox-settings'},
       {'name':'mef-eline-component', 'url': 'http://localhost:8000/MefElineComponent.kytos-ui'},
       {'name':'status-component', 'url': 'http://localhost:8000/StatusComponent.kytos-ui'}
      ]
    }
  },
  methods: {
    template_context() {
      var context = '<kytos-context-panel v-show="expanded">'
      $.each(this.components, function(index, component){
        context += '<'+ component.name +' v-show="active =='+(index+1)+'"/>'
      })
      context += '</kytos-context-panel>'
      return context
    }
  }
}
</script>
