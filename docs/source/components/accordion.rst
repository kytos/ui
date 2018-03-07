Accordion
=========

Accordion
---------

   **Name**: kytos-accordion

   **About**: A GUI widget with a list of items that can be switched between hiding and showing content.

   **Properties**: None.

   **Methods**: None.

   **Example**:

    .. code-block:: html

       <kytos-accordion v-show="activeItem==1">
          <kytos-accordion-item title="Custom Labels">
             <kytos-dropdown title="Switch Labels:" icon="circle-o" :options="switchLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'switch'}}"></kytos-dropdown>
             <kytos-dropdown title="Interface Labels:" icon="plug" :options="interfaceLabels" :event="{name: 'topology-toggle-label', content: {node_type: 'interface'}}"></kytos-dropdown>
          </kytos-accordion-item>

          <kytos-accordion-item title="Background">
             <kytos-button-group>
                <kytos-button tooltip="Map Background" icon="globe"></kytos-button>
                <kytos-button tooltip="Image Background (disabled)" icon="photo" :isDisabled="true"></kytos-button>
                <kytos-button tooltip="No Background" icon="window-close-o"></kytos-button>
             </kytos-button-group>
             <kytos-slider icon="adjust" :initialValue="mapOpacity" :action="emitMapOpacity"></kytos-slider>
          </kytos-accordion-item>
       </kytos-accordion>

   **Image**:

    .. figure:: /_static/imgs/components/accordion/kytos-accordion.png
       :alt: Accordion image.
       :align: center

AccordionItem
--------------

   **Name**: kytos-accordion-item

   **About**: Accordion item that can be switched between hiding and showing content.

   **Properties**: None.

   **Methods**: None.

   **Example**:

    .. code-block:: html

       <kytos-accordion-item title="Background">
          <kytos-button-group>
             <kytos-button tooltip="Map Background" icon="globe"></kytos-button>
             <kytos-button tooltip="Image Background (disabled)" icon="photo" :isDisabled="true"></kytos-button>
             <kytos-button tooltip="No Background" icon="window-close-o"></kytos-button>
          </kytos-button-group>
          <kytos-slider icon="adjust" :initialValue="mapOpacity" :action="emitMapOpacity"></kytos-slider>
       </kytos-accordion-item>

   **Image**:

    .. figure:: /_static/imgs/components/accordion/kytos-accordion-item.png
       :alt: AccordionItem image.
       :align: center
