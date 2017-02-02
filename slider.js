window.onload = function() {

    (function() { // exclude code from global space

        var setup = {
             wrap: 'slider_wrapper', // div containing images
             slidespeed: 500, // speed of transition
             slidegap: 500 // gap between transitions
        };
        setup.translate = 'all ' + setup.slidespeed + 'ms ease-in-out'; // css translation}

        images = {}; // images stored as objects here. done like this because you can't call other variables etc. in {} notation

        images = imageData(setup.wrap); //calls function that puts contents of wrap into an array

        wrapperSize(setup.wrap, images[0]); // this so it cuts off next slider which is outside the wrapper ready to slide in. this could be set in css but then you'd have to know the image size. It would be ideal if this was done automatically in css but the images are position: absolute so the wrapper does not know how big they are. So I have to tell it. It's based on the 1st image size.

        var increment = theCounter(images.length);

        var inc = increment.count();

        doIt(images, images.length, inc);

        setInterval(function(){
            inc = increment.count();
            doIt(images, images.length, inc);
        }, setup.slidespeed + setup.slidegap);

        function theCounter(num){
        // loops from 0 through to num
            var pointer = -1;
            function countIt(){
                if(pointer > num-2){pointer = -1;}
                pointer++;
                  console.log(pointer);
                return pointer;
              
            }
            return {count:countIt}
        } //

        function doIt(img, num, current){
        // cycle through image array setting up transitions i= current visible image.
            var next = current + 1;
            var prev = current - 1;
            if (prev  < 0){prev = num - 1}
            if (next > num - 1){next = 0}

            // cue up next image
            img[next].className = 'slider_img js_next';

            // do the animation on current image
            img[current].className = 'slider_img'; // remove js_next class once it's done its job
            img[current].style.visibility = 'visible'; // this could be done in css of course but hardly seems worth having a class for this one thing.
            img[current].style.webkitTransition = setup.translate; // this here so you can change transition info (time, easing) above instead of in css file

            // reset previous image
            img[prev].style.visibility = 'hidden';
            img[prev].className = 'slider_img js_prev';
        } // doIt

        // setup functions //////////
        function imageData(parent){
            console.log(parent);
        // get children of parent element and put in array
            var parent = getClass(parent);
            var children = parent.childNodes;
            var image_data = [];
            for (var i =0; i <children.length; i++){
                if (children[i].nodeType == 1){ // checks children are right type before storing otherwise white space will be stored
                    image_data.push(children[i]);

                    // set visibilty for initial set up. seems sensible to do it here instead of going through again elsewhere.
                    if (i != 0){
                        children[i].style.visibility = 'hidden';
                    }
                }
            }
            return image_data;
        } // imageData

        function wrapperSize(wrapper, image){
        // set wrapper size so that everything outside is invisible (because next image is shifted outside to slide back in). Nec. because images are postioned absolute for the animation so wrapper does not know image size
            var wrapper = getClass(wrapper);
            var width = image.clientWidth; // displayed width
            var height = image.clientHeight;
            wrapper.style.height = height + 'px';
            wrapper.style.width = width + 'px';
        } //wrapperSize

        // functional function - reduces amount of code ///////
        function getClass(el){
        // to get first appearance of class on page. getElements... returns node list
            var el= document.getElementsByClassName(el);
            var el = el[0];
            return el;
        } // getClass
    }());
} // onload