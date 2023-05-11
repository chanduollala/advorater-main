import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    goHome() {
        this.router.navigate(['advorater//main']);
    }

    goDisclaimer() {

        this.router.navigate(['advorater//disclaimer']);
    }

    goTerms() {
        this.router.navigate(['advorater//terms']);
    }

    goPrivacy() {
        this.router.navigate(['advorater//privacy']);
    }

    goCareers() {
        this.router.navigate(['advorater//careers']);
    }

    goRefund() {
        this.router.navigate(['advorater//refund']);
    }
}
