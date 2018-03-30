import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  title = 'HOME';
  selectedValue: string = "";
  items = [
    { value: "0", view: "zero" },
    { value: "1", view: "one" },
    { value: "2", view: "Two" }
  ];
  /*tiles = [
    {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 2, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#F00'},

  ];
  */
  mapData = [
    {Location: 'Os Skole',text: 'One: Map One description', imgURL:'http://routegadget.jukola.com/kartat/41.jpg', cols: 4, rows: 1, color: 'lightblue'},
    {Location: 'Mano Skole', text: 'Two: Map One description', imgURL:'http://www.nhm.ac.uk/content/dam/nhmwww/visit/Exhibitions/art-of-british-natural-history/magpie-illustration-keulemans-two-column.jpg', cols: 2, rows: 1, color: 'lightgreen'},
    {Location: 'Halden Skole', text: 'Three: Map One description', imgURL:'http://routegadget.jukola.com/kartat/41.jpg', cols: 2, rows: 1, color: 'lightpink'},
    {Location: 'Dash Skole', text: 'Four: Map One description', imgURL:'http://routegadget.jukola.com/kartat/41.jpg',  cols: 2, rows: 1, color: '#F00'},
    {Location: ' Map One description', text: 'One: Map One description', imgURL:'http://routegadget.jukola.com/kartat/41.jpg', cols: 4, rows: 1, color: 'lightblue'},
    {Location: 'One: Me description', text: 'Two: Map One description', imgURL:'http://routegadget.jukola.com/kartat/41.jpg', cols: 2, rows: 1, color: 'lightgreen'},
    {Location: 'Onene description', text: 'Three: Map One description', imgURL:'http://routegadget.jukola.com/kartat/41.jpg', cols: 2, rows: 1, color: 'lightpink'},
    {Location: 'Skole ription', text: 'Four: Map One description', imgURL:'http://routegadget.jukola.com/kartat/41.jpg',  cols: 2, rows: 1, color: '#F00'},
    {Location: 'Skole ription', text: 'Four: Map One description', imgURL:'http://routegadget.jukola.com/kartat/41.jpg',  cols: 2, rows: 1, color: '#F00'},
    {Location: 'Skole ription', text: 'Four: Map One description', imgURL:'http://routegadget.jukola.com/kartat/41.jpg',  cols: 2, rows: 1, color: '#F00'},
  ];
  ngOnInit() {
  }

}
