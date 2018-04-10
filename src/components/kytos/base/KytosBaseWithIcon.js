import KytosBase from './KytosBase'
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';

/**
 * A base components with icon in property.
 * @mixin
 */

export default {
  name: 'KytosWithIcon',
  mixins: [KytosBase],
  props: {
    /**
     * An Icon string representing a awesome icon.
     */
    icon: {
      type: String,
    },
  },
  components: {
      'icon': Icon
  }
}
