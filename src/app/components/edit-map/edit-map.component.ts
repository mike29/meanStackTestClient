import { Component, OnInit } from '@angular/core';
import Cube from './cube';


const getClicked = new Cube();

function checkWindowLoaded(){
 // getClicked.setTransformScale();

}

@Component({
  selector: 'app-edit-map',
  templateUrl: './edit-map.component.html',
  styleUrls: ['./edit-map.component.css'],


})

export class EditMapComponent implements OnInit {

  constructor() {
  }

   clickedValue (value){
     console.log(getClicked.cube(value));
      }

    selectedValue: string = "";
    sizeValue: string = "";
    items = [
      { value: "0", view: "POST" },
      { value: "1", view: "LINE" },
      { value: "2", view: "GOAL" },
      { value: "3", view: "START" },
      { value: "4", view: "TEXT INPUT" }
    ];
  sizes = [
    { value: "15", view: "15" },
    { value: "20", view: "20" },
    { value: "25", view: "25" },
    { value: "30", view: "30" },
    { value: "35", view: "35" }
  ];
  stateValue: string;

  states = [
    { value: "Create Element", id: "createElement" },
    { value: "Move Element", id: "moveElement" },
    { value: "Delete Element", id: "deleteElement" }
  ];


  ngOnInit() {
    checkWindowLoaded();
  }

}
