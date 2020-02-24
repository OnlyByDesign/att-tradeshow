/*
* Strict Mode is a feature in ECMAScript 5
* Allows you to place a program, or a function, in a "strict" operating context.
* This strict context prevents certain actions from being taken and throws more exceptions.
* 1. It catches some common coding bloopers, throwing exceptions.
* 2. It prevents, or throws errors, when relatively "unsafe" actions
*  are taken (such as gaining access to the global object).
* 3. It disables features that are confusing or poorly thought out.
* Also note you can apply "strict mode" to the whole file
* Or you can use it only for a specific function
*/
"use strict";
/*
*
* Model is where the application’s data objects are stored.
* The model doesn’t know anything about views and controllers.
* When a model changes, typically it will notify its observers that a change has occurred.
*/
let model = ( ()=> {
    return {
        clickEvent: ()=> {
            console.log("Model clickEvent");
        },
        init: ()=> {
            console.log("Model init");
        }
    }
})();
/*
*
* View is what's presented to the users and how users interact with the app.
* The view is made with HTML, CSS, JavaScript and often templates.
* This part of your App has access to the DOM.
*/
let view = ( ()=> {
    const viewDOM = { // array of elements to be called later
        actv: ".active",
        open: ".open",
        acc: ".accordian",
        trig: ".trigger",
        ui: ".ui",
        btn: ".ui-button",
        prev: ".prev",
        next: ".next",
        tap: ".tap"
    };
    const helper = { // predefined functions for various things
        el: (el)=> document.querySelector(el), // get specific el
        remove: (el, target)=> el(el).classList.remove(target), // remove class of el
        add: (el, target)=> el(el).classList.add(target), // add class to el
        toggle: (el, target)=> el(el).classList.toggle(target) // toggle class of el
    };
    const handleMagic = ()=> { // add rect's to corners of navigation for aesthetics
        const targetDOM = [ viewDOM.ui, viewDOM.btn ]; // elements to be called
        targetDOM.forEach( (current, index)=> {
            const el = document.querySelectorAll(current);
            const spanDOM = [ "tl", "tr", "bl", "br" ]; // spans to be added
            let i, newDiv, newClass, newHtml;
            for (i = 0; i < el.length; i++) {
                newDiv = document.createElement("div");
                if (index !== 0)
                    newClass = "handle handle-main",
                    newHtml = (c)=> `<span class="${c}"></span>`;
                else 
                    newClass = "handle handle-border",
                    newHtml = (c)=> `<div class="nav-brdr"><span class="${c}"></span></div>`;
                (()=> {
                    newDiv.classList += newClass;
                    spanDOM.forEach(function(current){
                        newDiv.innerHTML += newHtml(current);
                    });
                    return newDiv;
                })();
                el[i].appendChild(newDiv);
            };
        });
        console.log("View handleMagic");
    };
    const closeAccordian = ()=> {
        helper.remove(`${navDOM.acc}-action`, navDOM.actv);
        helper.remove(`${navDOM.acc}-content`, navDOM.open);
    };
    return {
        clickEvent: (el, ev)=> { // click function
            let trigger = document.querySelector(viewDOM.trig);
            if (el === trigger) {
                handleMagic();
            };
            console.log("View clickEvent");
        },
        init: ()=> {
            console.log("View init");
        }
    }
})();
/*function openAnimation() {
    $('h1').css({'color': 'transparent'});
    $('.ui').addClass('start1');
    $('div.handler').addClass('start2');
    setTimeout(function () {
        $('h1').css({'color': '#ffffff'});
    }, 3000);
    $('#main-ui button, .ui p').addClass('start3');
    setTimeout(function () {
        $(".ui").removeClass("start1");
        $("div.handler").removeClass("start2");
        $("#main-ui button, .ui p").removeClass("start3");
    }, 5000);
}*/
/*
*
* The controller is the decision maker and the glue between the model and view.
* The controller updates the view when the model changes.
* It also adds event listeners to the view and updates the model
*  when the user manipulates the view.
*/
let controller = ( ( model, view )=> {
    const setupEventListeners = ()=> { // setup event listeners 
        const targetsDOM = [ "section.trigger", "button" ];
        targetsDOM.forEach(function(current) { // loop through targetDOM
            const ev = event; // shorter is better
            let onEvent, targets;
            onEvent = {
                click: (el, ev)=> { // attach functions to click handler
                    view.clickEvent(el, ev);
                    model.clickEvent(el, ev);
                }
            },
            targets = document.querySelectorAll(current); // get each target
            for ( let i = 0; i < targets.length; i++ ) { // loop through targets
                targets[i].addEventListener( "click", function() { // maintain `this`
                    onEvent.click(this, event);
                });
            };
        });
    };
    return {
        init: ()=> {
            setupEventListeners(); // call listeners
            model.init(); // import model
            view.init(); // import view
            console.log("Controller init");
        }
    }
})( model, view );

/*
* Initilize the whole thing
*/
controller.init();