(function() {
  'use strict';
  function rating(el, currentRating, maxRating, callback, size, color, fixed) {
    var stars = [];
    (function init() {
	  if (size == null) size = 18;
	  if (color == null) color = '#FAB400';
	  if (fixed == null) fixed = false;
      if (!el) { throw Error('No element supplied.'); }
      if (!maxRating) { throw Error('No max rating supplied.'); }
      if (!currentRating) { currentRating = 0; }
      if (currentRating < 0 || currentRating > maxRating) { throw Error('Current rating is out of bounds.'); }
	  el.style.cssText += 'list-style: none; margin: 0; padding: 0;';
      for (var i = 0; i < maxRating; i++) {
        var star = document.createElement('li');
        star.classList.add('c-rating__item');
		star.style.cssText = '-webkit-box-flex: 0; cursor: pointer; overflow: hidden; display: inline-block;';
        star.setAttribute('data-index', i);
		star.style.height = size + 'px';
		star.style.width = size + 'px';
		star.style.webkitFlex = '0 0 ' + size + 'px';
		star.style.msFlex = '0 0 ' + size + 'px';
		star.style.flex = '0 0 ' + size + 'px';
		star.innerHTML = getSVG(size);
		setActive(star, i < currentRating);
        el.appendChild(star);
        stars.push(star);
        if(!fixed) attachStarEvents(star);
      }
    })();
	function setActive(star, value) {
		if (value) star.childNodes[0].style.marginLeft = '-' + size + 'px';
		else star.childNodes[0].style.marginLeft = '0';
	}
	function getSVG(size) {
		return `<svg xmlns="http://www.w3.org/2000/svg" width="` + (size * 2) + `" height="` + size + `" viewBox="0 0 48 24"><path fill="` + color + `" d="M45.13 8.978l-5.508-.52c-.348-.033-.646-.252-.79-.583l-1.97-4.783c-.317-.79-1.44-.79-1.752 0l-1.957 4.783c-.13.332-.444.553-.79.584l-5.51.518c-.82.078-1.15 1.106-.535 1.66l4.147 3.645c.27.232.38.582.302.93l-1.245 5.11c-.19.808.678 1.47 1.405 1.042l4.592-2.697c.296-.174.664-.174.96 0l4.592 2.697c.73.427 1.597-.222 1.405-1.04l-1.23-5.112c-.08-.348.034-.695.302-.932l4.146-3.645c.602-.55.254-1.578-.566-1.657zM11.986 3.593l1.93 4.68c.286.66.903 1.114 1.613 1.183l5.433.494-4.076 3.583c-.538.476-.773 1.205-.612 1.916l1.23 5.012-4.518-2.654c-.298-.176-.64-.268-.986-.268s-.687.092-.986.268l-4.49 2.638 1.22-5.01c.16-.707-.08-1.44-.618-1.9l-4.06-3.57 5.388-.508c.73-.066 1.37-.544 1.625-1.2l1.906-4.665m0-1.093c-.36 0-.72.197-.875.592L9.155 7.875c-.13.332-.445.553-.79.584l-5.51.518c-.82.078-1.15 1.106-.535 1.66l4.146 3.645c.27.232.38.582.302.93l-1.245 5.11c-.15.633.35 1.177.925 1.177.16 0 .323-.042.48-.135l4.592-2.697c.148-.087.315-.13.48-.13s.333.043.48.13l4.593 2.697c.16.094.325.135.485.135.572 0 1.07-.535.92-1.175l-1.23-5.112c-.08-.348.034-.695.302-.932l4.147-3.645c.602-.55.254-1.578-.566-1.657l-5.507-.52c-.348-.033-.646-.252-.79-.583l-1.97-4.783c-.16-.395-.52-.592-.878-.592z"/></svg>`;
	}
    function iterate(collection, callback) {
      for (var i = 0; i < collection.length; i++) {
        var item = collection[i];
        callback(item, i);
      }
    }
    function attachStarEvents(star) {
      starMouseOver(star);
      starMouseOut(star);
      starClick(star);
    }
    function starMouseOver(star) {
      star.addEventListener('mouseover', function(e) {
        iterate(stars, function(item, index) {
		  setActive(item, index <= parseInt(star.getAttribute('data-index')));
        });
      });
    }
    function starMouseOut(star) {
      star.addEventListener('mouseout', function(e) {
        if (stars.indexOf(e.relatedTarget) === -1) {
          setRating(null, false);
        }
      });
    }
    function starClick(star) {
      star.addEventListener('click', function(e) {
        e.preventDefault();
        setRating(parseInt(star.getAttribute('data-index')) + 1, true);
      });
    }
    function setRating(value, doCallback) {
      if (value && value < 0 || value > maxRating) { return; }
      if (doCallback === undefined) { doCallback = true; }

      currentRating = value || currentRating;

      iterate(stars, function(star, index) {
		setActive(star, index < currentRating);
      });

      if (callback && doCallback) { callback(getRating()); }
    }
    function getRating() {
      return currentRating;
    }
    return {
      setRating: setRating,
      getRating: getRating
    };

  }
  window.rating = rating;
})();
