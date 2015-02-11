# imageLife
HTML:
```
<script src="/imagelife.1.0.js"></script>
<img src="image.jpg" id="image1" />
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
var image_1 = $('#image1').imageLife(config);

// get mousemove position
$(window).mousemove(function(e){
  image_1.start(e);
});
```
