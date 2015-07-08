$(function() {
  $('.language-swift').closest('.highlight').hide();

  $('.language-objective-c').closest('.highlight').before('<div class="toggle-container"><span class="toggle-label  on">Objective-C</span><div class="flat-toggle"></div><span class="toggle-label last">Swift</span></div>');

  $('.flat-toggle, .toggle-label').on('click', function() {
    $('.flat-toggle, .toggle-label').toggleClass('on');

    var highlightOC = $('.language-objective-c').closest('.highlight');
    var highlightSwift = $('.language-swift').closest('.highlight');

    if ($('.flat-toggle').hasClass('on')) {
      highlightOC.hide();
      highlightSwift.show();
    } else {
      highlightOC.show();
      highlightSwift.hide();
    }
  });

  $('.ios-version').load('https://hokolinks.com/versions/ios', function(data) {} );

  $('.android-version').load('https://hokolinks.com/versions/android', function(data) {} );
});

// $.getJSON( "https://hokolinks.com/versions/ios", function(data) {
//   console.log(data.responseText);
// });
