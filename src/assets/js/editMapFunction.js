window.onload = setTransformScale;

/**
 * Global variables for selection
 */
var size,
  selectedType,
  click = 0,
  drawObject,
  rand,
  clicking,
  elem,
  xDif, yDif,
  textX,textY,
  x1,x2,y1,y2,
  color = "#6658A4", // PMS Purple
  transformScale = 1,
  skipIndex = 0,

  data = [],
  newSvgElement = {},
  draw,
  group;


console.log('editmap loaded')

$(document).ready(function() {
  /**
   * Creates the SVG layout
   */
  draw = SVG.get('svgCanvas'),
  group = draw.group().id('svgGroup');

  /**
   * Detect window size to adjust the drawn elements
   */
  $(window).resize(function(){
    setTransformScale();
    update();
  });

  /**
   * Retrieves mouse position and pushes object settings into the data array
   */
  $('#image').click(function(e){
    $this = $(this);
    var topy = $this.offset().top,
      leftx = $this.offset().left,
      x = e.pageX - leftx,
      y = e.pageY - topy,
      elementMouseIsOver = document.elementFromPoint(e.clientX, e.clientY).id;

    if(document.getElementById("createElement-input").checked && document.getElementById("selectSize").innerHTML && document.getElementById("selectType").innerHTML){

      // create a new element if element clicked is the svg canvas
      if(elementMouseIsOver === "image") {
        rand = Math.floor(Math.random() * 100000000); // ( ͡° ͜ʖ ͡°)

        switch (parseInt(document.getElementById("selectType").innerHTML)) {
          // If line is selected, assign values to the object on the first click. On the second click,
          // assign the secondary xy positions and push it to the data array.
          case 1:
            if (click === 0) {
              newSvgElement.size = parseInt(document.getElementById("selectSize").innerHTML);
              newSvgElement.type = parseInt(document.getElementById("selectType").innerHTML);
              newSvgElement.id = 'svgElement' + rand;
              newSvgElement.position = [x * transformScale,y * transformScale];
              newSvgElement.scale = transformScale;
              click = 1;
            } else if (click === 1) {
              newSvgElement.position.push(x * transformScale);
              newSvgElement.position.push(y * transformScale);
              data.push( Object.assign({}, newSvgElement) );
              click = 0;
            }

            break;

          // If textbox is selected, create an inputbox at mouse position on first click.
          // On second click, assign values to the new element, and push it to the data array.
          case 4:
            var div = document.getElementById('writeText');
            var textP;
            if (click === 0) {
              textP = document.createElement('input');
              textP.setAttribute('id','textInput');
              textP.style.position = 'absolute';
              textP.style.left = x + leftx + "px";
              textP.style.top = y + topy + "px";
              textX = x * transformScale;
              textY = y * transformScale;

              div.appendChild(textP);
              click = 1;
            } else if (click === 1) {
              textP = document.getElementById('textInput').value;
              if (textP != ""){
                newSvgElement.size = parseInt(document.getElementById("selectSize").innerHTML);
                newSvgElement.type = parseInt(document.getElementById('selectType').innerHTML);
                newSvgElement.id = 'svgElement' + rand;
                newSvgElement.position = [textX,textY];
                newSvgElement.scale = transformScale;
                newSvgElement.text = textP;
                data.push( Object.assign({}, newSvgElement) );
              }

              while (div.firstChild){
                div.removeChild(div.firstChild);
              }
              click = 0;
            }

            break;

          default:
            newSvgElement.size = parseInt(document.getElementById("selectSize").innerHTML);
            newSvgElement.type = parseInt(document.getElementById("selectType").innerHTML);
            newSvgElement.id = 'svgElement' + rand;
            newSvgElement.position = [x * transformScale,y * transformScale];
            newSvgElement.scale = transformScale;
            data.push( Object.assign({}, newSvgElement) );

            break;
        }
      }
      update();
    }
  });

  /*
   * Delete object on mouse position
   * */
  $("#svgCanvas").click(function(e){
    var x = e.clientX,
      y = e.clientY,
      elementMouseIsOver = document.elementFromPoint(x, y).id;
    if(elementMouseIsOver !== "svgImage") {
      if(document.getElementById("deleteElement-input").checked){
        deleteSvgFromPoint(elementMouseIsOver);
        update();
      }
    }
  });

  /*
   * Sets position of object to mouse position
   * */
  $("#svgCanvas").mousemove(function(e){
    if(clicking && document.getElementById("moveElement-input").checked){
      $this = $(this);
      var topy = $this.offset().top,
        leftx = $this.offset().left,
        xx = e.pageX - leftx, yy = e.pageY - topy;
      if(elem){
        if(elem.position.length === 4){
          if(x1 > x2){
            elem.position[0] = ((xx * transformScale) - xDif);
            elem.position[2] = ((xx * transformScale) + xDif);
          } else {
            elem.position[0] = ((xx * transformScale) + xDif);
            elem.position[2] = ((xx * transformScale) - xDif);
          }
          if(y1 > y2){
            elem.position[1] = ((yy * transformScale) - yDif);
            elem.position[3] = ((yy * transformScale) + yDif);
          } else {
            elem.position[1] = ((yy * transformScale) + yDif);
            elem.position[3] = ((yy * transformScale) - yDif);
          }
        } else {
          elem.position = [xx * transformScale,yy * transformScale];
        }
      }
      update();
    }
  });

  /*
   * When user lets go of mouse, stop the mousemove function
   * */
  $("#svgCanvas").mouseup(function(){
    clicking = false;
  });
  /*
   * Retrieves element user clicks on from the data array
   * */
  $("#svgCanvas").mousedown(function(e){
    if(document.getElementById("moveElement-input").checked) {
      var x = e.clientX,
        y = e.clientY,
        elementMouseIsOver = document.elementFromPoint(x, y).id,
        scaleIsChanged = false;
      clicking = true;
      elem = dataInPosition(elementMouseIsOver);

      // If old elements
      if(elem !== undefined && elem.scale !== transformScale){
        elem.scale = transformScale;
        scaleIsChanged = true;
      }
      // If element exists && it's a line object, find x & y differences
      if(elem && elem.position.length === 4){
        x1 = elem.position[2];
        x2 = elem.position[0];
        y1 = elem.position[3];
        y2 = elem.position[1];

        if(scaleIsChanged){
          // We need to check if the lines scale is changed, because the length is also changed then
          xDif = Math.abs(x2-x1) / 2 * transformScale;
          yDif = Math.abs(y2-y1) / 2 * transformScale;
        } else {
          xDif = Math.abs(x2-x1) / 2;
          yDif = Math.abs(y2-y1) / 2;
        }
      }
    }
  });

  /**
   * Creates the text if the user clicks Enter on the textInput.
   * */
  $("#writeText").keyup(function(event) {
    if (event.keyCode === 13) {
      var div = document.getElementById('writeText'),
        textP = document.getElementById('textInput').value;
      if (textP != ""){
        newSvgElement.size = parseInt(document.getElementById("selectSize").innerHTML);
        newSvgElement.type = parseInt(document.getElementById('selectType').innerHTML);
        newSvgElement.id = 'svgElement' + rand;
        newSvgElement.position = [textX,textY];
        newSvgElement.scale = transformScale;
        newSvgElement.text = textP;
        data.push( Object.assign({}, newSvgElement) );
      }

      while (div.firstChild){
        div.removeChild(div.firstChild);
      }
      click = 0;
    }
    update();
  });

  /**
   * Delete all the objects created by the user by emptying the array of objects.
   */
  $('#deleteAll').click(function(){
    data = [];
    update();
  });

  /**
   * Undo creation of the last object by removing the last object in the data array
   */
  $('#undo').click(function(){
    data.splice(data.length - 1, 1);
    update();
  });
});

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

/**
 * Updates canvas based on data-array
 */
function update(){
  $("#svgGroup").empty();
  skipIndex = 0;

  for (var i = 0; i < data.length; i++) {
    if(data[i].scale !== transformScale){
      data[i].scale = transformScale;
    }
    if(data[i].type === 1 || data[i].type === 4){
      drawPoint(data[i],i);
      skipIndex++;
    }else{
      drawPoint(data[i],i - skipIndex);
    }
  }
}

function dataInPosition(id) {
  if(data.length){
    var pos = data.map(function (element) {
      return element.id
    }).indexOf(id);
    return data[pos];
  }
}

function deleteSvgFromPoint(id){
  if (data.length) {
    var elementIdx = data.map(function (element) {
      return element.id
    }).indexOf(id);

    if (elementIdx > -1) {
      data.splice(elementIdx, 1);
    }
  }
}
/**
 * Draws an SVG element at mouse position based on user selection
 */
function drawPoint(svgObject,index){
  // Retrieve values from the data array elements, and store them in the variables
  size            = svgObject.size;
  selectedType    = svgObject.type;
  var scale       = svgObject.scale,
    text        = svgObject.text,
    xx          = svgObject.position[0] / scale,
    yy          = svgObject.position[1] / scale;

  // switch case based on the user selected object (could be case: "circle" if you'd want to work with strings)
  switch(selectedType){
    case 0:
      //This creates a circle
      drawObject = group.circle(size).id(svgObject.id);
      drawObject.attr({
        fill: color,
        'fill-opacity': "0.0",
        stroke: color,
        'stroke-width': size/10,
        cx: xx,
        cy: yy
      });
      break;

    case 1:
      // This is to create the line between where the user first clicked, and where they secondly clicked
      var x1 = svgObject.position[2] / scale;
      var x2 = svgObject.position[0] / scale;
      var y1 = svgObject.position[3] / scale;
      var y2 = svgObject.position[1] / scale;
      drawObject = group.line(x1,y1,x2,y2).id(svgObject.id).stroke({
        width: size/5,
        color: color,
        linecap: 'round'
      });

      break;

    case 2:
      // This is to create the goal symbol, which is a circle within another circle, both of which has no fill
      drawObject = group.circle(size).id(svgObject.id);
      drawObject.attr({
        fill: color,
        'fill-opacity': "0.0",
        stroke: color,
        'stroke-width': size/10,
        cx: xx,
        cy: yy
      });
      drawObject = group.circle(size/2).id(svgObject.id);
      drawObject.attr({
        fill: color,
        'fill-opacity': "0.0",
        stroke: color,
        'stroke-width': size/10,
        cx: xx,
        cy: yy
      });

      break;

    case 3:
      // This creates a triangle facing up. The path string uses the mouse coordinates and adjusts depending on
      // size selected by the user. To face the triangle the other way, simply change the + and - signs
      // on all the parenthesis calculations
      drawObject = group.path('M' + (xx + size/2) + " " + (yy + size/2) + " L" + (xx - size/2) + " " + (yy + size/2)
        + " L" + xx + " " + (yy - size/2) + ' Z').id(svgObject.id);
      drawObject.attr({
        fill: color,
        'fill-opacity': "0.0",
        stroke: color,
        'stroke-width': size/10
      });

      break;

    case 4:
      // Create a text-input at mouse location, then display text there if text was entered.
      drawObject = group.text(function(add){
        add.tspan(text).id(svgObject.id).fill(color)
      });
      drawObject.font({
        size: size
      });
      drawObject.move(xx, yy - (size / 5) );

      break;
  }


  /**
   * Add auto numbering to elements (Post, Start, Goal) based on index in data[]
   */
  var autoIndex = document.getElementById('autoIndex-input').checked;

  if(selectedType !== 1 && selectedType !== 4 && autoIndex){
    var objectNumber = group.text(function(add){
      add.tspan(index + 1).id(svgObject.id).fill(color)
    });
    objectNumber.font({
      size: size
    });
    objectNumber.move(xx + (size), yy );
  }
}
