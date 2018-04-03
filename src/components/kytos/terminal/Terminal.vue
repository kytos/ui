<template>
  <div :id="id" class="k-terminal">
    <div class="k-terminal-toolbar">
        <k-button-group>
          <k-button title="Terminal JS" tooltip="Running Terminal JS" v-on:click="this.runTerminal"></k-button>
          <k-button title="Bash terminal" tooltip="Running Terminal Bash" @click.native="runTerminal()"></k-button>
        </k-button-group>
      </div>

      <div class="k-terminal-content" id="term_demo">
      </div>

  </div>
</template>

<script>
import KytosBase from '../base/KytosBase';
import KytosBaseWithIcon from '../base/KytosBaseWithIcon';
import JsTerminal from './jquery.terminal.min.js';

export default {
  name: 'k-terminal',
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

.k-terminal
 position: relative
 width: 100%

.k-terminal-content
 height: 290px
 overflow: auto

.k-terminal-toolbar
 width: 100%
 background-color: $fill-button-bg-h
 height: 30px
 overflow: hidden

 .k-input
  font-size: 0.7em
  height: 10px

 .k-button
  font-size: 0.8em
  height: 30px

 svg
  width: 10px

</style>
