<template>
<div class="accordion-wrapper">
    <!-- @slot Slot to be filled with accordion item -->
    <slot />
</div>
</template>

<script>

import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

/**
 * A GUI widget with a list of items that can be switched between hiding and showing content.
 *
 * @example /_static/imgs/components/accordion/k-accordion.png
 * @example
 * <k-accordion>
 *    <k-accordion-item title="Custom Labels">
 *        <k-dropdown title="Switch Labels:" icon="circle-o" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></k-dropdown>
 *        <k-dropdown title="Interface Labels:" icon="plug" :options="interfaceLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'interface'}}"></k-dropdown>
 *    </k-accordion-item>
 *    <k-accordion-item title="Background">
 *        <k-button-group>
 *          <k-button tooltip="Map Background" icon="globe"></k-button>
 *          <k-button tooltip="Image Background (disabled)" icon="photo" :is-disabled="true"></k-button>
 *          <k-button tooltip="No Background" icon="window-close-o"></k-button>
 *        </k-button-group>
 *        <k-slider icon="adjust" :initial-value="mapOpacity" :action="emitMapOpacity"></k-slider>
 *    </k-accordion-item>
 *   </k-accordion>
 */
export default {
    name: 'k-accordion',
    mixins: [KytosBaseWithIcon],
    data: function() {
        return {
            tabs: []
        }
    },
    created: function() {
        this.tabs = this.$children;
    },
}

</script>
