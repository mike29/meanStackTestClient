/**
 * Created by Michael M. Simon on 3/27/2018.
 */
"use strict";
/**
* transformScale is used to scale the svg elements to the increased/decreased map size.
* The map size is changed based on media queries for phone, smartphone and desktop.
*/
function setTransformScale(){
  if(Modernizr.mq('(min-width: 768px)')){
    transformScale = 1;
  } else if(Modernizr.mq('(min-width: 600px)')) {
    transformScale = 0.833;
  } else {
    transformScale = 0.556;
  }
}

function hi (){
  console.log("HI!");

}
class Cube {
  cube(x) {
     hi();
    setTransformScale();
    return x;
  }
}
export default Cube;
