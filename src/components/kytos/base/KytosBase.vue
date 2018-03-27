<script>

/**
 * The base component with the common properties.
 */

export default {
  name: 'KytosBase',
  props: {
    title: {
      type: String,
    },
    tooltip: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    uuid4() {
    	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
                return v.toString(16)
    	})
    }
  },
  data() {
    return {
      id: this.uuid4(),
    }
  },
}
</script>
