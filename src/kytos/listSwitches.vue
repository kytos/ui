<template>

<div id="kytos-switch-search">

  <div id="kytos-input-search" class="kytos-input-wrap">
   <icon name="search"></icon>
   <input type="text" v-model="search" class="kytos-input" placeholder="Search for switches" onshow="this.focus()" autofocus id="kytos-switches-search-input">
  </div>

  <div id="search-result">
    <div class="item-search" :title="s.dpid" v-for="s in switchesFiltered" v-on:click="open_switch(s)">
          <div class="item-switch"><span>{{s.name}} </span><br />({{s.connection}})</div>
          <div class="item-content" v-if="s.custom_properties.description"><b>Description:</b> {{s.custom_properties.description}}</div>
          <div class="item-content" v-if="s.custom_properties.city"><b>City:</b> {{s.custom_properties.city}}</div>
          <div class="item-content" v-if="s.custom_properties.network"><b>Network:</b> {{s.custom_properties.network}}</div>
          <div class="item-content"><b>Interfaces:</b> {{s.interfaces | length}}</div>
    </div>
  </div>

</div>
</template>
<style>
#search-result {
 -webkit-flex: 1 1 auto;
 overflow: auto;
 height: 85vh;
}
#kytos-switch-search {
 color: #CCC;
 font-size: 0.9em;
 line-height: 1.2em;
}
#kytos-input-search {
 margin-bottom: 10px;
 width: 96%;
 font-size: 1.2em;
}

#kytos-input-search:hover *,
#kytos-input-search:hover {
 background: #111;
}

.item-search {
 clear: both;
 border-top: 1px solid #444;
 padding: 5px;
 margin-right: 10px;
 cursor: pointer;
}
.item-search:hover * {
 background: #111;
 color: #008690;
}
.item-content:hover {
 background: #111;
 color: #008690;
}

.item-switch span {
 font-weight: bold;
}
.item-content {
 color: #BBB;
 font-size: 0.9em;
}
</style>
<script>
import KytosBaseWithIcon from '../components/kytos/base/KytosBaseWithIcon.vue';
import switchInfo from "../kytos/switchInfo.vue"
const d3 = require('d3')

export default {
  name: 'kytos-list-switches',
  mixins: [KytosBaseWithIcon],
  props: ["content"],
  data () {
    return {
      search: '',
      switches: [],
    }
  },
  filters: {
    length(items) {
      return Object.keys(items).length
    }
  },
  methods: {
    get_switches () {
      var endpoint = "http://demo.kytos.io:8181/api/kytos/topology/v2"
      var self = this
      d3.json(endpoint, function(error, result) {
        for (var key in result.devices) {
          self.switches.push(result.devices[key])
        }
      })
    },
    open_switch (s) {
      var content = {"component": switchInfo,
                     "content": s,
                     "icon": "gear",
                     "title": "Switch Details",
                     "subtitle": s.connection}
      this.$kytos.$emit("showInfoPanel", content)
    }
  },
  mounted () {
    this.get_switches()
  },
  updated () {
    document.getElementById('kytos-switches-search-input').focus()
  },
  watch: {
    content () {
      if (this.content) {
        this.update_switch_content()
      }
    }
  },
  computed: {
    switchesFiltered() {
      self = this
      return this.switches.filter(function(item) {
        var search = self.search.toLowerCase()
        var description = ''
        var city = ''
        var network = ''
        if (item.custom_properties['description'])
          description = item.custom_properties['description'].toLowerCase()
        if (item.custom_properties['city'])
          city = item.custom_properties['city'].toLowerCase()
        if (item.custom_properties['network'])
          network = item.custom_properties['network'].toLowerCase()

        return (item.name.toLowerCase().indexOf(search)>=0 ||
                item.connection.toLowerCase().indexOf(search)>=0 ||
                description.indexOf(search)>=0 ||
                city.indexOf(search)>=0 ||
                network.indexOf(search)>=0)
      })
    }
  }

}
</script>
