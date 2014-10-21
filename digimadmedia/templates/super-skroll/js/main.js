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


  $(document).scroll(function() {
    if ($(this).scrollTop() > 800) {
        $('.menu').css('position','fixed');
        $('.menu').css('top','0px');
        $('.menu').css('left','0px');
        $('.menu').css('padding-left','70px');
        $('.menu').css('padding-right','0px');
        $('.menu').css('background','#000');
         $('.menu').css('margin-left','0px');
             } 
    else {
        $('.menu').css('position','static');
          $('.menu').css('background','none');
           $('.menu').css('padding-left','0px');
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



