<template>
  <div :id="id" class="k-logging">
    <div class="k-logging-toolbar">
        <k-button-group>
          <k-button icon="trash" v-on:click.native="clear" tooltip="Clear Logging"></k-button>
          <k-button v-bind:icon="playing" v-on:click.native="play_pause" tooltip="Pause/Play Logging" ></k-button>
          <k-checkbox icon="paint-brush" v-on:change.native="change_colors" class="round"></k-checkbox>
        </k-button-group>
        <k-button-group>
          <k-button title="All" @click.native="select('all')" tooltip="All logs"></k-button>
          <k-button title="Info" @click.native="select('info')" tooltip="Only info messages"></k-button>
          <k-button title="Warn" @click.native="select('warn')"  tooltip="Only warning messages"></k-button>
          <k-button title="Error" @click.native="select('error')"  tooltip="Only error messages"></k-button>
          <k-button title="Debug" @click.native="select('debug')"  tooltip="Only debug messages"></k-button>
        </k-button-group>
        <k-button-group>
          <k-input v-model="highlight_string" v-on:change.native='highlight' icon="lightbulb-o" tooltip="Highlight string" placeholder="Highlight string"></k-input>
        </k-button-group>
      </div>

      <div class="k-logging-content" v-bind:class="colors">
        <div v-for="log in logs" :class="log.level" v-show="log.display">
           {{log.msg}}
        </div>
      </div>

  </div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';
import LoggingUtils from './Logging-Utils';

export default {
  name: 'k-logging',
  mixins: [KytosBaseWithIcon, LoggingUtils],
  methods: {
    /**
     * Method called to change the log level.
     */
    select: function(selected){
      for (let log of this.logs){
        if (selected == 'all')
          log.display = true
        else if (selected === log.level)
          log.display = true
        else
          log.display = false
      }
    },
    /**
     * Method to clear all logs stored.
     */
    clear: function () {
      this.logs = []
    },
    /**
     * Method to start and stop store the logs from socked channel.
     */
    play_pause(){
      if(this.playing == "play"){
        this.join_channel('log')
        this.playing = "stop"
      }else{
        this.leave_channel('log')
        this.playing = "play"
      }
    },
    /**
     * Change the logs colors.
     */
    change_colors(){
      this.colors = (this.colors == "colors")? "no_colors": "colors"
    },
    /**
     * Highlight the word searched.
     */
    highlight: function(){
      var logs = $('.k-logging-content div')
      for (let log of logs){
       if (log.innerText.includes(this.highlight_string) > 0){
         var pattern = new RegExp(this.highlight_string, 'ig')
         log.innerHTML = log.innerText.replace( pattern,"<span class='highlight'>"+this.highlight_string+"</span>")
       }
      }
    }
  },
  mounted(){
    this.channels.add('log')
  },
  data () {
    return {
      colors: "no_colors",
      playing: "stop",
      highlight_string: "",
      filter: "all"
    }
  }
}
</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.k-logging
 position: relative
 width: 100%

.k-logging-toolbar
 width: 100%
 background-color: $fill-button-bg-h
 height: 30px
 overflow: hidden

 .k-input-wrap, input
  background: none
  border-color: transparent

 .k-button
  font-size: 0.8em
  height: 30px
  margin: 0px
  padding: 0px 5px

 svg
  width: 10px

.k-logging-content
 overflow: auto
 max-height: 280px
 min-height: 280px
 font-size: 0.8em
 line-height: 1.3em
 padding: 0.5em 1em
 background: $fill-input-hover
 color: $fill-input

 .highlight
  font-weight: bold
  background-color: $kytos-yellow
  color: #000

 &.colors
  .error
   color: $kytos-red

  .warn
   color: $kytos-yellow

  .info
   color: $kytos-green

 *:hover
   color: $kytos-blue
   cursor: pointer

*:-moz-full-screen
 .k-logging-content
  max-height: none

*:-webkit-full-screen
 .k-logging-content
  max-height: none

</style>
