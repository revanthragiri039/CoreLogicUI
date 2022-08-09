import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  Logout()
  {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
