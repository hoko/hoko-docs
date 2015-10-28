$(function() {
  $('.language-swift').closest('.highlight').hide();

  $('.language-objective-c').closest('.highlight').before('<div class="toggle-container"><span class="toggle-label on">Objective-C</span><div class="flat-toggle"></div><span class="toggle-label last">Swift</span></div>');

  $('.flat-toggle, .toggle-label').on('click', function() {
    var highlightOC = $('.language-objective-c').closest('.highlight');
    var highlightSwift = $('.language-swift').closest('.highlight');

    $('.flat-toggle, .toggle-label').toggleClass('on');

    if ($('.flat-toggle').hasClass('on')) {
      highlightOC.hide();
      highlightSwift.show();
    } else {
      highlightOC.show();
      highlightSwift.hide();
    }
  });

  // Get latest version from iOS SDK and update wherever needed
  $('.ios-version').load('https://hokolinks.com/versions/ios', function(data) {} );

  // Get latest version from Android SDK and update wherever needed
  $('.android-version').load('https://hokolinks.com/versions/android', function(data) {
    var av = $('.android-version:first').text();
    $('#aar-download').attr("href", 'https://oss.sonatype.org/service/local/repositories/releases/content/com/hokolinks/hoko/' + av +'/hoko-' + av +'.aar');
  } );

  // Add anchor link to each h2 & h3 heading
  $('h3, h2').each(function() {
    var id = $(this).attr('id');
    var anchor = '<a href="#' + id + '" class="anchor"><span class="octicon octicon-link"></span></a>';
    $(this).prepend(anchor);
  });

  $('#search-input').focus(function() {
    $('#search-results').show();
  });

  $(document).click(function(e){
      // Check if click was not triggered on or within .modal-dialog
      if ($(e.target).closest('#search-results, #search-input').length > 0) {
        $('#search-results').show();
      } else {
        $('#search-results').hide();
      }
  });

  var $listItems = $('.search-result');

$('input').keydown(function(e)
{
    var key = e.keyCode,
        $selected = $listItems.filter('.selected'),
        $current;

    if ( key != 40 && key != 38 ) return;

    $listItems.removeClass('selected');

    if ( key == 40 ) // Down key
    {
        if ( ! $selected.length || $selected.is(':last-child') ) {
            $current = $listItems.eq(0);
        }
        else {
            $current = $selected.next();
        }
    }
    else if ( key == 38 ) // Up key
    {
        if ( ! $selected.length || $selected.is(':first-child') ) {
            $current = $listItems.last();
        }
        else {
            $current = $selected.prev();
        }
    }

    $current.addClass('selected');
});
});
