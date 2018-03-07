NAPP UI
#######


UI Structure
************

To create a new component to your napp , you should create a file in your napp
repository, for example: ``ui/menu-items/main.kytos``. With this file the kytos
core will identify your component and send this to the interface.

``menu-items`` is the position where your component will be fixed.
``main.kytos`` is an example of component file, you can add others files and
the core will use that like your napp component.


List of component positions
===========================

- **menu-items**: the component will be fixed in to the left kytos-menu-bar.

Structure of a Napp Component
*****************************

A component structure is showed below and you can fill that using kytos
components.


.. code-block:: html

   <template>
    <!-- This template tag is optional -->
    <div class="kytos-menu-item"  icon="my_icon" tooltip="Sample Tooltip">
     <kytos-accordion>
      <kytos-accordion-item title="Custom Labels">
       <!-- You could put yours kytos elements here -->
      </kytos-accordion-item>
     </kytos-accordion>
    </div>
   </template>

    <script>
    /* All the javascript methods are optional */
    module.exports = {
      methods: {
        // put your javascript methods here
      },
      data: function(){
        return {
          //put your data here
        }
      }
    }
    </script>

    <style>
      /* This style tag is optional */
      /* You could put your css style here */
    </style>


You should replace the **my_icon** to an **awesome icon**, tha the kytos
interface will find that icon and create a new button into the left of
**kytos-menu-bar**. **kytos-menu-bar**.  You can replace the string **Sample
Tooltip** to show in your **kytos-menu-bar** button.


Sample Components
******************

Status-Component
================

Below we have a ``ui/menu-items/status-component.kytos`` file. This component
was build to request the kytos server and get all napps informations and
display that into the component.


.. code-block:: html

    <template>
     <kytos-context-panel v-if="expanded">
      <kytos-accordion >
        <kytos-accordion-item title="Installed NApps">
          <kytos-property-panel>
            <kytos-property-panel-item v-if="napps"
              v-for="napp in this.napps" :key="napp.name"
              :name="napp.name" :value="napp.version">
            </kytos-property-panel-item>
          </kytos-property-panel>
        </kytos-accordion-item>
      </kytos-accordion>
     </kytos-context-panel>
    </template>
    <script>
    module.exports = {
      methods: {
        update_napps (){
          var self = this
          $.ajax({
            async: true,
            dataType: "json",
            url: this.$kytos_server_api + "kytos/status/v1/napps",
            success: function(data) {
              self.napps = data['napps']
            }
          });
        }
      },
      mounted: function() {
        setTimeout(this.update_napps, 1000);
      },
      data: function(){
        return {
          napps: []
        }
      }
    }
    </script>

List of kytos component
***********************

There is a list of components that can be used to create a napps interface. These components will be presented below organized by categories.

Input
=====

kytos-button
^^^^^^^^^^^^^

Create a button thats trigger an event when clicked.
   
Example:   
  
.. code-block:: html
   
   <kytos-button tooltip="Request Circuit" title="Request Circuit" icon="gear" v-on:click.native="request_circuit()"></kytos-button>

.. figure:: /docs/imgs/components/input/kytos-button.png
   :scale: 50 %
   :alt: Button image.
   :align: center

kytos-button-group
^^^^^^^^^^^^^^^^^^^

Allows to group buttons (``kytos-buttton``), which trigger events when clicked.
   
Example:

.. code-block:: html

   <kytos-button-group>
      <kytos-button tooltip="Map Background" icon="globe"></kytos-button>
      <kytos-button tooltip="Image Background (disabled)" icon="photo" :isDisabled="true"></kytos-button>
      <kytos-button tooltip="No Background" icon="window-close-o"></kytos-button>
   </kytos-button-group>

.. figure:: /docs/imgs/components/input/kytos-button-group.png
   :scale: 50 %
   :alt:  ButtonGroup image.
   :align: center


kytos-checkbox
^^^^^^^^^^^^^^^

A GUI widget that permits the user to make a binary choice, checked (ticked) when activated or not checked when disable.

Properties:

* placeholder: String.

kytos-dropdown
^^^^^^^^^^^^^^^

A toggleable menu that allows the user to choose one value from a predefined list.

Properties:

* options: Array (required);
* event: Object (required).

.. code-block:: html

   <kytos-dropdown title="Switch Labels:" icon="circle-o" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></kytos-dropdown>

.. figure:: /docs/imgs/components/input/kytos-dropdown.png
   :scale: 50 %
   :alt: Dropdown image.
   :align: center

kytos-input
^^^^^^^^^^^^

An input field where the user can enter data.

Properties:

* value: String;
* modelValue: String;
* tooltip: String;
* placeholder: String.

Methods:

* emitEvent().

.. code-block:: html
   
   <kytos-input id="vlan-a-input" title="VLAN A:" tooltip="Vlan id at endpoint A" placeholder="Vlan id" icon="tag"></kytos-input>

.. figure:: /docs/imgs/components/input/kytos-input.png
   :scale: 50 %
   :alt: Input image.
   :align: center

kytos-slider
^^^^^^^^^^^^^

A GUI widget that allows the users specify a numeric value which must be no less than a given value, and no more than another given value.

Properties:

* initialValue: Number;
* action: Function(val):val;
* min: Number;
* max: Number;
* step: Number.

Methods:

* doRange().

.. code-block:: html
   
   <kytos-slider icon="adjust" :initialValue="mapOpacity" :action="emitMapOpacity"></kytos-slider>

.. figure:: /docs/imgs/components/input/kytos-slider.png
   :scale: 50 %
   :alt: Slider image.
   :align: center

kytos-textarea
^^^^^^^^^^^^^^^

A text input field with multi-line.

Properties:

* value: String;
* modelValue: String;
* tooltip: String;
* placeholder: String.

Methods:

* updateText(value).

.. .. figure:: /docs/imgs/components/input/kytos-textarea.png
   :scale: 50 %
   :alt: Textarea image.
   :align: center
..

Accordion
=========

kytos-acoordion
^^^^^^^^^^^^^^^^

A GUI widget with a list of items that can be switched between hiding and showing content.

Example:

.. code-block:: html

   <kytos-accordion v-show="activeItem==1">
      <kytos-accordion-item title="Custom Labels">
         <kytos-dropdown title="Switch Labels:" icon="circle-o" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></kytos-dropdown>
         <kytos-dropdown title="Interface Labels:" icon="plug" :options="interfaceLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'interface'}}"></kytos-dropdown>
      </kytos-accordion-item>

      <kytos-accordion-item title="Background">
         <kytos-button-group>
            <kytos-button tooltip="Map Background" icon="globe"></kytos-button>
            <kytos-button tooltip="Image Background (disabled)" icon="photo" :isDisabled="true"></kytos-button>
            <kytos-button tooltip="No Background" icon="window-close-o"></kytos-button>
         </kytos-button-group>
         <kytos-slider icon="adjust" :initialValue="mapOpacity" :action="emitMapOpacity"></kytos-slider>
      </kytos-accordion-item>
   </kytos-accordion>


.. figure:: /docs/imgs/components/accordion/kytos-accordion.png
   :scale: 50 %
   :alt: Accordion image.
   :align: center

kytos-accordion-item
^^^^^^^^^^^^^^^^^^^^^

Accordion item that can be switched between hiding and showing content.

Example:

.. code-block:: html

   <kytos-accordion-item title="Background">
      <kytos-button-group>
         <kytos-button tooltip="Map Background" icon="globe"></kytos-button>
         <kytos-button tooltip="Image Background (disabled)" icon="photo" :isDisabled="true"></kytos-button>
         <kytos-button tooltip="No Background" icon="window-close-o"></kytos-button>
      </kytos-button-group>
      <kytos-slider icon="adjust" :initialValue="mapOpacity" :action="emitMapOpacity"></kytos-slider>
   </kytos-accordion-item>

.. figure:: /docs/imgs/components/accordion/kytos-accordion-item.png
   :scale: 50 %
   :alt: AccordionItem image.
   :align: center


.. Misc
.. ====

.. kytos-action-menu
.. ^^^^^^^^^^^^^^^^^^

.. Menu with a list of actions. Can be shown or hidden using the *Ctrl+Space* shortcut.
 
.. Methods:

.. * toggle();
.. * hide();
.. * show_info_panel(content).

.. .. code-block:: html

.. .. figure:: /docs/imgs/components/misc/kytos-action-menu.png
   :scale: 50 %
   :alt: ActionMenu image.
   :align: center
..

Property Panel
==============

kytos-property-panel
^^^^^^^^^^^^^^^^^^^^^

This component allows to create a table with two columns (*name* and *value*). Each row in the table is a ``kytos-property-panel-item`` component, with the *value* and *name*.

Properties:

* options: Array (required) -- asdasdasd;
* event: Object (required).

Example:

.. code-block:: html

   <kytos-property-panel>
      <kytos-property-panel-item :name="napp.name" :value="napp.version"  v-if="napps" v-for="napp in this.napps" :key="napp.name"></kytos-property-panel-item>
   </kytos-property-panel>

.. figure:: /docs/imgs/components/ppanel/kytos-property-panel.png
   :scale: 50 %
   :alt: PropertyPanel image.
   :align: center


kytos-property-panel-item
^^^^^^^^^^^^^^^^^^^^^^^^^^

Property Panel item that can be edited.

Properties:

* name: String (required);
* value: [String, Number] (required).

Example:

.. code-block:: html

   <kytos-property-panel-item :name="napp.name" :value="napp.version"  v-if="napps" v-for="napp in this.napps" :key="napp.name"></kytos-property-panel-item>
  
.. figure:: /docs/imgs/components/ppanel/kytos-property-panel-item.png
   :scale: 50 %
   :alt: PropertyPanelItem image.
   :align: center

