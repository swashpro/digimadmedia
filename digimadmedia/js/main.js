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



var monkeyList = new List('test-list', {
  valueNames: ['vector'],
  page: 25,
  plugins: [ ListPagination({}) ] 
});


$('.pagination li a').click(function(){
$('html, body').animate({ scrollTop: 0 }, 0);
});

    $('.preview-image').click(function(){
  
       $(this).parent().parent().parent().find('.perview-image-wrap-main').fadeIn();
    });


       $('.close-preview').click(function(){
        $('.perview-image-wrap-main').fadeOut();
            });

    // $('close-fade').click(function(){

    //    $(this).fadeOut();

    //  });



  
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-52642866-2', 'auto');
  ga('send', 'pageview');
