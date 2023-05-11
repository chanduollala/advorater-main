import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaymentServiceService} from "../../services/payment-service/payment-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  id
  constructor(private activatedRoute:ActivatedRoute,private http: HttpClient, private paymentService: PaymentServiceService, private formBuilder:FormBuilder, private router:Router, private snack: MatSnackBar) {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.order_detail.get('user_id')?.setValue(Number.parseInt(this.id!))

  }


  order_detail = this.formBuilder.group({
    "user_id": [0],
    "receipt": "receipt#1",
  })

  ngOnInit(): void {
  }


  rzp1: any;
  paid?: boolean = false
  payment_id? :string
  order_id?: string
  sign?: string

  successHandler(response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any }, id:any) {
    this.paymentService.paymentSuccess({"payment_id": response.razorpay_payment_id, "signature": response.razorpay_signature, "is_success": true, "payment_method": "Razorpay"}, id).subscribe(
      (response1)=>{

        this.paid=true

        this.payment_id = response.razorpay_payment_id
        this.order_id = response.razorpay_order_id
        this.sign =response.razorpay_signature
        console.log(response)
        this.gotoProfile()
      }
    )
  }

  gotoProfile(){
    this.router.navigate(['/profile']).then(
      ()=>{
        window.location.reload()
      }
    )

  }

  pay() {
    this.paymentService.newOrder(this.order_detail.value).subscribe(
      response => {
        console.log(response)
        let order_id: string = (response['order_id'])
        let server_payment_id = response.id


        var options = {
          "key": "rzp_test_pnIRFdBFWZ1fmH", // Enter the Key ID generated from the Dashboard
          "amount": "200000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Advorater",
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "handler": (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; })=>{
            this.successHandler(response, server_payment_id)
          },
          "order_id": order_id,
          "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
          },
          "notes": {
            "address": "Razorpay Corporate Office"
          },
          "theme": {
            "color": "#3399cc"
          }
        };
        this.rzp1 = new this.paymentService.nativeWindow.Razorpay(options)
        this.rzp1.open();
      }
    )


  }
}
