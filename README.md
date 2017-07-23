# CenterElements

A JavaScript library that allows you to easyly center vertivaly html elements.

### Prerequisites

```
jQuery verion 3.2.1+
```

The library should also work well with previous versions of jQuery, but it has not been tested.

### Installing

Include the `jQuery` library `before` adding the `CenterElements` library.

```
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
```

Then `add` downloaded version of `CenterElements` library.

```
<script src="CenterElements.js"></script>
```

### Usage

Destination element can be provided as a *first* argument.
Options can be send as a *second* argument *(in object)* in the *constructor*.

Basic call can be achieved by typing in a `<script>` section or `.js` file:

```
var example_1 = new CenterElements(".center_group_1");
```

Automatically resizing elements on browser resize, can be reached by calling of `reload` method.

```
$(window).resize(() => example_1.reload());
```

##### Options description

| Name                      	| Type    	| Accepted values             	| Default    	| Description                                                                                                                                                      	|
|---------------------------	|---------	|-----------------------------	|------------	|------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| **mode**                  	| String  	| **"padding"** <br>**"margin"**  	| "padding"  	| How elements will be centred.                                                                                                                                    	|
| **reference**             	| String  	| **"relative"** <br>**"parent"** 	| "relative" 	| What is the reference to centering.  - "relative" means relative to other elements in the array.  - "parent" means each element independently inside its parent. 	|
| **ignore_parent_padding** 	| Boolean 	| **true** <br>**false**          	| true       	| Decide if padding of parent also should be considered in calculations.  - Works only for reference="parent".                                                     	|
| **allow_negative_margin** 	| Boolean 	| **true** <br>**false**          	| false      	| Decide if negative margins are allowed.                                                                                                                          	|
| **from_top**              	| Number  	| **(-inf., inf.)**           	| 0          	| Additional margin or padding (same as mode option) to add from top.                                                                                              	|
| **from_bottom**           	| Number  	| **(-inf., inf.)**           	| 0          	| Additional margin or padding (same as mode option) to add from bottom.                                                                                           	|                                                                               	|

**For more examples, see the [example.html](example.html) file.**

### Known issues

* Method `reload` is NOT called automaticly on jQuery `resize` event.
* Elements will not recenter themselves when their content had changed dynamicly. Method `reload` has to be called manualy.
* While there is `margin` set for the elements, and the `mode` is also set to `margin` - the original one will be ignored. The same situation occurs for `padding`.

#### Versioning and changelog

* v. 1.0
    - Creation of project and developing basic functions. 
    - Added basic options support. 

#### Authors

* **Piotr Bartela** - *Creator* - [wallet616](https://github.com/wallet616)

#### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.