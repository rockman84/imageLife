# imageLife <a href="">v 1.1</a>
Jquery Plugin for Image Life Interaction with mouse


## Usage
HTML:
```
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="/imagelife.1.0.js"></script>
<img src="image.jpg" id="imagelife" />
```

Javascript:
```
// set image location
var config = {
  center   : 'center.jpg',
  north    : 'north.jpg',
  northeast: 'norteast.jpg',
  east     : 'east.jpg',
  southeast: 'southeast.jpg',
  south    : 'south.jpg',
  southwest: 'southwest.jpg',
  west     : 'west.jpg',
  northwest: 'northwest.jpg',
  click    : 'click.jpg'
};

// set object
var image = $('#imagelife').imageLife(config);

// get mousemove position
$(window).mousemove(function(e){
  image.start(e);
});
```
## Option
- center: string - image location for center position
- north: string - image location for north position
- northeast: string - image location for north east position
- east: string - image location for east position
- southeast: string - image location for south east position
- south: string - image location for south position
- southwest: string - image location for south west position
- west: string - image location for west position
- northwest: string - image location for north west position
- click: string - image location for click position
- img_type: string - default file type
- adj_top: number - top adjustment for event position
- adj_right: number - right adjustment for event position
- adj_bottom: number - bottom adjustment for event position
- adj_left: number - left adjustment for event position
- debug_color: string | hex number - color for debug mode
 
## Method
### option()
```
image.option({
  center: 'path/center.jpg',
  north: 'path/center.jpg',
  //....
});
```
- Param Object

### getDirection()
```
$(window).mousemove(function(e){
  image.getDirection(e);
});
```
- Param Object (Require) MouseEvent
- Return String | Event

### getOffset()
```
image.getOffset();
```
- Return Object

### getDimension()
```
image.getDimension();
```
- Return Object

### debug()
```
$(window).mousemove(function(e){
  image.debug();
});
```

## Event
Example:
```
var a = $('#imagelife').imageLife();
a.on('center',function(){
  alert('Hi... Mouse was center');
});
```
Event List:
- center
- north
- northeast
- east
- southeast
- south
- southwest
- west
- northwest
- click

#About the Author
Hi my name is Hansen Wong, i'm programming and designer based in Indonesia

I started this project to deepen my understanding of javascript

<a href="http://www.rockbeat.web.id/about">Rockbeat</a>
