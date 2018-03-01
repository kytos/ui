Kytos UI
########


Overview
********

The Kytos UI (Kytos User Interface) is a graphical user interface to handle a
kytos instance.  With this interface you can show the topology, list all
installed napps, see the kytos logs, send flows to switch, etc.

.. figure:: ./imgs/kytos-ui.png
   :scale: 50 %
   :alt: Kytos Graphical User Interface
   :align: center

   Kytos Graphical User Interface

Kytos UI Parts
**************

The following images we have the kytos ui parts.

.. figure:: ./imgs/kytos-ui-parts.png
   :scale: 50 %
   :alt: Kytos Graphical User Interface
   :align: center



kytos-menu-bar
==============

This kytos component contains the kytos logo and a list of itens to change
the kytos-toobar content.

#. **Kytos-Logo**: When pressed the kytos-toolbar will switch between expandeded and compacted version.
#. **Item**: Change the kytos-toolbar context to display the napps component.


kytos-toolbar
==============

The kytos-menu-bar component contains the current activated kytos-menu-bar item.If the
kytos-logo is in the expanded version the kytos-toolbar will change to expanded
version, otherwise if the kytos-logo is in compacted version the kytos-toolbar
will change to compacted version. This component is responsible to load all
napps components and register this into the kytos-menu-bar itens.



.. note:: Only components with compacted version will be displayed in to the
          kytos-toolbar in compacted version. Kytos-toolbar doesn't will be
          displayed if doesn't have kytos-components in compacted version.

kytos-map
=========

The kytos-map component is responsible to display a map and render the network
topology will all hosts and switch connected.


kytos-info-panel
================

The kytos-info-panel component is responsible to show specific informations of
the selected component or specific action activated. If you try to press
ctrl+space a list of actions will appear at the center of kytos-ui.


kytos-tabs
==========

The kytos-tabs components is responsible to have a terminal,
show switch informations, logs of kytos instance and kytos ui alerts.


List of Kytos UI Components
***************************

The following list shows the Kytos UI Components organized by categories:

#. Inputs
#. Accordion
#. Misc
#. Property Panel
#. Switch
#. Interface
#. Base
#. Chart
#. Map
#. Terminal
#. Topology


Inputs
======

Button:
-------

   **Name**: kytos-button

   **About**: This component represents a button that triggers an event when
   clicked.

   **Properties**: None.

   **Methods**: None.

.. figure:: ./imgs/components/input/kytos-button.png
   :scale: 50 %
   :alt: Button image.
   :align: center


ButtonGroup
-----------

   **Name**: kytos-button-group

   **About**: Allows to group buttons, which trigger events when clicked.

   **Properties**: None.

   **Methods**: None.

.. figure:: ./imgs/components/input/kytos-button-group.png
   :scale: 50 %
   :alt:  ButtonGroup image.
   :align: center


Checkbox
--------

   **Name**: kytos-check-box

   **About**: A GUI widget that permits the user to make a binary choice, checked (ticked) when activated or not checked when disable.

   **Properties**:

      * placeholder: String.

   **Methods**: None.

.. .. figure:: ./imgs/components/input/kytos-checkbox.png
   :scale: 50 %
   :alt: Checkbox image.
   :align: center

.. Example:


Dropdown
--------

   **Name**: kytos-dropdown

   **About**: A toggleable menu that allows the user to choose one value from a predefined list.

   **Properties**:

      * options: Array (required);
      * event: Object (required).

   **Methods**:

      * emitEvent();

.. figure:: ./imgs/components/input/kytos-dropdown.png
   :scale: 50 %
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

.. figure:: ./imgs/components/input/kytos-input.png
   :scale: 50 %
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

.. figure:: ./imgs/components/input/kytos-slider.png
   :scale: 50 %
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

.. .. figure:: ./imgs/components/input/kytos-textarea.png
   :scale: 50 %
   :alt: Textarea image.
   :align: center


Accordion
=========

Accordion
---------

   **Name**: kytos-accordion

   **About**: A GUI widget with a list of items that can be switched between hiding and showing content.

   **Properties**: None.

   **Methods**: None.

.. figure:: ./imgs/components/accordion/kytos-accordion.png
   :scale: 50 %
   :alt: Accordion image.
   :align: center

AccordionItem
--------------

   **Name**: kytos-accordion-item

   **About**: Accordion item that can be switched between hiding and showing content.

   **Properties**: None.

   **Methods**: None.

.. figure:: ./imgs/components/accordion/kytos-accordion-item.png
   :scale: 50 %
   :alt: AccordionItem image.
   :align: center

Misc
====

ActionMenu
----------

   **Name**: kytos-action-menu

   **About**: Menu with a list of actions. Can be shown or hidden using the *Ctrl+Space* shortcut.

   **Properties**: None.

   **Methods**:

      * toggle();
      * hide();
      * show_info_panel(content).

.. figure:: ./imgs/components/misc/kytos-action-menu.png
   :scale: 50 %
   :alt: ActionMenu image.
   :align: center

InfoPanel
---------

   **Name**: kytos-info-panel

   **About**: Shows details about selected kytos components. The panel can be shown or hidden using the shortcut *Ctrl+Alt+Space*.

   **Properties**:

      * subtitle: String.

   **Methods**:

      * toggle();
      * hide();
      * show(content);
      * register_listeners().

.. figure:: ./imgs/components/misc/kytos-info-panel.png
   :scale: 50 %
   :alt: infopanel image.
   :align: center

StatusBar
---------

   **Name**: kytos-status-bar

   **About**: A tabbed bar such as a Terminal, Switches, Logging, Notifications and System Information.

   **Properties**: None.

   **Methods**:

      * display_messages();
      * get_terminal();
      * set_status(message, error=false);
      * register_listeners().

.. figure:: ./imgs/components/misc/kytos-status-bar.png
   :scale: 50 %
   :alt: StatusBar image.
   :align: center

Property Panel
==============

PropertyPanel
-------------

   **Name**: kytos-property-panel

   **About**: This component allows to create a table with two columns ( *name* and *value*). Each row in the table is a ``kytos-property-panel-item`` component, with the *value* and *name*.

   **Properties**: None.

   **Methods**: None.

    .. figure:: ./imgs/components/ppanel/kytos-property-panel.png
       :scale: 50 %
       :alt: PropertyPanel image.
       :align: center

PropertyPanelItem
-----------------

   **Name**: kytos-property-panel-item

   **About**: This component create a row in the table (``kytos-property-panel``) with two columns, *name* and *value*.

   **Properties**:

      * name: String (required);
      * value: [String, Number] (required).

   **Methods**: None.

.. figure:: ./imgs/components/ppanel/kytos-property-panel-item.png
   :scale: 50 %
   :alt: PropertyPanelItem image.
   :align: center

Switch
======

Flow
----

   **Name**: kytos-flow

   **About**: Representation of flows between interfaces.

   **Properties**:

      * content: Object (required).

   **Methods**:

      * get_plot_selector();
      * update_chart().

.. .. figure:: ./imgs/components/switch/kytos-flow.png
   :scale: 50 %
   :alt: Flow image.
   :align: center

Interface
---------

   **Name**: kytos-interface

   **About**: Representation of the interfaces (hardware) used.

   **Properties**:

         * name: String (required);
         * mac: String (required);
         * speed: Number;
         * port_number: Number (required);

         * interface_id: String (required).

   **Methods**:
      * open_interface();
      * parseInterfaceData (data);
      * update_chart();


Base
====

KytosBase
----------
   **Name**: KytosBase

   **About**: A base components used by kytos.

   **Properties**:
      * *title*: String
      * *tooltip*: String
      * *isDisabled*: Boolean (**default**: False)
   **Methods**:
      * *uuid4*: return a ID following the format: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`

   **data**:
      * *id*: String

KytosBaseWithIcon
-----------------

   **Name**: KytosBaseWithIcon

   **mixins**: KytosBase

   **About**: A base components used by kytos, with icon in property.

   **Properties**:
      * *icon*: String

   **Components**
      * *icon*: Icon component

Chart
=====
    * `RadarChart`:
    * `Timeseries`:

Logging
=======
    * `Logging-Utils`:
    * `Logging`:

Map
===
    * `Map`:

Terminal
========
    * `Terminal`:

Topology
========
    * `ContextPanel`:
    * `Menubar`:
    * `Toolbar`:
