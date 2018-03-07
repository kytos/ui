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

**Components**:

* *icon*: Icon component
