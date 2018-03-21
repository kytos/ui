Create new UI Component
#######################

Sometimes, it is necessary for a Napp to interact with the user, for
through a graphical interface (not just API REST).

We have developed `vue-js` based components (`Vuejs <https://vuejs.org>`_), so
that you, developer, worry as little as possible about interface.

In theory, you can during the construction of your NAPP UI, write any HTML code
that Kytos will render. However, we strongly recommend that you use the
components we have developed. The so-called ``k- *`` components.


Napp Structure with a UI
************************

After create a new NApp (see this `NApp tutorial
<https://tutorials.kytos.io/napps/create_your_napp/>`_ the structure below will
be created.

.. code-block:: sh

  <username>
  ├── __init__.py
  └── <napp_name>/
      ├── __init__.py
      ├── kytos.json
      ├── main.py
      ├── README.rst
      ├── settings.py
      └── ui/
          ├── k-info-panel/
          ├── k-toolbar/
          └── README


To add a new components into the kytos UI you must create a new file following
the pattern ``ui/<section>/<file_name>.kytos``, where **<section>** should be
the section name where the new component will be fixed and the **<file_name>**
should be the component name.

Whether I have created a new napp component into the sections ``k-toolbar`` and
``k-info-panel`` the napp structure should have the following structure.

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
          ├── k-info-panel
          │   └── main.kytos
          ├── k-toolbar
          │   └── main.kytos
          └── README


When the administrator enables their NApp, Kytos will automatically scan the
`ui/*` structure to properly export to GUI.

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
