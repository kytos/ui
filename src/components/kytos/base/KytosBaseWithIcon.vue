<script>
import KytosBase from './KytosBase.vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';

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
