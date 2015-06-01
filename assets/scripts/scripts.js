$(function() {
  $('.language-swift').closest('.highlight').hide();

  $('.language-objective-c').closest('.highlight').before('<div class="toggle-container"><span class="toggle-label">Swift</span><div class="flat-toggle"></div></div>');

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
})