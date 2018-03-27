<template>
  <div class="terminal-status-bar">
    <span class='terminal-status-background'>&nbsp;</span>
  </div>
</template>

<script>

  /*
   * A tabbed bar such as a Terminal, Switches, Logging, Notifications and System Information.
   */
   
  export default {
    name: 'kytos-status-bar',
    data(){
      return {
        messages: [],
        options:{
            speed: 50,
            autoStart: true,
            breakDelay: 3000,
            breakLines: false
        }
      }
    },
    mounted (){
      require('typeit')
      this.register_listeners()
      setInterval(this.display_messages, 3000)
    },
    methods:{
      display_messages(){
        var message= this.messages.shift()
        if (message !== undefined){
          this.get_terminal().tiType(message).tiPause(1500).tiDelete()
        }
      },
      get_terminal (){
        return $('.terminal-status-bar span').typeIt(this.options)
      },
      set_status(message, error=false){
        if (error){
          message = "<span class='status-error'>" + message + "</span>"
        }
        this.messages.push(message)
      },
      register_listeners(){
        this.$kytos.$on('statusMessage', this.set_status)
      }
    }
  }
</script>

<style lang='sass'>
.terminal-status-bar
  display: inline-flex
  background: #222
  padding: 6px 0;
  font-family: monospace
  color: #adadad
  font-size: 12px

.terminal-status-bar:before
  content: '|'

.terminal-status-bar .status-error
  color: #b35151

</style>
