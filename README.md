create rating element in html, get value, set size, set color, set if rate value is fixed

example >
```
attributes >
value: int(0-max)
max: int(no of star)
callback
star size in pixel
color: string
fixed: bool

optional > callback, size, color, fixed
default > size: 18, color: #FAB400, fixed: false
```
```
var myRating = rating(element, 2, 5, null, 56, 'blue', true);
var myRating = rating(element, 0, 5, function(value){alert(value);}, 18, '#555555', true);
var myRating = rating(element, 0, 5, function(value){alert(value);});
var myRating = rating(element, 0, 5);

myRating.setRating(value, callback);
value = myRating.getRating();
```
___
```
<html>
<head>
  <script src="rating.js"></script>
</head>
<body>
	<div id="rate1" style="display: inline-block"></div>
	<div id="rate2" style="display: inline-block"></div>
	<div id="rate3"></div>
	<script>
		var rate1 = document.querySelector('#rate1');
		var rate2 = document.querySelector('#rate2');
		var rate3 = document.querySelector('#rate3');
		
		// value: 2, max: 5, callback: null, star size in pixel, color: blue, fixed: true
		var myRating = rating(rate1, 2, 5, null, 56, 'blue', true);
		// value: 5, max: 10, callback: function, star size in pixel, color: green, fixed: false
		var myRating = rating(rate2, 5, 10, function(value){
			alert(value);
		}, 24, 'green');
		callback = function(value){
			alert(value);
		}
		// value: 1, max: 5, callback: function, star size in pixel, color: default, fixed: false
		rating(rate3, 1, 5, callback);
	</script>
</body>
</html>
```
