/*jslint browser: true*/
/*global $, jQuery*/
// "use strict";

const DOM = {
    actv: ".active",
    open: ".open",
    ui: ".ui",
    btn: "button",
    acc:".accordian"
};
const helper = {
    remove: (el, target)=> document.querySelector(el).classList.remove(target),
    add: (el, target)=> document.querySelector(el).classList.add(target),
    toggle: (el, target)=> document.querySelector(el).classList.toggle(target)
};


/* Menu section
* uses accordian.js to handle menu interactions
*
*/
const closeAccordionSection = ()=> { // close an accordian menu
    helper.remove(`${DOM.acc}-action`, DOM.actv);
    helper.remove(`${DOM.acc}-content`, DOM.open);
};

jQuery(document).ready(function ($) {

	$('.accordian-section').click(function (e) {
        var target = $(this),
            currentAttrValue = $(this).attr('href');
		if ($(e.target).is('.active')) {
			closeAccordionSection();
		} else {
			closeAccordionSection();
            setTimeout(function () {
                console.log(target)
                console.log(target[0])
                helper.add(target[0], "active");
                //$(target).addClass('active');
                $(target).parentsUntil('.ui').addClass('active');
                $('.accordion ' + currentAttrValue).slideDown().addClass('open');
            }, 500);
        }
		e.preventDefault();
	});
    $('.first').click(function (e) {
        var target = $(this);
        $("h1, h3, p").css({'opacity': '0.75'});
        $(".ui button").css({'border': '1px solid rgba(255,255,255,0.75)'});
        $(function () {
            if ($(e.target).hasClass('active')) {
                closeAccordionSection();
                e.preventDefault();
            } else {
                $('.accordian-section').removeClass('active');
                setTimeout(function () {
                    $(target).addClass('active');
                }, 500);
            }
        });
    });
    
    //Menu Button Handles
    function handleMagic() {
        $(".ui, nav#nav-brdr, button.menu-item").append('<div class="handler"><span class="ul"></span><span class="ur"></span><span class="dr"></span><span class="dl"></span></div>');
        $(".ui").append('<div class="handler"><div id="nav-brdr" class="top-brdr-l"><span class="ur"></span></div><div id="nav-brdr" class="top-brdr-r"><span class="ul"></span></div><div id="nav-brdr" class="bot-brdr-l"><span class="dr"></span></div><div id="nav-brdr" class="bot-brdr-r"><span class="dl"></span></div></div>');
    }
    
    //On Start Animations
    function openAnimation() {
        handleMagic();
        $('h1').css({'color': 'transparent'});
        $('.ui').addClass('start1');
        $('div.handler').addClass('start2');
        setTimeout(function () {
            $('h1').css({'color': '#ffffff'});
        }, 3000);
        $('.ui-main button, .ui p').addClass('start3');
        setTimeout(function () {
            $(".ui").removeClass("start1");
            $("div.handler").removeClass("start2");
            $(".ui-main button, .ui p").removeClass("start3");
        }, 5000);
    }
    
    //Main Menu Events
    $("#trigger").click(function () {
        $('#trigger').removeClass('triggerIn').addClass('triggerOut');
        setTimeout(function () {
            $('#trigger').css({'display': 'none'}).removeClass('triggerOut');
        }, 1000);
        $(".ui").css({'display': 'block'});
        openAnimation();
    });
    
    //UI Open    
    $(".ui").click(function () {
        if ($('.ui').hasClass('triggerHome')) {
            $(".dir").css({'display': 'block'});
            $('.ui').removeClass('triggerHome');
            $('#home').addClass('homeIn');
            setTimeout(function () {
                $('#home').removeClass('homeIn');
            }, 1000);
        }
    });
    
    //Video Fade
    $('#trigger, .ui button, #home').on('click', function (e) {
        e.preventDefault();
        var target = $(this),
            videoCurr = $(this).attr('data-src'),
            videoWrap = $('.container video');
        
        $('button').removeClass('play').removeClass('active');
        $(target).addClass('play').addClass('active');
        
        $(videoWrap).fadeOut(250);
        setTimeout(function () {
            $(videoWrap).attr('src', "media/" + videoCurr + ".mp4").fadeIn(500);
        }, 250);
    });
    
    //Nav Reset  
    $('#reset').click(function () {
        $('#home').addClass('overOut');
        $('.container, .ui').addClass('triggerOut');
        $('.next, .prev, .tap').attr('data-src', '#').attr('data-index', '#');
        $('.accordian-section').removeClass('active');
        setTimeout(function () {
            $('#trigger').css({'display': 'block'}).addClass('triggerIn');
            $('#trigger video').get(0).load();
            $('#home').removeClass('overOut').css({'display': 'none'});
            $("h1, h3, p").css({'opacity': '1'});
            $('.container, .ui').removeClass('triggerOut');
            $('.ui').css({'display': 'none'});
        }, 1000);
    });
    $("#home").click(function () {
        $('.accordian-section').removeClass('active');
        $('#home').addClass('overOut');
        $(".ui-main").css({'display': 'block'});
        $("h1, h3, p").css({'opacity': '1'});
        setTimeout(function () {
            $('#home').removeClass('overOut');
            $(".dir").css({'display': 'none'});
            $('.ui').addClass('triggerHome');
        }, 1000);
    });
    
    //Cycle Video
    $('.prev').click(function () {
        
        var target = $(this),
            currentIndex = $('button.play').attr('data-index'),
            applyIndex = $('.prev').attr('data-index', currentIndex),
            prevCalcIndex = $('.prev').attr('data-index', function (n, v) {return v - 1}),
            prevIndex = $('.prev').attr('data-index'),
            prevGetSrc = $(".ui-main button[data-index='" + prevIndex + "']"),
            prevFetch = $(prevGetSrc).data('src'),
            prevVideo = $('.prev').attr('data-src', prevFetch),
            videoPrev = $(this).attr('data-src'),
            videoWrap = $('.container video');
        
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
            } else {
                //
            }
        });
        
    });
    $('.next').click(function () {
        
        var target = $(this),
            currentIndex = $('button.play').attr('data-index'),
            applyIndex = $('.next').attr('data-index', currentIndex),
            nextCalcIndex = $('.next').attr('data-index', function (n, v) {return v++ + 1}),
            nextIndex = $('.next').attr('data-index'),
            nextGetSrc = $(".ui-main button[data-index='" + nextIndex + "']"),
            nextFetch = $(nextGetSrc).data('src'),
            nextVideo = $('.next').attr('data-src', nextFetch),
            videoNext = $(this).attr('data-src'),
            videoWrap = $('.container video');
        
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
            if (nextIndex == '24') {
                $(target).attr('data-src', '#').attr('data-index', '#');
                $(videoWrap).fadeOut(250);
                setTimeout(function () {
                    $(videoWrap).attr('src', "media/oled2.mp4").fadeIn(500);
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
    $('.tap').click(function () {
        
        var target = $(this),
            currentTap = $('button.play').attr('data-tap'),
            applyTap = $('.tap').attr('data-src', currentTap),
            videoTap = $(this).attr('data-src'),
            tapGetIndex = $(".ui-main button[data-src='" + currentTap + "']"),
            indexFetch = $(tapGetIndex).attr('data-index'),
            tapIndexApply = $('.tap').attr('data-index', indexFetch),
            indexTap = $(this).attr('data-index'),
            videoWrap = $('.container video');
            
        $(videoWrap).fadeOut(250);
        setTimeout(function () {
            $(videoWrap).attr('src', "media/" + videoTap + ".mp4").fadeIn(500);
        }, 250);
        $('button').removeClass('play').removeClass('active');
        $(target).addClass('play');
        $(tapGetIndex).addClass('active');
        
        $(function () {
            if ($(tapGetIndex).is('.accordian-action')) {
                $('.accordian-section').removeClass('active');
                setTimeout(function () {
                    $(tapGetIndex).parents().addClass('active');
                }, 500);
            } else { 
                ($(tapGetIndex).is('.accordian-action')); {
                    $('.accordian-section').removeClass('active');
                    setTimeout(function () {
                        $(tapGetIndex).parents().addClass('active');
                    }, 500);
                }
            }
        });

    });
    
    // Stop Context Menu
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