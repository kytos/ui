<template>
</template>

<script>
import * as d3 from "d3"
import switchInfo from "../../../kytos/switchInfo.vue"

export default {
  name: "kytos-topology",
  props: ["map", "original_graph"],
  data () {
    return {
      topology_url: "http://demo.kytos.io:8181/api/kytos/topology/v2/",
      map_container: undefined,
      graph: {},
      svg: undefined,
      simulation: undefined,
      // Nodes vars
      charge: {"switch": 10, "interface": -20, "host": 20},
      size: {"switch": 12, "interface": 2, "host": 8},
      nodes_fill: {"switch": "rgba(85, 64, 199, 0.8)",
                   "interface": "rgba(255,255,255,0.5)",
                   "host": "rgba(255,0,0,1)"},
      nodes_stroke: {"switch": "rgba(85, 64, 199, 0.8)",
                     "interface": "rgba(255,255,255,0.5)",
                     "host": "rgba(255,255,255.0.5)"},
      // Links vars
      strength: {"link": 0.001, "interface": 1, "host": 0.1},
      distance: {},
      strokes: {interface: 0, link: 1, host: 1},
      // other attributes
      labels_display: {
        switch: 'name'
      }
    }
  },
  computed: {
    map_width () {
      return $("#kytos-map canvas").width()
    },
    map_height () {
      return $("#kytos-map canvas").height()
    }
  },
  mounted () {
    this.map_container = this.map.getCanvasContainer()
    this.distance = {"link": 20 * this.size["switch"],
                     "interface": this.size["switch"] + 4,
                     "host": 1 * this.size["interface"]}
    this.update_graph_data()
    this.draw_topology()
    this.setListeners()
  },
  methods: {
    setListeners () {
      var self = this
      this.$kytos.$on("topology-highlightAll", function(p){
        if (!self.check_switch_under_click(p)) self.highlight_all_nodes()
      })
      this.$kytos.$on("topology-toggle-label", this.toggle_labels)
    },
    check_switch_under_click (p) {
      // p: point that was clicked with p.x and p.y attributes
      let s, dx2, dy2, dist

      // closest switch to the clicked point
      s = this.simulation.find(p.x, p.y)
      // distance between the switch and the clicked point (p)
      dx2 = Math.pow((s.x - p.x), 2)
      dy2 = Math.pow((s.y - p.y), 2)
      dist = Math.sqrt(dx2 + dy2)
      if (dist <= this.size.switch) return true
      return false
    },
    update_graph_data () {
      var self = this
      this.graph = this.original_graph

      // variable that will be used to only allow nodes for interfaces that
      // have a link attached to it.
      let interfaces_with_links = []

      this.graph.links.forEach(function(link){
        link.source = link.a
        interfaces_with_links.push(link.a)
        link.target= link.b
        interfaces_with_links.push(link.b)
        link.type = "link"
        link.id = self.fix_name(link.a) + "___" + self.fix_name(link.b)
      })

      this.graph.nodes = Object.values(this.graph.devices)
      this.graph.nodes.forEach(function(node){
        if (node.type == "host"){
          node.name = node.mac
          node.id = self.fix_name(node.mac)
        } else {
          // here we only have switches. Let's create the interfaces nodes.
          node.lat = null
          node.lng = null
          // setting switch position based on its lat-lng.
          if (node.custom_properties && node.custom_properties.lat) {
            node.lat = node.custom_properties.lat
            node.lng = node.custom_properties.long
            let ll = self.project(node.lat, node.lng)
            node.x = node.fx = ll.x
            node.y = node.fy = ll.y
          }
          let interfaces = Object.values(node.interfaces)
          interfaces.forEach(function(_interface){
            if (interfaces_with_links.indexOf(_interface.id) > -1) {
              self.graph.nodes.push(_interface)
            }
          })
        }
      })
    },
    project (lat, lng) {
      return this.map.project(new mapboxgl.LngLat(+lng, +lat))
    },
    get_interface_owner (d) {
      /* Get the switch in which the "d" interface is connected */
      if (d.type != "interface") return null
      var searched_switch = null
      $.each(this.simulation.nodes(), function(index, node) {
        if (node.id == d.switch) {
          searched_switch = node
          return false  // this just breaks the each loop.
        }
      })
      return searched_switch
    },
    get_switch_interfaces (s) {
      /* Get all interfaces associated to the "d" host */
      if (s.type != "switch") return null
      return this.simulation.nodes().filter(function(d){ return d.type == "interface" && d.switch == s.id })
    },
    get_nodes_by_type (type) {
      return this.simulation.nodes().filter(function(d) {return d.type == type;})
    },
    get_interfaces () {
      return this.get_nodes_by_type("interface")
    },
    get_hosts () {
      return this.get_nodes_by_type("host")
    },
    get_switches () {
      return this.get_nodes_by_type("switch")
    },
    get_node_links(node) {
      return this.simulation.force('link').links().filter(function(d){ return d.source == node || d.target == node})
    },
    radius_positioning (d, cx, cy) {
      let delta_x = d.x - cx
      let delta_y = d.y - cy
      let rad = Math.atan2(delta_y, delta_x)
      let new_x = cx + Math.cos(rad) * this.distance["interface"]
      let new_y = cy + Math.sin(rad) * this.distance["interface"]

      return [new_x, new_y]
    },
    link_highlight (link) {
      d3.select("#link-" + link.id).classed("downlight", false)
    },
    node_highlight (node) {
      d3.select("#node-" + node.type + "-" + this.fix_name(node.id))
        .classed("downlight", false)
    },
    node_downlight (node) {
      d3.select("#node-" + node.type + "-" + this.fix_name(node.id))
        .classed("downlight", true)
    },
    highlight_all_switches () {
      d3.selectAll('[id^="node-switch-"]').classed("downlight", false)
    },
    highlight_all_interfaces () {
      d3.selectAll('[id^="node-interface-"]').classed("downlight", false)
    },
    highlight_all_nodes () {
      d3.selectAll('[id^="node-"]').classed("downlight", false)
      d3.selectAll('line').classed("downlight", false)
      this.$kytos.$emit("hideInfoPanel")
    },
    downlight_all_switches () {
      d3.selectAll('[id^="node-switch-"]').classed("downlight", true)
    },
    downlight_all_interfaces () {
      d3.selectAll('[id^="node-interface-"]').classed("downlight", true)
    },
    downlight_all_links () {
      d3.selectAll('line').classed("downlight", true)
    },
    highlight_switch (obj) {
      // downlight all
      this.downlight_all_switches()
      this.downlight_all_interfaces()
      this.downlight_all_links()
      this.node_highlight(obj)
      var self = this
      this.get_switch_interfaces(obj).forEach(function(_interface){
        self.node_highlight(_interface)
        self.get_node_links(_interface).forEach(function(_link){self.link_highlight(_link)})
      })

      var content = {"component": switchInfo,
                     "content": obj,
                     "icon": "gear",
                     "title": "Switch Details",
                     "subtitle": obj.connection}
      this.$kytos.$emit("showInfoPanel", content)
    },
    toggle_labels (content) {
      let label_type = content.value
      let node_type = content.node_type
      $(".label." + node_type).fadeOut()
      $(".label." + node_type + "." + label_type).fadeIn()
      this.labels_display[node_type] = label_type
    },
    show_context (d) {
      this.highlight_switch(d)
    },
    fix_name (name) {
      return name.toString().replace(/:/g, "__")
    },
    unfix_name (name) {
      return name.toString().replace(/\_\_/g, ":")
    },
    add_label (name, attribute, nodes, show=false) {
      // creating a group label
      var label_group = nodes
        .append("g")
        .classed("label", true)
        .classed(name, true)
        .classed(attribute, true)

      let label_distance = 12
      let label_radius = 6
      // creating a rect to do some backgrounding on the label.
      var label_rects = label_group
          .append("rect")
            .attr("x", label_distance)
            .attr("y", label_distance)
            .attr("rx", label_radius)
            .attr("ry", label_radius)
            .style("fill", "rgba(155,155,255,0.2)")

      // adding the attribute itself as a svg text element
      var label_text = label_group
          .append("text")
            .text(function(d){ return d[attribute] })

      // fixing the rect width and height according to the attribute size.
      label_rects
        .attr("width", function(d) { return this.parentNode.getBBox().width + label_radius })
        .attr("height", function(d) { return this.parentNode.getBBox().height + label_radius })

      // fixing the attribute text element positioning to the center of the rect.
      label_text
          .attr("x", function(d) {
            let base_x = parseInt(this.parentNode.firstElementChild.attributes.x.value)
            return  base_x + label_distance / 2 - label_radius / 2
          })
          .attr("y", function(d) {
            let base_y = parseInt(this.parentNode.firstElementChild.attributes.height.value)
            return base_y + label_distance / 2 + 1
          })
          .attr("fill", "white")

      if (this.labels_display[name] != attribute) label_group.style("display", "none")

      // Dispatch event to populate menu.
      let eventName = "menu-add-" + name + "-label"
      let arg = {value: attribute,
                 description: attribute[0].toUpperCase() + attribute.slice(1),
                 selected: this.labels_display[name] == attribute}
      this.$kytos.$emit(eventName, arg)
    },
    center () {
      let center = this.map.getCenter()
      return this.project(center.lat, center.lng)
    },
    set_switch_position (s) {
      let ll = this.project(s.lat, s.lng)
      s.x = s.fx = ll.x
      s.y = s.fy = ll.y
      s.vx = s.vy = 0
    },
    link_force () { return d3.forceLink(this.graph.links).id(this.topo_id) },
    restartSim () {
      this.simulation.nodes(this.graph.nodes)
      this.simulation.alpha(1).restart()
    },
    topo_id (d) { return d.id },
    topo_strength (d) { return this.strength[d.type] },
    topo_distance (d) { return this.distance[d.type] },
    link_stroke_width (d) { return this.strokes[d.type] },
    gnode_radius (d) { return this.size[d.type] },
    gnode_stroke (d) { return this.nodes_stroke[d.type] },
    gnode_fill (d) { return this.nodes_fill[d.type] },
    gnode_id (d) { return "node-" + d.type + "-" + this.fix_name(d.id) },
    link_id (l) { return "link-" + l.id },
    draw_topology() {
      this.$kytos.$emit('statusMessage', "Building topology ... ")

      var self = this
      var links, gnodes, node, switch_labeled_items

      this.svg = d3.select(this.map_container).append("svg")
        .attr("id", "svg-topo")
        .attr("width", this.map_width)
        .attr("height", this.map_height)
        .on("mousedown.drag", null)

      this.svg.append("rect")
        .attr("id", "click_background")
        .attr("width", this.map_width)
        .attr("height", this.map_height)
        .on("click", function() {
          var coords = d3.mouse(this)
          coords = {x: coords[0], y: coords[1]}
          if (!self.check_switch_under_click(coords)) self.highlight_all_nodes()
        })
        .on("mousedown.drag", null)

      this.svg = this.svg.append("g")
        .attr("id", "topo-group")

      links = this.svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(this.graph.links)
                .enter().append("line")
                    .attr("id", this.link_id)
                    .attr("stroke-width", this.link_stroke_width)
                    .attr("stroke", "grey")

      gnodes = this.svg.append("g")
                .classed("nodes", true)
                .selectAll("g.node")
                .data(this.graph.nodes)
                .enter().append("g")
                    .classed("gnode", true)
                    .attr("id", this.gnode_id)

      node = gnodes.append("circle")
               .attr("class", "node")
               .attr("r", this.gnode_radius)
               .attr("stroke", this.gnode_stroke)
               .attr("stroke-width", 2)
               .attr("fill", this.gnode_fill)
               .on("click", this.show_context)

      /*******************/
      /* SWITCH LABELING */
      /*******************/
      // only labeling switches, but not interfaces
      switch_labeled_items = gnodes.filter(function(d) {return d.type == "switch";})

      this.add_label("switch", "name", switch_labeled_items, true) // NAME LABEL
      this.add_label("switch", "connection", switch_labeled_items, false)// ADDRESS LABEL
      this.add_label("switch", "dpid", switch_labeled_items, false)// DPID LABEL
      /**************************/
      /* END OF SWITCH LABELING */
      /**************************/

      if (!this.simulation) {
        this.simulation = d3.forceSimulation()
      }

      this.simulation.nodes(this.graph.nodes)

      this.simulation
        .force("link", this.link_force())

      this.simulation.on("tick", ticked);

      this.map.on("viewreset", this.restartSim)
      this.map.on("movestart", this.restartSim)
      this.map.on("moveend", this.restartSim)
      // this.map.on("move", this.restartSim)

      function ticked() {
        gnodes.filter(function(d){ return d.type == "switch" })
          .attr("transform", function(d) {
            let _ = self.set_switch_position(d)
            return "translate(" + [d.x, d.y] + ")"
          })

        gnodes.filter(function(d){ return d.type == "interface" })
          .attr("transform", function(d) {
            let owner = self.get_interface_owner(d)
            let new_positions = self.radius_positioning(d, owner.x, owner.y)
            d.cx = d.x = new_positions[0]
            d.cy = d.y = new_positions[1]
          return "translate(" + [d.x, d.y] + ")"
        })

        links
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; })
      }
      this.$kytos.$emit("statusMessage", "Topology built. Have fun!")
    }
  },
  beforeDestroy () {
    // Removing listeners
    this.$kytos.$off("topology-highlightAll")
    this.$kytos.$off("topology-toggle-label")

    // Remove SVG
    d3.select(this.map_container).select("svg").remove()
  }
}

</script>

<style lang="sass">
#kytos-map
  svg, #svg-topo
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 55;

    rect#click_background
      fill: none;
      pointer-events: all;

    .label
      font-size: 10px;
      pointer-events: none;

      text
        fill: white;
        color: white;
        background-color: #554077;
        -webkit-border-radius: 36px;
        -moz-border-radius: 36px;
        border-radius: 36px;
        font-size: 11px;

    .hide
      display: none;

    line
      stroke: rgba(255, 255, 255, 0.5);

    .node
      cursor: pointer;

    .downlight
      opacity: 0.2;
</style>
