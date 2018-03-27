<script>
import KytosBase from './KytosBase.vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';

/**
  * A base components with icon in property.
  */

export default {
  name: 'KytosBaseWithIcon',
  mixins: [KytosBase],
  props: {
    icon: {
      type: String,
    },
  },
  components: {
      'icon': Icon
  }
}
</script>
