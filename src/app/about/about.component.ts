import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  register() {
    // const dialogRef = this.dialog.open(SignupDialogComponent, {
    //   width: '450px',
    //   maxWidth: '95%',
    //   data: {},
    //
    //
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //
    // });
  }

}
