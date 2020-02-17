/*jslint browser: true*/
/*global $, jQuery*/

jQuery(document).ready(function ($) {
    
    //Accordian Menu
    "use strict";
    function close_accordion_section() {
		$('.accordion .accordian-action').removeClass('active');
		$('.accordion .accordion-content').slideUp().removeClass('open');
	}
	$('.accordian-section').click(function (e) {
        var target = $(this),
            currentAttrValue = $(this).attr('href');
		if ($(e.target).is('.active')) {
			close_accordion_section();
		} else {
			close_accordion_section();
            setTimeout(function () {
                $(target).addClass('active');
                $(target).parentsUntil('#ui').addClass('active');
                $('.accordion ' + currentAttrValue).slideDown().addClass('open');
            }, 500);
        }
		e.preventDefault();
	});
    $('.first').click(function (e) {
        var target = $(this);
        $("h1, h3, p").css({'opacity': '0.75'});
        $("#ui button").css({'border': '1px solid rgba(255,255,255,0.75)'});
        $('nav.sub-r, nav.sub-l').css({'display': 'none'});
        $(function () {
            if ($(e.target).hasClass('active')) {
                close_accordion_section();
                e.preventDefault();
            } else {
                $('.accordian-section').removeClass('active');
                setTimeout(function () {
                    $(target).addClass('active');
                }, 500);
            }
        });
    });
    
    //Border Handles
    function handleMagic() {
        $("nav#nav-brdr,button.menu-item,nav").append('<div class="handler"><span class="ul"></span><span class="ur"></span><span class="dr"></span><span class="dl"></span></div>');
        $("#ui").append('<div class="handler"><div id="nav-brdr" class="top-brdr-l"><span class="ur"></span></div><div id="nav-brdr" class="top-brdr-r"><span class="ul"></span></div><div id="nav-brdr" class="bot-brdr-l"><span class="dr"></span></div><div id="nav-brdr" class="bot-brdr-r"><span class="dl"></span></div></div>');
    }
    
    //On Start Animation
    function openAnimation() {
        handleMagic();
        $('h1').css({'color': 'transparent'});
        $('#ui').addClass('start1');
        $('div.handler').addClass('start2');
        setTimeout(function () {
            $('h1').css({'color': '#ffffff'});
        }, 3000);
        $('#main-ui button, #ui p').addClass('start3');
        setTimeout(function () {
            $("#ui").removeClass("start1");
            $("div.handler").removeClass("start2");
            $("#main-ui button, #ui p").removeClass("start3");
        }, 5500);
    }

    $("#trigger").click(function () {
        $('#trigger').removeClass('triggerIn').addClass('triggerOut');
        setTimeout(function () {
            $("#ui").css({'display': 'block'});
            $('#trigger').css({'display': 'none'}).removeClass('triggerOut');
        }, 1000);
        openAnimation();
    });
    
    //Video + Poster
    $('#trigger, #ui button, #home').on('click', function (e) {
        e.preventDefault();
        var target = $(this),
            video = $('#video'),
            videoCurr = $(this).attr('data-src'),
            posterCurr = $(this).attr('data-poster');
        
        $('button').removeClass('play').removeClass('active');
        $(target).addClass('play').addClass('active');
        
        $(video).fadeOut(250);
        setTimeout(function () {
            $(video).attr('src', "media/" + videoCurr + ".mp4").fadeIn(500);
            //$(video).attr("poster", "img/" + posterCurr + ".gif");
        }, 250);
        
        /*$(video).bind("ended", function () {
            $(video).attr('src');
            video.load();
            video.pause();
        });*/
        
        function pause() {
            setTimeout(function () {
                $(video).get(0).pause();
            }, 9000);
        }
        clearTimeout( initial );
        initial=setTimeout(pause,9000);
        
    });
    
    //Cycle Video
    $('#prev-l, #prev-r').click(function () {
        
        var target = $(this),
            currentIndex = $('button.play').attr('data-index'),
            applyIndex = $('#prev-l, #prev-r').attr('data-index', currentIndex),
            prevCalcIndex = $('#prev-l, #prev-r').attr('data-index', function (n, v) {return v - 1}),
            prevIndex = $('#prev-l, #prev-r').attr('data-index'),
            prevGetSrc = $("#main-ui button[data-index='" + prevIndex + "']"),
            prevFetch = $(prevGetSrc).data('src'),
            prevVideo = $('#prev-l, #prev-r').attr('data-src', prevFetch),
            videoPrev = $(this).attr('data-src'),
            videoWrap = $('#container video');
        
        $(videoWrap).fadeOut(250);
        setTimeout(function () {
            $(videoWrap).attr('src', "media/" + videoPrev + ".mp4").fadeIn(500);
        }, 250);
        $('button').removeClass('play').removeClass('active');
        $(target).addClass('play');
        $(prevGetSrc).addClass('active');
        
        $(function () {
            if ($(prevGetSrc).is('.last')) {
                $('.accordian-section').removeClass('active');
                setTimeout(function () {
                    $(prevGetSrc).parents('.accordian-section').addClass('active');
                }, 500);
            }
        });
        
    });
    $('#next-l, #next-r').click(function () {
        
        var target = $(this),
            currentIndex = $('button.play').attr('data-index'),
            applyIndex = $('#next-l, #next-r').attr('data-index', currentIndex),
            nextCalcIndex = $('#next-l, #next-r').attr('data-index', function (n, v) {return v++ + 1}),
            nextIndex = $('#next-l, #next-r').attr('data-index'),
            nextGetSrc = $("#main-ui button[data-index='" + nextIndex + "']"),
            nextFetch = $(nextGetSrc).data('src'),
            nextVideo = $('#next-l, #next-r').attr('data-src', nextFetch),
            videoNext = $(this).attr('data-src'),
            videoWrap = $('#container video');
        
        $(videoWrap).fadeOut(250);
        setTimeout(function () {
            $(videoWrap).attr('src', "media/" + videoNext + ".mp4").fadeIn(500);
        }, 250);
        $('button').removeClass('play').removeClass('active');
        $(target).addClass('play');
        $(nextGetSrc).addClass('active');
        
        $(function () {
            if ($(nextGetSrc).is('.accordian-action')) {
                $('.accordian-section').removeClass('active');
                setTimeout(function () {
                    $(nextGetSrc).parent().addClass('active');
                }, 500);
            }
            if (nextIndex == '49') {
                $(target).attr('data-src', '#').attr('data-index', '#');
                $(videoWrap).fadeOut(250);
                setTimeout(function () {
                    $(videoWrap).attr('src', "media/demo1.mp4").fadeIn(500);
                }, 250);
                $('button').removeClass('play').removeClass('active');
                $('.accordian-section').removeClass('active');
                $('#home').addClass('overOut');
                $("h1, h3, p").css({'opacity': '1'});
                setTimeout(function () {
                    $('#home').removeClass('overOut').css({'display': 'none'});
                }, 1000);
            }
        });
        
    });
    
    //UI Open    
    $("#ui").click(function () {
        if ($('#ui').hasClass('triggerHome')) {
            $("#home, .handler").css({'display': 'block'});
            $('#ui').removeClass('triggerHome');
            $('#home').addClass('homeIn');
            setTimeout(function () {
                $('#home').removeClass('homeIn');
            }, 1000);
        }
    });
    
    //Sub Nav
    $('#reset').click(function () {
        $('#home').addClass('overOut');
        $('#container, #ui').addClass('triggerOut');
        $('#next, #prev, #tap').attr('data-src', '#').attr('data-index', '#');
        $('.accordian-section').removeClass('active');
        setTimeout(function () {
            $('#trigger').css({'display': 'block'}).addClass('triggerIn');
            $('#trigger video').get(0).load();
            $('#home').removeClass('overOut').css({'display': 'none'});
            $("h1, h3, p").css({'opacity': '1'});
            $('#container, #ui').removeClass('triggerOut');
            $('#ui, .handler').css({'display': 'none'});
        }, 1000);
    });
    $('#home').click(function () {
        $('.accordian-section').removeClass('active');
        $('#home').addClass('overOut');
        $("h1, h3, p").css({'opacity': '1'});
        setTimeout(function () {
            $('#home').removeClass('overOut');
            $('#ui').addClass('triggerHome');
            $("#home").css({'display': 'none'});
            $("nav.sub-r, nav.sub-l").css({'display': 'none'});
        }, 1000);
    });
    $('.sub').click(function (){
        $('nav.sub-r, nav.sub-l').css({'display': 'block'});    
    });
    $('#prev-l, #prev-r, #next-l, #next-r').click(function () {
        
        var prevIndex = $('#prev-l, #prev-r').attr('data-index'),
            prevGetSrc = $("#main-ui button[data-index='" + prevIndex + "']"),
            nextIndex = $('#next-l, #next-r').attr('data-index'),
            nextGetSrc = $("#main-ui button[data-index='" + nextIndex + "']"),
            subNav = $('.active').parent('.sub_main').attr('data-nav'),
            thisNav = $("#main-ui .menu-item[data-nav='" + subNav + "']");
        
        $(function () {
            if ($(prevGetSrc).is('.last')) {
                $('.accordian-section').removeClass('active');
                setTimeout(function () {
                    $(prevGetSrc).parents('.accordian-section').addClass('active');
                }, 500);
            }
            if ($(nextGetSrc).is('.accordian-action')) {
                $('.accordian-section').removeClass('active');
                setTimeout(function () {
                    $(nextGetSrc).parent().addClass('active');
                }, 500);
            }
            if ($('.hidden').is('.active')) {
                $(thisNav).addClass('active');
            }
            if ($('.first').is('.active')) {
                $('nav.sub-r, nav.sub-l').css({'display': 'none'});
            } else ($('#main_2').is('.active')); {
                $('nav.sub-r, nav.sub-l').css({'display': 'block'});
            }
        });
        
    });
    
    //Stop Context Menu
    /*$(document).on({
        "contextmenu": function(e) {
            console.log("ctx menu button:", e.which); 
            e.preventDefault();
        },
        "mousedown": function(e) { 
            console.log("normal mouse down:", e.which); 
        },
        "mouseup": function(e) { 
            console.log("normal mouse up:", e.which); 
        }
    });*/
    
    //Timeout Reload
    function redirect(){
        window.location.href = "index.html";
    }
    var initial=setTimeout(redirect,99999999999999999);
    jQuery(document).click(function(event) { 
        clearTimeout( initial );
        initial=setTimeout(redirect,180000); 
    });
    
});