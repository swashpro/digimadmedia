$(document).ready(function(){var e=$("#touch-menu"),t=$(".menu");$(e).on("click",function(e){e.preventDefault();t.slideToggle()});$(window).resize(function(){var e=$(window).width();e>767&&t.is(":hidden")&&t.removeAttr("style")})});$(".preview-image").click(function(){$(this).parent().parent().parent().find(".perview-image-wrap-main").fadeIn()});$(".close-preview").click(function(){$(".perview-image-wrap-main").fadeOut()});