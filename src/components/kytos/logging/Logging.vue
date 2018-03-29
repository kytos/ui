<template>
  <div :id="id" class="kytos-logging">
    <div class="kytos-logging-toolbar">
        <kytos-button-group>
          <kytos-button icon="trash" v-on:click.native="clear" tooltip="Clear Logging"></kytos-button>
          <kytos-button v-bind:icon="playing" v-on:click.native="play_pause" tooltip="Pause/Play Logging" ></kytos-button>
          <kytos-checkbox icon="paint-brush" v-on:change.native="change_colors" class="round"></kytos-checkbox>
        </kytos-button-group>
        <kytos-button-group>
          <kytos-button title="All" @click.native="select('all')" tooltip="All logs"></kytos-button>
          <kytos-button title="Info" @click.native="select('info')" tooltip="Only info messages"></kytos-button>
          <kytos-button title="Warn" @click.native="select('warn')"  tooltip="Only warning messages"></kytos-button>
          <kytos-button title="Error" @click.native="select('error')"  tooltip="Only error messages"></kytos-button>
          <kytos-button title="Debug" @click.native="select('debug')"  tooltip="Only debug messages"></kytos-button>
        </kytos-button-group>
        <kytos-button-group>
          <kytos-input v-model="highlight_string" v-on:change.native='highlight' icon="lightbulb-o" tooltip="Highlight string" placeholder="Highlight string"></kytos-input>
        </kytos-button-group>
      </div>

      <div class="kytos-logging-content" v-bind:class="colors">
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
  name: 'kytos-logging',
  mixins: [KytosBaseWithIcon, LoggingUtils],
  methods: {
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
    clear: function () {
      this.logs = []
    },
    play_pause(){
      if(this.playing == "play"){
        this.join_channel('log')
        this.playing = "stop"
      }else{
        this.leave_channel('log')
        this.playing = "play"
      }
    },
    change_colors(){
      this.colors = (this.colors == "colors")? "no_colors": "colors"
    },
   highlight: function(){
     var logs = $('.kytos-logging-content div')
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

.kytos-logging
 position: relative
 width: 100%

.kytos-logging-toolbar
 width: 100%
 background-color: $fill-button-bg-h
 height: 30px
 overflow: hidden

 .kytos-input-wrap, input
  background: none
  border-color: transparent

 .kytos-button
  font-size: 0.8em
  height: 30px
  margin: 0px
  padding: 0px 5px

 svg
  width: 10px

.kytos-logging-content
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
 .kytos-logging-content
  max-height: none

*:-webkit-full-screen
 .kytos-logging-content
  max-height: none

</style>
