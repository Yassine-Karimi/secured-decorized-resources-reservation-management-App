import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit
{
  constructor(private route:Router) {
    this.route=route;
  }
  ngOnInit(): void {
    this.route.navigate(['/admin']);  }



}
