Base
====

These components contain the base options of each component, such as methods and
properties. The other kytos components are mixins of kytos base componentes,
that can contain any base component options. When a component uses a mixin, all
options in the mixin will be “mixed” into the component’s own options, that is a
way to distribute reusable functionalities to the components.

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

**Components**:

* *icon*: Icon component

.. note:: `KytosBaseWithIcon` mixins `KytosBase`. If a component mixins
          `KytosBaseWithIcon`,
          this component will reuse all the functionality of both base
          components.
