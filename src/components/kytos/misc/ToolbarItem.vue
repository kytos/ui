<template>
 <div class='k-toolbar-item'  :icon="icon" :tooltip="tooltip">
    <!-- @slot Slot with the toolbar item. -->
    <slot>
    </slot>
 </div>
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'

export default {
  name: 'k-toolbar-item',
  mixins: [KytosBaseWithIcon],
}

</script>
