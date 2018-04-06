<template>
  <div id="app" v-bind:class="{ compacted: compacted  }">
    <k-menubar v-bind:toggle=toggle v-bind:compacted=compacted></k-menubar>
    <k-tabs></k-tabs>

    <section id="k-area">
      <k-map></k-map>
    </section>

    <k-info-panel></k-info-panel>
    <k-action-menu></k-action-menu>
    <k-napps-info-panel></k-napps-info-panel>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
     compacted: false,
     SwitchLabels: [{value: 1, description: "DPID"},
                    {value: 2, description: "Name"},
                    {value: 3, description: "Hardware"},
                    {value: 4, description: "Connection"}
                   ],
     HostLabels: [{value: 1, description: "MAC Address"},
                  {value: 2, description: "Name"}
                 ],
     InterfaceLabels: [{value: 1, description: "Port Number"},
                       {value: 2, description: "Port Name"},
                       {value: 3, description: "MAC Address"},
                      ],
   }

  },
  methods: {
    toggle () {
      this.compacted = !this.compacted

      $(".k-toolbar").show();

      this.$nextTick(function () {
      // DOM is now updated
        $(".k-toolbar .k-menu-item").not(":hidden").each(function() {
            $(this).each(function(){
                if ($(this).find(".compact").length == 0){
                    $(".compacted .k-toolbar").css("display","none");
                }
            });
        });
      });

    },
  }
}
</script>

<style lang="sass">

@import './assets/styles/variables'
@import './assets/styles/reset'

/* BODY */
body
  font-size: 1em
  font-family: sans-serif

li
  display: inline-block

a
  color: #fff

#app
  text-align: left

.container
  display: -webkit-flex
  display: flex
  width: auto
  overflow: hidden

::-webkit-scrollbar-track
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
  border-radius: 10px
  background-color: rgba(0,0,0,0.8)

::-webkit-scrollbar
  width: 12px;
  background-color: rgba(0,0,0,0.8)

::-webkit-scrollbar-thumb
  border-radius: 10px
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
  background-color: rgba(255,255,255,0.3)

#k-area
 display: -webkit-flex
 display: flex
 width: 100%
 height: 100vh
 overflow: hidden
 position: absolute
 top: 0
 left: 0

</style>
