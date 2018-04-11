Creating a NApp with UI
#######################

Most of the times, it is necessary for a NApp to interact with the user, for
through a graphical interface (not just REST APIs).

We have developed `vue-js` based components (`Vuejs <https://vuejs.org>`_), so
that you, developer, worry as little as possible about interface. Do not worry,
you don't have to understand how `vue-js` works.

In theory, during the construction of your NApp UI you can write any HTML code
that Kytos will render. However, we strongly recommend that you use the
components we have developed. The so-called ``k-*`` components.


NApp Structure with a UI
************************

After create a new NApp (see this `NApp tutorial
<https://tutorials.kytos.io/napps/create_your_napp/>`_) the structure below
will be created.

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
          └── README.rst


To add a new components into the kytos UI you must create a new file following
the pattern ``ui/<section>/<file_name>.kytos``, where **<section>** should be
the section name where the new component will be fixed and the **<file_name>**
should be the component name. You are free to choose any file name here.

Whether you have created a new NApp component into the sections ``k-toolbar``
and ``k-info-panel`` the NApp structure should have the following structure.

.. code-block:: sh

  <username>/
  ├── __init__.py
  └── <napp_name>/
      ├── __init__.py
      ├── kytos.json
      ├── main.py
      ├── README.rst
      ├── settings.py
      └── ui/
          ├── k-info-panel/
          │   └── main.kytos
          ├── k-toolbar/
          │   └── main.kytos
          └── README.rst


When the administrator enables your NApp, Kytos will automatically scan the
``ui/*`` structure to properly export to GUI.

Component Template
******************

The Kytos component should follow some rules:

#. The component file should have the extension ``.kytos``

#. The component file must have 2 sections:

  #. template: This section must be filled with html contents to display your
       graphical component.This section should have a html syntax and you can
       use the Kytos components.
  #. script (optional): This section has javascript code that implements your
       component behaviour.

Below an example of a Kytos component (`ui/k-toolbar/main.kytos`), that will be
displayed on our UI.

.. code-block:: html

    <template>

      <k-toolbar-item icon="desktop" tooltip="My application">
          <k-accordion>
              <k-accordion-item>
              // todo: create a example with some inputs and buttons
              </k-accordion-item>
          </k-accordion>
      </k-toolbar-item>

    </template>

    <script>
    /* All the javascript methods are optional */
    module.exports = {
      methods: {
        // put your javascript methods here
      },
    }
    </script>


You can use any **font-awesome icon**. Kytos ui interface will read that icon
and create a new button into the **k-menu-bar**.
