  $(document).ready(function(){ 
  var touch   = $('#touch-menu');
  var menu  = $('.menu');

  $(touch).on('click', function(e) {
  e.preventDefault();
  menu.slideToggle();
  });

  $(window).resize(function(){
  var w = $(window).width();
  if(w > 767 && menu.is(':hidden')) {
  menu.removeAttr('style');
  }
  });

  });


    var slides = $('.content_article-img');

    var glide = $('.slider').glide({
      arrowRightText: '',
      arrowLeftText: '',
      autoplay: false,
      circular: false,
      beforeTransition: function() {
        $(slides).eq(-this.currentSlide).removeClass('fadeInUpBig').addClass('fadeOutDownBig');

      },
      afterTransition: function() {
        $(slides).eq(-this.currentSlide).removeClass('fadeOutDownBig').addClass('fadeInUpBig');
      }
    });