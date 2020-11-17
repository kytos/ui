import Vue from 'vue'
import VueHotkey from 'v-hotkey'
import App from './App.vue'
import {version} from '../package.json';

Vue.use(VueHotkey)

window.$ = window.jQuery = require('jquery');
window.d3 = window.D3 = require('d3');

import KytosToolbarItem from './components/kytos/misc/ToolbarItem.vue';
import KytosToolbar from './components/kytos/napp/Toolbar.vue';
import KytosNappsInfoPanel from './components/kytos/napp/NappsInfoPanel.vue';
import KytosActionMenuItem from './components/kytos/napp/ActionMenuItem.vue';
import KytosMap from './components/kytos/map/Map.vue';
import KytosTopology from './components/kytos/topology/Topology.vue';
import KytosTabs from './components/kytos/tabs/tabs.vue';
import KytosTerminal from './components/kytos/terminal/Terminal.vue';
import KytosLogging from './components/kytos/logging/Logging.vue';
import KytosButton from './components/kytos/inputs/buttons/Button.vue';
import KytosButtonGroup from './components/kytos/inputs/buttons/ButtonGroup.vue';
import KytosDropdown from './components/kytos/inputs/Dropdown.vue';
import KytosContextPanel from './components/kytos/misc/ContextPanel.vue';
import KytosMenubar from './components/kytos/misc/Menubar.vue';
import KytosActionMenu from './components/kytos/misc/ActionMenu.vue';
import KytosInfoPanel from './components/kytos/misc/InfoPanel.vue';
import KytosStatusBar from './components/kytos/misc/StatusBar.vue'
import KytosInput from './components/kytos/inputs/Input.vue';
import KytosTextarea from './components/kytos/inputs/Textarea.vue';
import KytosCheckbox from './components/kytos/inputs/Checkbox.vue';
import MapBoxSettings from './components/kytos/map/MapBoxSettings.vue';

import KytosSelect from './components/kytos/inputs/Select.vue';
import KytosSlider from './components/kytos/inputs/Slider.vue';
import KytosAccordion from './components/kytos/accordion/Accordion.vue';
import KytosAccordionItem from './components/kytos/accordion/AccordionItem.vue';
import KytosPropertyPanel from './components/kytos/ppanel/PropertyPanel.vue';
import KytosPropertyPanelItem from './components/kytos/ppanel/PropertyPanelItem.vue';

import KytosInterface from './components/kytos/switch/Interface.vue';
import KytosFlow from './components/kytos/switch/Flow.vue';

import KytosSwitchRadar from './kytos/switchRadar.vue';
import KytosInterfaceInfo from './kytos/interfaceInfo.vue';

import KytosChartTimeseries from './components/kytos/chart/Timeseries.vue';
import KytosChartRadar from './components/kytos/chart/RadarChart.vue';

import KytosTable from './components/kytos/table/Table.vue';

import KytosNotification from "./components/kytos/misc/Notification.vue";

Vue.component('k-menubar', KytosMenubar);
Vue.component('k-map', KytosMap);
Vue.component('mapbox-settings', MapBoxSettings);
Vue.component('k-topology', KytosTopology);
Vue.component('k-context-panel', KytosContextPanel);
Vue.component('k-tabs', KytosTabs);
Vue.component('k-terminal', KytosTerminal);
Vue.component('k-logging', KytosLogging);
Vue.component('k-button', KytosButton);
Vue.component('k-dropdown', KytosDropdown);
Vue.component('k-button-group', KytosButtonGroup);
Vue.component('k-action-menu', KytosActionMenu);
Vue.component('k-input', KytosInput);
Vue.component('k-textarea', KytosTextarea);
Vue.component('k-checkbox', KytosCheckbox);
Vue.component('k-status-bar', KytosStatusBar);

Vue.component('k-select', KytosSelect)
Vue.component('k-slider', KytosSlider);
Vue.component('k-accordion', KytosAccordion);
Vue.component('k-accordion-item', KytosAccordionItem);
Vue.component('k-property-panel', KytosPropertyPanel);
Vue.component('k-property-panel-item', KytosPropertyPanelItem);
Vue.component('k-info-panel', KytosInfoPanel);
Vue.component('k-toolbar', KytosToolbar);
Vue.component('k-toolbar-item', KytosToolbarItem);
Vue.component('k-action-menu-item', KytosActionMenuItem);
Vue.component('k-napps-info-panel', KytosNappsInfoPanel);

Vue.component('k-interface', KytosInterface);
Vue.component('k-flow', KytosFlow);

Vue.component('k-switch-radar', KytosSwitchRadar);
Vue.component('k-interface-info', KytosInterfaceInfo);

Vue.component('k-chart-timeseries', KytosChartTimeseries)
Vue.component('k-chart-radar', KytosChartRadar)

Vue.component('k-table', KytosTable)
Vue.component('k-notification', KytosNotification)

Vue.filter('humanize_bytes', function (num, precision = 0, suffix = 'bps') {
    num = Number(num);
    if (isNaN(num)) {
      throw new TypeError('Expected a number');
    }

    var neg = num < 0;
    var units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

    if (neg) {
      num = -num;
    }

    if (num < 1) {
      return (neg ? '-' : '') + num + ' ' + suffix;
    }

    var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
    num = (num / Math.pow(1000, exponent)).toFixed(precision) * 1;
    var unit = units[exponent] + suffix;

    return (neg ? '-' : '') + num + ' ' + unit;
});

Vue.prototype.$kytos = new Vue()
Vue.prototype.$kytos_server = window.kytos_server
Vue.prototype.$kytos_server_api =  window.kytos_server_api
Vue.prototype.$kytos_version = version

var kytos = new Vue({
  el: '#app',
  render: h => h(App),
  data () {
    return {
        infoPanelView: undefined
    }
  },
})
