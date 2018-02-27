<template>
  <div id="tabs-panel" class="kytos-tabs" v-bind:class="{ hiddenTabs: hiddenTabs }">
    <div class="kytos-tabs-nav">

      <kytos-button class="tab-nav" title="Terminal" icon="terminal" @click.native="openTab('terminal')"></kytos-button>
      <kytos-button class="tab-nav" title="Switches" icon="circle-o" @click.native="openTab('switches')"></kytos-button>
      <kytos-button class="tab-nav active" title="Logging" icon="heartbeat" @click.native="openTab('logging')"></kytos-button>
      <kytos-button class="tab-nav" title="Notifications" icon="bell-o" @click.native="openTab('notifications')"></kytos-button>
      <kytos-status-bar></kytos-status-bar>

      <div class="kytos-tabs-control">
        <a class="kytos-hidden-tab" v-on:click="this.toggleTerminal">
            <icon v-if="!hiddenTabs" name="chevron-down"></icon>
            <icon v-else name="chevron-up"></icon>
        </a>
        <a v-on:click="this.fullTerminal">
            <icon name="arrows-alt"></icon>
        </a>
      </div><!-- .kytos-tabs-control -->

    </div><!-- .kytos-tab-nav -->

    <div id="terminal" class="tabcontent">
      <kytos-terminal></kytos-terminal>
    </div>

    <div id="switches" class="tabcontent">
    </div>

    <div id="logging" class="tabcontent">
      <kytos-logging></kytos-logging>
    </div>

    <div id="notifications" class="tabcontent">
    </div>

  </div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue';

export default {
  name: 'kytos-tabs',
  mixins: [KytosBaseWithIcon],
  data () {
    return {
      hiddenTabs: true,
    }
  },

  methods: {
    toggleTerminal () {
      this.hiddenTabs = !this.hiddenTabs
    },

   fullTerminal () {

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

    openTab: function (cityName) {
      // Declare all variables
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tab-nav" and remove the class "active"
      tablinks = document.getElementsByClassName("tab-nav");
      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // TODO: Fix this active button
      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = "block";
      //evt.currentTarget.className += " active";

      // Open select tab on click
      this.hiddenTabs = false;

    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-tabs
 height: 350px
 margin-top: -350px
 z-index: 900
 position: relative
 background: $kytos-dark-gray
 margin-left: 280px

.kytos-tabs.hiddenTabs
  margin-top: -25px
  height: 25px
  overflow: hidden

.kytos-tabs:-moz-full-screen
  width: 100%
  height: 100vh

.kytos-tabs:-webkit-full-screen
  width: 100%
  height: 100vh
  margin: 0px
  padding: 0px

.kytos-tabs:-moz-full-screen .kytos-hidden-tab
  display: none

.kytos-tabs:-webkit-full-screen .kytos-hidden-tab
  display: none

.kytos-tabs-nav
 overflow: hidden
 height: 25px
 background-color: $fill-bar
 box-shadow: 0 -5px 5px -5px $kytos-dark-gray

.kytos-tabs-nav button
 float: left
 color: $fill-text
 border: none
 outline: none
 cursor: pointer
 font-size: 0.78em
 padding: 0 1.2em
 height: 25px
 margin: 0px
 transition: 0.3s
 border-right: 1px solid $kytos-dark-gray

.kytos-tabs-nav button:hover
  color: $fill-text-h
  background-color: rgba(0,0,0,0.4)

.kytos-tabs-nav .active
  color: $fill-link
  background-color: $fill-button-bg-h

.kytos-tabs-nav button:hover svg
  fill: $fill-icon-h

.kytos-tabs-nav .active svg
  fill: $fill-icon

.kytos-tabs-nav svg
  width: 13px
  margin-right: 5px

.tabcontent
  display: none
  background: $fill-input-hover
  position: relative
  min-height: 325px
  max-height: 325px
  overflow: auto
  padding: 0px 0px 0px

.kytos-tabs-control
  float: right
  display: inline-flex

.kytos-tabs-control svg
  width: 8px

.kytos-tabs-control a
  display: block
  cursor: pointer
  padding: 5px

.kytos-tabs-control a:hover svg
  fill: $fill-icon-h

.kytos-tabs:-moz-full-screen .tabcontent
  height: auto
  min-height: 100vh
  max-height: 100vh

.kytos-tabs:-webkit-full-screen .tabcontent
  height: auto
  min-height: 100vh
  max-height: 100vh

.compacted
 .kytos-tabs
   margin-left: 40px

</style>
