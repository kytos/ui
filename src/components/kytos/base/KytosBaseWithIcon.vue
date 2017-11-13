<script>
import KytosBase from './KytosBase.vue';
import Icon from '../../../../node_modules/vue-awesome/components/Icon.vue';
import 'vue-awesome/icons';

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
