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
    const navDOM = { // array of elements to be called later
        actv: ".active",
        open: ".open",
        acc: ".accordian",
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
    return {
        closeAccordion: ()=> { // close an accordian menu
            helper.remove(`${navDOM.acc}-action`, navDOM.actv);
            helper.remove(`${navDOM.acc}-content`, navDOM.open);
        },
        clickEvent: ()=> {
            console.log("View clickEvent");
        },
        handleMagic: ()=> {
            //const handleDOM = [ "" ]
            console.log("View handleMagic");
        },
        init: ()=> {
            console.log("View init");
        }
    }
})();
function handleMagic() {
    $(".ui, nav#nav-brdr, button.menu-item").append('<div class="handler"><span class="ul"></span><span class="ur"></span><span class="dr"></span><span class="dl"></span></div>');
    $(".ui").append('<div class="handler"><div id="nav-brdr" class="top-brdr-l"><span class="ur"></span></div><div id="nav-brdr" class="top-brdr-r"><span class="ul"></span></div><div id="nav-brdr" class="bot-brdr-l"><span class="dr"></span></div><div id="nav-brdr" class="bot-brdr-r"><span class="dl"></span></div></div>');
}
/*
*
* The controller is the decision maker and the glue between the model and view.
* The controller updates the view when the model changes.
* It also adds event listeners to the view and updates the model
*  when the user manipulates the view.
*/
let controller = ( ( model, view )=> {
    const setupEventListeners = ()=> { // setup event listeners 
        const targetsDOM = [ "button" ];
        targetsDOM.forEach(function(current) { // loop through targetDOM 
            let targets = document.querySelectorAll(current); // get each target
            let onEvent = {
                click: ()=> { // attach functions to click handler
                    view.clickEvent();
                    model.clickEvent();
                }
            };
            for ( let i = 0; i < targets.length; i++ ) {
                //  loop through target and add a listener
                targets[i].addEventListener( "click", ()=> onEvent.click() ); 
            };
        });
    };
    return {
        init: ()=> {
            setupEventListeners(); // call event listeners
            model.init(); // import model
            view.init(); // import view
            console.log("Controller init");
        }
    }
})( model, view );
controller.init();