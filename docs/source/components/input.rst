Inputs
======

Button:
-------

**Name**: kytos-button

**About**: This component represents a button that triggers an event when
clicked.

**Properties**: None.

**Methods**:
            on_click: a pointer to a function

**Example**:

.. code-block:: html

   <kytos-button tooltip="Request Circuit" title="Request Circuit" icon="gear" :on_click="request_circuit"></kytos-button>

**Image**:

.. figure:: /_static/imgs/components/input/kytos-button.png
   :alt: Button image.
   :align: center

ButtonGroup
-----------

**Name**: kytos-button-group

**About**: Allows to group buttons (``kytos-button``), which trigger events when clicked.

**Properties**: None.

**Methods**: None.

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

**Properties**:

* placeholder: String.

**Methods**: None.

.. .. figure:: /_static/imgs/components/input/kytos-checkbox.png
   :alt: Checkbox image.
   :align: center

Dropdown
--------

**Name**: kytos-dropdown

**About**: A toggleable menu that allows the user to choose one value from a predefined list.

**Properties**:

* options: Array (required);
* event: Object (required).

**Methods**:

* emitEvent();

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

**Properties**:

* value: String;
* modelValue: String;
* tooltip: String;
* placeholder: String.

**Methods**:

* updateText(value).

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

**Properties**:

* initialValue: Number;
* action: Function(val):val;
* min: Number;
* max: Number;
* step: Number.

**Methods**:

* doRange().

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

**Properties**:

* value: String;
* modelValue: String;
* tooltip: String;
* placeholder: String.

**Methods**:

* updateText(value).

.. .. figure:: /_static/imgs/components/input/kytos-textarea.png
   :alt: Textarea image.
   :align: center
