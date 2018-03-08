Property Panel
==============

PropertyPanel
-------------

**Name**: kytos-property-panel

**About**: This component allows to create a table with two columns ( *name* and *value*). Each row in the table is a ``kytos-property-panel-item`` component, with the *value* and *name*.

**Properties**: None.

**Methods**: None.

**Example**:

.. code-block:: html

   <kytos-property-panel>
      <kytos-property-panel-item :name="napp.name" :value="napp.version"  v-if="napps" v-for="napp in this.napps" :key="napp.name"></kytos-property-panel-item>
   </kytos-property-panel>

**Image**:

.. figure:: /_static/imgs/components/ppanel/kytos-property-panel.png
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

**Example**:

.. code-block:: html

   <kytos-property-panel-item :name="napp.name" :value="napp.version"  v-if="napps" v-for="napp in this.napps" :key="napp.name"></kytos-property-panel-item>

**Image**:

.. figure:: /_static/imgs/components/ppanel/kytos-property-panel-item.png
   :alt: PropertyPanelItem image.
   :align: center
