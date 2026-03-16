window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


function initComparisonSliders() {
  document.querySelectorAll('.comparison-group').forEach(function(group) {
    var container = group.querySelector('.bal-container');
    var input = group.querySelector('.bal-input');
    var overlay = group.querySelector('.bal-overlay');
    var divider = group.querySelector('.bal-divider');
    var baseImg = group.querySelector('.bal-img:not(.bal-overlay)');
    var toggles = group.querySelectorAll('.scene-toggle');

    function update(val) {
      var pct = parseFloat(val);
      overlay.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      divider.style.left = pct + '%';
    }

    input.addEventListener('input', function() {
      update(this.value);
    });

    update(50);

    var select = group.querySelector('.scene-select');
    if (select) {
      select.addEventListener('change', function() {
        var scene = this.value;
        var key = scene.charAt(0).toUpperCase() + scene.slice(1);
        baseImg.src = container.dataset['naruto' + key];
        overlay.src = container.dataset['ours' + key];
        input.value = 50;
        update(50);
      });
    }
  });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    initComparisonSliders();

})
