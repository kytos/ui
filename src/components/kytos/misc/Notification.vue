<template>
  <div v-if="showNotification" class="notification-container">
    <div class="k-notification">
      <div class="notification-body">
        <icon v-if="icon != undefined" class="notification-icon" v-bind:name= icon></icon>
        <icon v-else class="notification-icon" name="desktop"></icon>
        <div>
          <h4 v-if="title != undefined" class="notification-text notification-title">{{ title }}</h4>
          <h4 v-else class="notification-text notification-title">No Title Inserted</h4>

          <p v-if="description != undefined" class="notification-text notification-description">{{ description }}</p>
        </div>
      </div>
      <k-button class="dismiss-notification" :on_click="dismiss" tooltip="Dismiss Notification" icon="times"></k-button>
    </div>
    <hr class="notification-separator">
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from "../base/KytosBaseWithIcon";

export default {
  name: "k-notification",
  mixins: [KytosBaseWithIcon],
  props: {
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    }
  },
  data(){
    return {
      showNotification: true
    }
  },
  methods: {
    dismiss() {
      this.showNotification = false
    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.notification-container
  margin: 10px

.k-notification
  display: flex
  align-items: center
  justify-content: space-between
  min-height: 80px
  margin-left: 10px
  margin-top: 10px
  margin-right: 20px
  color: $kytos-light-gray

.notification-icon
  fill: $kytos-light-gray
  width: 25px
  height: 25px
  padding: 10px
  margin-right: 5px

.notification-separator
  height: 1px
  background-color: rgba(255, 255, 255, .1)
  margin: 0px 10px
  border: none

.notification-body
  display: flex
  align-items: center

.notification-text
  margin: 10px

  &.notification-title
    font-weight: bold

  &.notification-description
    font-size: 15px


.dismiss-notification
  background: inherit !important

</style>

