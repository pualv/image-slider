window.onload = function() {

    (function() {

        var setup = {
             wrap: 'slider_wrapper', // div containing images
             slidespeed: 500, // speed of transition
             slidegap: 500 // gap between transitions
        };
        setup.translate = 'all ' + setup.slidespeed + 'ms ease-in-out'; // css translation}


        images = [];
        images = imageData(setup.wrap); //put images inside setup.wrap into an array

        wrapperSize(setup.wrap, images[0]); // Make setup.wrap viewport for images. Based on size of first image.

        var increment = theCounter(images.length); // Set up an instance of theCounter
        var inc = increment.countIt(); // Set up counter for first image
        doIt(images, images.length, inc); // Set initial state of images


        // Increment counter at set interval. Slide in next image.
        setInterval(function(){
            inc = increment.countIt();
            doIt(images, images.length, inc);
        }, setup.slidespeed + setup.slidegap);

        // *** FUNCTIONS ***

        // Loops through 0 to number of images
        function theCounter(num){
            var pointer = -1;
            function countIt(){
                pointer++;
                if(pointer === num){pointer = 0;}
                return pointer;
            }
            return {countIt}
        } //theCounter

        // Operates the animation
        function doIt(img, num, current){
            var next = current + 1;
            var prev = current - 1;
            if (prev  < 0){prev = num - 1}
            if (next > num - 1){next = 0}

            // cue up next image
            img[next].className = 'slider_img js_next';

            // do the animation on current image
            img[current].className = 'slider_img'; // remove js_next class once it's done its job
            img[current].style.visibility = 'visible'; // this could be done in css of course but hardly seems worth having a class for this one thing.

            vendors = ['Webkit', 'Moz', 'ms', 'o', ''];
            for (v = 0; v < vendors.length; ++v){
                  img[current].style[vendors[v] + 'Transition'] = setup.translate; // this here so you can change transition info (time, easing) above instead of in css file
            }
            // reset previous image
            img[prev].style.visibility = 'hidden';
            img[prev].className = 'slider_img js_prev';
        } // doIt


        // *** SET UP FUNCTIONS ***

        // put images inside setup.wrap into an array
        function imageData(parent){
            var parent = getClass(parent);
            var children = parent.childNodes;
            var image_data = [];
            for (var i =0; i <children.length; i++){
                if (children[i].nodeType == 1){ // checks children are right type before storing otherwise white space will be stored
                    image_data.push(children[i]);
                    if (i != 0){
                         // Hide all images apart from first. Seems sensible to do it here while cycling though images although it does mean this function does two things.
                        children[i].style.visibility = 'hidden';
                    }
                }
            }
            return image_data;
        } // imageData

        // Set wrapper size based on first image size
        function wrapperSize(wrapper, image){
            var wrapper = getClass(wrapper);
            var width = image.clientWidth; // displayed width
            var height = image.clientHeight;
            wrapper.style.height = height + 'px';
            wrapper.style.width = width + 'px';
        } //wrapperSize


      // *** FUNCTIONAL FUNCTION ***
      // Makes code a bit simpler (arguable - only applies to setup.wrap, could use ID selection instead)
      // Gets first appearance of class on page.
        function getClass(el){
            var el= document.getElementsByClassName(el);
            var el = el[0];
            return el;
        } // getClass
    }());
} // onload