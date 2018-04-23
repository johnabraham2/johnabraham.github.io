/*
   Scroll to top button functionality
   ========================================================================== */

$(document).ready(function() {
  $(window).scroll(function() {
      if ($(this).scrollTop() >= 100) {
          $('.scroll-top').show();
      } else {
          $('.scroll-top').hide();
      }
  });
  $('.scroll-top').click(function() {
      $('body,html').animate({scrollTop : 0}, 500);
  });
});

/*
   Tag lookup results page
   ========================================================================== */

$(document).ready(function() {
  /* Set header dynamically with query param */
  var query = getParameterByName('tag');
  $('#search-results-header').append('\"'+query+'\"');

  function getParameterByName(name) {
      url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /* Populate search results */
  for (i=1; i<=$('.search-results-article').length; i++) {
    var articleId = '#search-results-article-'+i;
    var articleTags = getArticleTags(i);
    if ( articleTags.includes(query.toLowerCase()) ) {
      $(articleId).show();
    }
  }

  function getArticleTags(i) {
    articleTags = $('#search-results-article-'+i).data('tags').split(',');

    articleTags.forEach(function(val, index) {
      articleTags[index] = val.toLowerCase();
    });

    return articleTags;
  }

  /* Search tags with input box  */
  $('#search-input').keyup(function(event) {
    if (event.keyCode === 13) {
      goToResultsPage();
    }
  });
});

function goToResultsPage() {
  if ($('#search-input').val()) {
    window.location.replace(
      '/results' + '?tag=' + $('#search-input').val()
    );        
  }
}

/*
   Plugin options and other jQuery stuff
   ========================================================================== */

/* FitVids options */
$(function() {
  $("article").fitVids();
});

/* Table of Contents toggle */
$(function() {
  $(".toc h3").click(function () {
    $("#drawer").toggleClass("js-hidden");
  });
});

/* Add lightbox class to all image links */
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']")
  .addClass("image-popup");

/* Magnific-Popup options */
$(document).ready(function() {
  $('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });
});

/*
   Responsive nav menu
   ========================================================================== */

function toggleMobileMenu() {
  $('#nav-mobile').slideToggle();
  if ($('#mobile-menu-icon').attr('class') == 'fa fa-fw fa-bars') {
    $('#mobile-menu-icon').removeClass('fa-bars').addClass('fa-times');
  } else {
    $('#mobile-menu-icon').removeClass('fa-times').addClass('fa-bars');
  }
}