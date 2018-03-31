import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ScriptService } from './script.service'


@Component({
  selector: 'app-edit-map',
  templateUrl: './edit-map.component.html',
  styleUrls: ['./edit-map.component.css'],
  providers: [ScriptService]
})

export class EditMapComponent implements OnInit, AfterContentInit {

  constructor(private script: ScriptService) {

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
  }

  ngAfterContentInit() {
    this.script.load('editMap').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
