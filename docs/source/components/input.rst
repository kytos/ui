Inputs
======

Button:
-------

**Name**: kytos-button

**About**: This component represents a button that triggers an event when
clicked.

**Mixins**: KytosBaseWithIcon

**Property**:

* action: a pointer to a function

**Example**:

.. code-block:: html

   <kytos-button tooltip="Request Circuit" title="Request Circuit" icon="gear" :action="request_circuit"></kytos-button>

**Image**:

.. figure:: /_static/imgs/components/input/kytos-button.png
   :alt: Button image.
   :align: center

ButtonGroup
-----------

**Name**: kytos-button-group

**About**: Allows to group buttons (``kytos-button``), which trigger events when clicked.

**Mixins**: KytosBase

**Data**:

* buttons: List of `kytos-button`

**Example**:

.. code-block:: html

   <kytos-button-group>
      <kytos-button tooltip="Map Background" icon="globe"></kytos-button>
      <kytos-button tooltip="Image Background (disabled)" icon="photo" :isDisabled="true"></kytos-button>
      <kytos-button tooltip="No Background" icon="window-close-o"></kytos-button>
   </kytos-button-group>

**Image**:

.. figure:: /_static/imgs/components/input/kytos-button-group.png
   :alt:  ButtonGroup image.
   :align: center

Checkbox
--------

**Name**: kytos-check-box

**About**: A GUI widget that permits the user to make a binary choice, checked (ticked) when activated or not checked when disable.

**mixins**: KytosBaseWithIcon

**Properties**:

* value: Value used in the checkbox item
* title: Title of the button
* model: Array filled with all values checked
* action: function trigged when the kytos-check-box is changed, this function
  receive the value added or removed

**Example**:

.. code-block:: html

    <kytos-checkbox title="Line" :model="shapes" value="line" ></kytos-checkbox>
    <kytos-checkbox title="Circle" :model="shapes" value="circle" :checked="true"></kytos-checkbox>
    {{ shapes }}

**Image**:

.. figure:: /_static/imgs/components/input/kytos-checkbox.png
    :alt: Checkbox image.
    :align: center

Dropdown
--------

**Name**: kytos-dropdown

**About**: A toggleable menu that allows the user to choose one value from a predefined list.

**Mixins**: KytosBaseWithIcon

**Properties**:

* options: Array (required), represents all options that can be selected in the
  dropdown button.
* event: Object (required), an object with the properties name and content that
  will be sent when the dropdown button is change. An example is displayed
  below.

.. code-block:: html

  {
   name:"topology",
   content: {nody_type: "switch"}
  }

* action: Function trigged when the kytos-dropdown is changed, that receive an
  event name and a content.
* icon: String representing the awesome icon displayed in the left of title
  button.
* title: String is a text displayed as title button.

**Data**:

* selected: String that represents the name of selected option.

**Example**:

.. code-block:: html

   <kytos-dropdown title="Switch Labels:" icon="circle-o" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></kytos-dropdown>

**Image**:

.. figure:: /_static/imgs/components/input/kytos-dropdown.png
   :alt: Dropdown image.
   :align: center

Input
-----

**Name**: kytos-input

**About**: An input field where the user can enter data.

**Mixins**: KytosBaseWithIcon

**Properties**:

* value: String that represent the begin value of the user input.
* placeholder: String that represents the placeholder input.
* modelValue: String used to reference a input variable
* tooltip: String that appear when the mouse is over the kytos-input button.
* icon: String representing the awesome icon displayed in the left of title
  button.
* title: String is a text displayed as title button.
* action: Function that will be trigger when the kytos-input button value is
  changed

**Example**:

.. code-block:: html

   <kytos-input id="vlan-a-input" title="VLAN A:" tooltip="Vlan id at endpoint A" placeholder="Vlan id" icon="tag"></kytos-input>

**Image**:

.. figure:: /_static/imgs/components/input/kytos-input.png
   :alt: Input image.
   :align: center


Slider
------

**Name**: kytos-slider

**About**: A GUI widget that allows the users specify a numeric value which must be no less than a given value, and no more than another given value.

**Mixins**: KytosBaseWithIcon

**Properties**:

* initialValue: Number that represents the begin value of the slider button
* action: Function that will be trigger when the button value is changed
* min: Number that represents a minimum size of slider bar
* max: Number that represents the maximum size of silder bar
* step: Number that represents the increased or decreased size when the slider
  bar is changed
* icon: String representing the awesome icon displayed in the left of slider
  button.

**Data**:

* value: Interger

**Example**:

.. code-block:: html

   <kytos-slider icon="adjust" :initialValue="mapOpacity" :action="emitMapOpacity"></kytos-slider>

**Image**:

.. figure:: /_static/imgs/components/input/kytos-slider.png
   :alt: Slider image.
   :align: center

Textarea
--------

**Name**: kytos-textarea

**About**: A text input field with multi-line.

**Mixins**: KytosBaseWithIcon

**Properties**:


* value: String that represent the begin value of the user text area.
* modelValue: String used to reference a input variable
* tooltip: String that appear when the mouse is over the kytos-textare button.
* placeholder: String that represents the placeholder input.
* action: function trigged when the kytos-textarea is changed, this function
  receive the value of kytos-textarea


.. .. figure:: /_static/imgs/components/input/kytos-textarea.png
   :alt: Textarea image.
   :align: center
