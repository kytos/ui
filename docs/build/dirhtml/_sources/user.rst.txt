User Guide
##########

.. include:: common.rst

Create new UI Component
***********************

Napp Structure
==============

After create a new napp following the `tutorial
<https://tutorials.kytos.io/napps/create_your_napp/>`_ steps the structure
below will be created.

.. code-block:: sh

  <username>
  ├── __init__.py
  └── <napp_name>
      ├── __init__.py
      ├── kytos.json
      ├── main.py
      ├── README.rst
      └── settings.py


To add a new components into the kytos UI you must create a new file following
the pattern ``ui/<section>/<file_name>.kytos``, where **<section>** should be
the section name where the new component will be fixed and the **<file_name>**
should be the component name.

Whether I have created a new napp component into the sections ``kytos-toolbar``
and ``kytos-info-panel`` the napp structure should have the following
structure.

.. code-block:: sh

  <username>
  ├── __init__.py
  └── <napp_name>
      ├── __init__.py
      ├── kytos.json
      ├── main.py
      ├── README.rst
      ├── settings.py
      └── ui
          ├── kytos-info-panel
          │   └── main.kytos
          └── kytos-toolbar
              └── main.kytos


Napp Components Registered
==========================

All napps created following the `Napp Structure`_  the kytos core is able to
track all napp components and create endpoints to all napps loaded. All kytos
core endpoint to list the components is listed below.

To list all components from all sections you can request the kytos core with
``ui/all``:

.. code-block:: json

  [
    {
      "name": "kytos-status-main",
      "url": "ui/kytos/status/kytos-toolbar/main.kytos"
    },
    {
      "name": "kytos-mef_eline-main",
      "url": "ui/kytos/mef_eline/kytos-toolbar/main.kytos"
    }
  ]


To list all components from a specific section, you can request the kytos core
with ``ui/kytos-toolbar`` to get all components from section kytos-toolbar:

.. code-block:: json

  [
    {
      "name": "kytos-status-main",
      "url": "ui/kytos/status/kytos-toolbar/main.kytos"
    },
    {
      "name": "kytos-status-main",
      "url": "ui/kytos/status/kytos-info-panel/main.kytos"
    },
    {
      "name": "kytos-mef_eline-main",
      "url": "ui/kytos/mef_eline/kytos-toolbar/main.kytos"
    }
  ]


Component Template
******************

The kytos component should follow some rules.

#. The component file should have the extention ``.kytos``

#. The component file need to have 3 sections:

  #. template: This section must be filled with html contents to display your graphical component.This section should have a html syntax and you can use the kytos componenets.
  #. script : This section must be filled with section using javascript.This section is required to handle your component actions.
  #. style (optional): section using css styles, this section is optional because all kytos components have the styles already defined.

Below a template of kytos component is displayed.

.. code-block:: html

   <template>
    <!-- This template tag is optional -->
    <div class="kytos-menu-item"  icon="my_icon" tooltip="Sample Tooltip">
       <!-- You could put yours kytos components here -->
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


You should replace the **my_icon** to an **awesome icon**, the kytos interface
will read that icon and create a new button into the **kytos-menu-bar**.  You
can replace the string **Sample Tooltip** to display a tooltip in your
**kytos-menu-bar** button.


Sample Component
****************

Status-Component
================

Below we have a ``ui/kytos-toolbar/status-component.kytos`` file. This
component was build to request the kytos server and get all napps informations
and display that into the component.

.. code-block:: html

    <template>
     <kytos-context-panel v-if="expanded">
      <kytos-accordion >
        <kytos-accordion-item title="Installed NApps">
          <kytos-property-panel>
            <kytos-property-panel-item v-if="napps"
              v-for="napp in this.napps" :key="napp.name" :name="napp.name" :value="napp.version">
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


Napps components can use only specific kytos components. Below we have a list
of kytos ui components organized by categories:

#. Inputs
#. Accordion
#. Property Panel

.. include:: ./components/input.rst
.. include:: ./components/accordion.rst
.. include:: ./components/property-panel.rst
