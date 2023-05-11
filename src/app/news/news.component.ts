import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css', './news.component.scss']
})
export class NewsComponent implements OnInit {

  specs: any[] =[]

  constructor(private adminService: AdminService) {

    this.adminService.getSpecializations().subscribe(
      response => {
        for (let data in response) {
          // @ts-ignore
          this.specs.push(response[data])
          this.specs.push(response[data])
          this.specs.push(response[data])

        }
      }
    );

  }

  ngOnInit(): void {
  }

  public slides = [
    { src: "assets/bg1.png" },
    { src: "assets/bg1.png" },
    { src: "assets/bg1.png" },
    { src: "assets/bg1.png" },
    { src: "assets/bg1.png" },

  ];

  currentSlide = 0;

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }





}
