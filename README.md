# image-slider
Basic image slider.

The sort of thing you have at the top of websites. Images slide in from right. Speed of transition and gap between transitions can changed in set up variables at top of code.

It will automatically cycle through all images inside the div '.slider_wrapper'. Nothing else needs doing.
(Name of image wrapper can be changed in variable set up at top of code.)

The size of the wrapper is taken from the size of the first image. Therefore all images should be the same size.

--- Code stuff ---

The transitions are done using css translate, attaching and removing the appropriate classes as required. 

Images are first loaded into an array. 

Looping through the array is done using setInterval. This calls a loopinh counter which passes the number of the current image. 

The next and previous images are worked out within the function that switches the visibility of the images and adds the appropriate class to cause the image to move to its starting position, be in the correct z-index layer and animate. 
