Overview
********

The Kytos UI (Kytos User Interface) is a graphical user interface to handle a
kytos instance.  With this interface you can show the topology, list all
installed napps, see the kytos logs, send flows to switch, etc.

.. figure:: _static/imgs/kytos-ui.png
   :scale: 50 %
   :alt: Kytos Graphical User Interface
   :align: center

   Kytos Graphical User Interface

Kytos UI Sections
*****************

The following images we have the kytos ui sections.

.. figure:: _static/imgs/kytos-ui-parts.png
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

