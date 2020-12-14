<template>
  <div id="tabs-panel" class="k-tabs" v-bind:class="{ hiddenTabs: hiddenTabs }">
    <div class="k-tabs-nav">

      <k-button class="tab-nav terminal" title="Terminal" icon="terminal" @click.native="openTab('terminal')"></k-button>
      <k-button class="tab-nav switches" title="Switches" icon="circle-o" @click.native="openTab('switches')"></k-button>
      <k-button class="tab-nav logging" title="Logging" icon="heartbeat" @click.native="openTab('logging')"></k-button>
      <k-button class="tab-nav notifications" title="Notifications" icon="bell-o" @click.native="openTab('notifications')"></k-button>
      <k-status-bar></k-status-bar>

      <div class="k-tabs-control">
        <a class="k-hidden-tab" v-on:click="this.toggleTerminal">
          <icon v-if="!hiddenTabs" name="chevron-down"></icon>
          <icon v-else name="chevron-up"></icon>
        </a>
        <a class="k-hidden-tab k-toggle-info-panel" v-on:click="this.latestInfoPanel">
          <icon v-if="!hiddenPanel" name="chevron-left"></icon>
          <icon v-else name="chevron-right"></icon>
        </a>
        <a v-on:click="this.fullTerminal">
          <icon name="arrows-alt"></icon>
        </a>
      </div><!-- .k-tabs-control -->

    </div><!-- .k-tab-nav -->

    <div id="terminal" class="tabcontent">
      <k-terminal></k-terminal>
    </div>

    <div id="switches" class="tabcontent">
    </div>

    <div id="logging" class="tabcontent">
      <k-logging></k-logging>
    </div>

    <div id="notifications" class="tabcontent">
      <k-notification v-for="notification in notifications" v-bind:key="notification.id"
                      v-bind:title="notification.title"
                      v-bind:description="notification.description"
                      v-bind:icon="notification.icon"></k-notification>
    </div>

  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';

export default {
  name: 'k-tabs',
  mixins: [KytosBaseWithIcon],
  data() {
    return {
      hiddenTabs: true,
      content: {},
      notifications: [],
      hiddenPanel: true,
      lastTab: -1
    }
  },
  watch: {
    hiddenTabs: function () {
      /** Watch the hiddenTabs and get all elements with class="tab-nav"
       * to remove the class "active" when tabs are closed,
       * and reactive the last used tab
       **/
      let tabLinks = $(".tab-nav")
      if (this.hiddenTabs) {
        for (let i = 0; i < tabLinks.length; i++) {
           $(tabLinks[i]).removeClass("active")
        }
      }else {
        if (!$(tabLinks[this.lastTab]).hasClass("active")){
          $(tabLinks[this.lastTab]).addClass("active")
        }
      }
    }
  },
  methods: {
    toggleTerminal() {
      this.hiddenTabs = !this.hiddenTabs
    },
    toggleInfoPanelIcon(action) {
      this.hiddenPanel = (action !== 'show')
    },
    latestInfoPanel() {
      let infoPanelEvent
      (this.hiddenPanel) ? infoPanelEvent = 'showLatestInfoPanel' : infoPanelEvent = 'hideInfoPanel'
      this.$kytos.$emit(infoPanelEvent)
    },
    setNotification(notification) {
      this.openTab('notifications')
      Object.assign(notification, {id: this.notifications.length});
      this.notifications.push(notification)
    },
    fullTerminal() {

      // Open/show tab on click
      this.hiddenTabs = false;

      var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
          (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
          (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
          (document.msFullscreenElement && document.msFullscreenElement !== null);

      var docElm = document.getElementById("tabs-panel");

      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },
    openTab: function (tabName) {
      // Declare all variables
      var i, tabcontent, tabLinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tab-nav" and remove the class "active"
      tabLinks = $(".tab-nav")
      for (i = 0; i < tabLinks.length; i++) {
        if ($(tabLinks[i]).hasClass(tabName)) {
          $(tabLinks[i]).addClass("active")
          this.lastTab = i
        }else {
          $(tabLinks[i]).removeClass("active")
        }
      }

      /**Show the current tab by adding an "active" class
       * to the button that opened the tab
       * [ Maybe in the future change it to use
       * event listeners if needed like:
       * **evt.currentTarget.className += " active"**]
       **/
      document.getElementById(tabName).style.display = "block";
      //evt.currentTarget.className += " active";

      // Open select tab on click
      this.hiddenTabs = false;

    },
    register_listeners() {
      /**
       * setup a notification.
       *
       * @event setNotification
       * @type {object} Notification text, icon and description
       *                                that will be displayed.
       *
       *       {
       *         **title**: "Switch Request", // Title of the notification
       *         **description**: "Connection to port 00", // Description of the notification
       *         **icon**: "desktop" //fa-icon name as the main icon of the notification
       *       }
       */
      this.$kytos.$on('setNotification', this.setNotification)

      /**
       * Toggle the InfoPanel icon
       *
       * @event toggleInfoPanelIcon
       * @type {NULL}
       */
      this.$kytos.$on('toggleInfoPanelIcon', this.toggleInfoPanelIcon)
    }
  },
  mounted() {
    this.register_listeners()
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-tabs
  height: 350px
  margin-top: -350px
  z-index: 1000
  position: relative
  background: $fill-panel-dark
  margin-left: 280px

.k-tabs.hiddenTabs
  margin-top: -25px
  height: 25px
  overflow: hidden

.k-tabs:-moz-full-screen
  width: 100%
  height: 100vh

.k-tabs:-webkit-full-screen
  width: 100%
  height: 100vh
  margin: 0
  padding: 0

.k-tabs:-moz-full-screen .k-hidden-tab
  display: none

.k-tabs:-webkit-full-screen .k-hidden-tab
  display: none

.k-tabs-nav
  overflow: hidden
  height: 25px
  background-color: $fill-panel-dark
  box-shadow: 0 -5px 5px -5px $fill-bar

.k-tabs-nav button
  float: left
  color: $fill-icon
  border: none
  outline: none
  cursor: pointer
  font-size: 0.78em
  padding: 0 1.2em
  height: 25px
  margin: 0
  transition: 0.3s
  background-color: $fill-panel-dark
  border-right: 1px solid $fill-panel

.k-tabs-nav button:hover
  color: $fill-icon-h
  background-color: $fill-panel

.k-tabs-nav .active
  color: $fill-panel-h
  background-color: $fill-bar

.k-tabs-nav button:hover svg
  fill: $fill-icon-h

.k-tabs-nav .active svg
  fill: $fill-icon

.k-tabs-nav svg
  width: 13px
  margin-right: 5px

.tabcontent
  display: none
  background: $fill-bar
  position: relative
  min-height: 325px
  max-height: 325px
  overflow: auto
  padding: 0 0 0

.k-tabs-control
  float: right
  display: inline-flex

  svg
    width: 8px
    fill: $fill-icon

  a
    display: block
    cursor: pointer
    padding: 5px

  a:hover svg
    fill: $fill-icon-h

.k-tabs:-moz-full-screen .tabcontent
  height: auto
  min-height: 100vh
  max-height: 100vh

.k-tabs:-webkit-full-screen .tabcontent
  height: auto
  min-height: 100vh
  max-height: 100vh

.compacted
  .k-tabs
    margin-left: 40px

.k-hidden-tab
  &.k-toggle-info-panel
    svg
      width: 6px

</style>
