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


  // ----------------------------------------
  // Search component using twitter typeahead
  // ----------------------------------------

  // Instantiate the bloodhound suggestion engine
  var engine = new Bloodhound({
    datumTokenizer: function (datum) {
      var a = Bloodhound.tokenizers.whitespace(datum.title),
          b = Bloodhound.tokenizers.whitespace(datum.description);
          c = Bloodhound.tokenizers.whitespace(datum.category);

      return a.concat(b).concat(c);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
      url: "/search.json",
      filter: function (data) {
        return $.map(data, function (data) {
          return {
            title: data.title,
            category: data.category,
            description: data.description,
            url: data.url
          };
        });
      }
    }
  });

  // Initialize the bloodhound suggestion engine
  engine.initialize();

  // Instantiate the typeahead UI
  $('#prefetch .typeahead').typeahead(
    {
      hint: true,
      highlight: true,
      minLength: 2
    },
    {
      name: 'engine',
      ttl_ms: 1,
      limit: 8,
      displayKey: 'title',
      source: engine.ttAdapter(),
      templates: {
        empty: [
          '<div class="tt-empty">',
            'No results found',
          '</div>'
        ].join('\n'),
        suggestion: function(data) {
          var hasCategory = function() {
            return data.category ? 'show' : 'hide';
          };

          var category = function() {
            if (data.category === 'ios') {
              return 'iOS';
            } else {
              return data.category;
            }
          };

          return '<p class="' + hasCategory() + '">' + data.title + ' - <span class="category-name">' + category() + '</span></p>';
        }
      }
    }).bind('typeahead:selected', function (obj, datum) {
      window.location.href = datum.url;
    });

    // Clear the prefetched search.json from localStorage
    window.localStorage.clear();

});
