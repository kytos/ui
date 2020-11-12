<template>
  <div id="k-map">
    <component v-bind:is="this.extraComponent" v-bind:map="this.map" v-bind:original_graph="this.topology.graph"></component>
  </div>
</template>

<script>
import KytosBase from '../base/KytosBase'
import KytosBaseWithIcon from '../base/KytosBaseWithIcon'
import KytosTopology from '../topology/Topology.vue'
import {json} from "d3-request"

export default {
  name: 'k-map',
  mixins: [KytosBaseWithIcon],
  data () {
    return {
      map: undefined,
      map_center: [-104.991531, 39.742043],
      map_zoom: 2,
      extraComponent: undefined,
      topology: {
        url: this.$kytos_server_api + "kytos/topology/v3/",
        graph: null
      }
    }
  },
  methods: {
    setListeners () {
      /**
       * Change the map opacity based on number value.
       *
       * @event change-map-opacity
       * @type {Number} The Opacity number
       */
      this.$kytos.$on("change-map-opacity", this.changeMapOpacity);
    },
    changeMapOpacity (value) {
      value = parseInt(value, 10)
      // This if is due to a mapboxgl bug reported at:
      // https://github.com/mapbox/mapbox-gl-js/issues/2074
      // Because of this bug if background-opacity is set to 1, then the map is
      // hidden but its labels are not.
      if (value == 0) {
        this.map.setPaintProperty("background", "background-opacity", 0.9999)
      } else {
        value = 1 - value / 100
        this.map.setPaintProperty("background", "background-opacity", value)
      }
    },
    loadMap () {
      mapboxgl.accessToken = "pk.eyJ1Ijoia3l0b3MiLCJhIjoiY2o5ZTRsbHpnMjd3ZjMzbnJxc2xqa2hibyJ9.bBZPeP_YLA5oP0heHRpL6A"

      var map = new mapboxgl.Map({
        container: "k-map",
        style: "mapbox://styles/kytos/cj9e4mbtm6s532smy6767uftz",
        center: this.map_center,
        zoom: this.map_zoom
      })

      map.dragRotate.disable()

      map.on("load", () => {
        map.addLayer({
          id: "background",
          type: "background",
          paint: {
            "background-color": "#222",
            "background-opacity": 0
          },
          style: {
            "transition": {
              "duration": 0,
              "delay": 0
            }
          }
        })
        this.getTopology()
      })
      this.map = map
    },
    getTopology () {
      let topoTimer = this.topoTimer
      console.log("Fetching topology data")
      json(this.topology.url, (error, graph) => {
        if (error) {
          var msg = "Error while trying to load the topology"
          this.$kytos.$emit("statusMessage", msg, true)
          throw error
        } else {
          this.topology.graph = graph.topology
          this.extraComponent = KytosTopology
        }
      })
    }
  },
  mounted () {
    this.loadMap()
    this.setListeners()
  }
}
</script>

<style lang="sass">
#k-map
  background-color: #222;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  canvas
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;

.mapboxgl-ctrl-attrib
  top: -25px
</style>
