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
    const handleMagic = ()=> { // add rect's to corners of navigation
        const DOM = [ ".ui", ".ui-button", ".nav-brdr" ]; // elements to be called
        const spanDOM = [ "tl", "tr", "bl", "br" ]; // spans to be added
        DOM.forEach( (current, index)=> {
            let el = document.querySelectorAll(current);
            for (let i = 0; i < el.length; i++) {
                const newDiv = document.createElement("div");
                let newHandle = ()=> {
                    newDiv.classList += "handle-main";
                    spanDOM.forEach(function(current){
                        newDiv.innerHTML += `<span class="${current}"></span>`;
                    });
                    return newDiv;
                };
                let newBorderHandle = ()=> {
                    el.innerHTML += `
                    <div class="brdr-handle">
                        <div class="nav-brdr top-brdr-r">
                            <span class="tl"></span>
                        </div>
                        <div class="nav-brdr top-brdr-l">
                            <span class="tr"></span>
                        </div>
                        <div class="nav-brdr bot-brdr-l">
                            <span class="br"></span>
                        </div>
                        <div class="nav-brdr bot-brdr-r">
                            <span class="bl"></span>
                        </div>
                    </div>`;
                    /*newDiv.classList += "handle-border";
                    spanDOM.forEach(function(current){
                        newDiv.innerHTML += `<span class="${current}"></span>`;
                    });
                    return newDiv;*/
                };
                if (index !== 2) el.appendChild(newHandle());
                if (index === 0) el.apend
            }
        });
        console.log("View handleMagic");
    };
    return {
        closeAccordion: ()=> { // close an accordian menu
            helper.remove(`${navDOM.acc}-action`, navDOM.actv);
            helper.remove(`${navDOM.acc}-content`, navDOM.open);
        },
        clickEvent: (e)=> {
            let trigger = document.querySelector(viewDOM.trig);
            if (e.srcElement === trigger) {
                handleMagic();
            };
            console.log("View clickEvent");
        },
        init: ()=> {
            console.log("View init");
        }
    }
})();
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
            const e = event;
            let targets = document.querySelectorAll(current); // get each target
            let onEvent = {
                click: (e)=> { // attach functions to click handler
                    view.clickEvent(e);
                    model.clickEvent(e);
                }
            };
            for ( let i = 0; i < targets.length; i++ ) {
                //  loop through target array and add listener
                targets[i].addEventListener( "click", ()=> onEvent.click(event) ); 
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
controller.init();