<template>
  <div :id="id" class="kytos-terminal">
    <div class="kytos-terminal-toolbar">
        <kytos-button-group>
          <kytos-button title="Terminal JS" tooltip="Running Terminal JS" v-on:click="this.runTerminal"></kytos-button>
          <kytos-button title="Bash terminal" tooltip="Running Terminal Bash" @click.native="runTerminal()"></kytos-button>
        </kytos-button-group>
      </div>

      <div class="kytos-terminal-content" id="term_demo">
      </div>

  </div>
</template>

<script>
import KytosBaseWithIcon from '../base/KytosBaseWithIcon.vue';
import JsTerminal from './jquery.terminal.min.js';

export default {
  name: 'kytos-terminal',
  mixins: [KytosBaseWithIcon],
  terminal: [JsTerminal],

  methods: {

    runTerminal () {

    var divTerminal = document.getElementById("term_demo");

    divTerminal.terminal(function(command) {

    if (command !== '') {
            try {
                var result = window.eval(command);
                if (result !== undefined) {
                    this.echo(new String(result));
                }
            } catch(e) {
                this.error(new String(e));
            }
        } else {
           this.echo('');
        }
    }, {
        greetings: 'Javascript Interpreter',
        name: 'js_demo',
        height: 200,
        prompt: 'js> '
    })

    }
  }
}

</script>

<style lang="sass">

@import '../../../assets/styles/variables'

.kytos-terminal
 position: relative
 width: 100%

.kytos-terminal-content
 height: 290px
 overflow: auto

.kytos-terminal-toolbar
 width: 100%
 background-color: $fill-button-bg-h
 height: 30px
 overflow: hidden

 .kytos-input
  font-size: 0.7em
  height: 10px

 .kytos-button
  font-size: 0.8em
  height: 30px

 svg
  width: 10px

</style>
