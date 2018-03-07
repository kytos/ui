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

.. figure:: /_static/imgs/components/misc/kytos-action-menu.png
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

.. figure:: /_static/imgs/components/misc/kytos-info-panel.png
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

.. figure:: /_static/imgs/components/misc/kytos-status-bar.png
   :scale: 50 %
   :alt: StatusBar image.
   :align: center
