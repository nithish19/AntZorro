import { Component, OnInit } from '@angular/core';
import { RecentDetails, UserDetails } from '../data-item';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  contact:UserDetails[] = [
    {username:"Nick Jones",call:"mobile"},
    {username:"Eva Moor",call:"home"},
    {username:"Jack Williams",call:"mobile"},
    {username:"Lee Wong",call:"mobile"},
    {username:"Alan Thompson",call:"home"},
    {username:"Kate Martinez",call:"work"},
  ];

  recent:RecentDetails[]=[
    {username:"Alan Thompson",call:"home",time:"9.12PM"},
    {username:"Eva Moor",call:"home",time:"5.45PM"},
    {username:"Nick Jones",call:"mobile",time:"5.29AM"},
    {username:"Lee Wong",call:"mobile",time:"11.24AM"},
    {username:"Jack Williams",call:"mobile",time:"10.45AM"},
    {username:"Kate Martinez",call:"work",time:"9.42AM"},
    {username:"Kate Martinez",call:"work",time:"9.42AM"},
    {username:"Jack Williams",call:"mobile",time:"8.00AM"},
  ];

  constructor() { }

  ngOnInit() {
  }

}
