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

.. .. figure:: /_static/imgs/components/switch/kytos-flow.png
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
