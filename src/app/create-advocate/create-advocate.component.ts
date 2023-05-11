import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SignupService} from "../../services/signup-service/signup.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {AdminService} from "../../services/admin.service";
import {ImageCompress} from "ngx-image-compress/lib/image-compress";
import {NgxImageCompressService} from "ngx-image-compress";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-advocate',
  templateUrl: './create-advocate.component.html',
  styleUrls: ['./create-advocate.component.css']
})
export class CreateAdvocateComponent implements OnInit {

  id:string | null
  user_id?:string
  user_detail_id?:string
  contact_detail_id? :string

  username?: string

  cities =[]
  specs:{id: number,
    title: string,
    tag_type_id: number}[] = []
  doc_types=[]

  current_year = new Date().getFullYear()

  experience = new FormControl()
  selected_tag = new FormControl()

  filteredTags: any[] = this.specs


  constructor(private activatedRoute: ActivatedRoute,private router:Router, private signupService:SignupService, private _formBuilder: FormBuilder, private adminService: AdminService, private compress: NgxImageCompressService, private snack: MatSnackBar) {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.signupService.getAdvocate1(this.id!).subscribe((response)=>{
      if(response.id){
        this.username  = response.user?.username
        this.user_id = response.user.id
        this.user_detail_id = response.user.user_detail.id
        this.contact_detail_id = response.user.user_detail.contact_detail_id
        console.log(this.username)
        this.contact_email?.setValue(this.username!)
        this.user_id_form?.setValue(Number.parseInt(this.user_id!))
        this.user_detail_id_form?.setValue(Number.parseInt(this.user_detail_id!))
        this.contact_detail_id_form?.setValue(Number.parseInt(this.contact_detail_id!))
        this.contact_email?.disable()
      }
    })


    this.experience?.valueChanges.subscribe((value)=>{
      this.career_start_year?.setValue(this.current_year-this.experience?.value!)
    })


    this.selected_tag?.valueChanges.subscribe((value)=>{
      this.tags.push(this.newTag(Number.parseInt(value)))
      // @ts-ignore
      this.filteredTags = this.specs.filter((spec)=> {
        if (!this.selectedTags.includes(spec.id)) return spec
      })
    })
  }

  ngOnInit(): void {
    this.adminService.getCities().subscribe(
      response => {
        console.log(response)
        for (let data in response) {
          // @ts-ignore
          this.cities.push(response[data])
        }
      }
    );
    this.adminService.getSpecializations().subscribe(
      response => {
        for (let data in response) {
          // @ts-ignore
          this.specs.push(response[data])
        }
      }
    );

    this.adminService.getDocTypes().subscribe(
      response => {
        for (let data in response) {
          console.log(response)
          if (response[data].id!=5){
            // @ts-ignore
            this.doc_types.push(response[data])
          }

        }
      }
    );
  }


  professionalDetails = this._formBuilder.group({
    bar_registration_attributes: this._formBuilder.group({
      document_number: ['', Validators.required],
      document_type_id: [5],
      file: [null, Validators.required]
    }),
    office_address_attributes: this._formBuilder.group({
      door_no: ['', Validators.required],
      street: [''],
      city_id: [null, Validators.required],
      pincode: ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.minLength(6)])],
      address_type: ['O']
    }),
    is_live: [false],
    bio: [''],
    consultation_fee: ['', Validators.required],
    is_verified: [false],
    career_start_year: [0, Validators.required],
    form_number: [''],
    operational_city_id: [null, Validators.required],
    rating: [''],
    advocate_tags_attributes: this._formBuilder.array([]),
    user_attributes: this._formBuilder.group({
      id: [0],
      user_type: 'A',
      user_detail_attributes: this._formBuilder.group({
        id: [0],
        gender: ['F', Validators.required],
        dob: [new Date(), Validators.required],
        name_attributes: this._formBuilder.group({
          first_name: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')])],
          middle_name: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')])],
          last_name: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')])],
        }),
        image: [null],
        address_attributes: this._formBuilder.group({
          door_no: ['', Validators.required],
          street: [''],
          city_id: [null, Validators.required],
          pincode: ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.minLength(6)])],
          address_type: ['P']
        }),
        contact_detail_attributes: this._formBuilder.group({
          id: [0],
          phone1: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)])],
          phone2: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)])],
          contact_email: ['', Validators.compose([Validators.required, Validators.email])],
        }),
        id_proof_attributes: this._formBuilder.group({
          document_number: [''],
          document_type_id: [null],
          file: [null]
        })
      })
    })
  })


  username_form = this.professionalDetails.get('user_attributes')?.get('username')
  user_id_form = this.professionalDetails.get('user_attributes')?.get('id')
  user_detail_id_form = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('id')
  contact_detail_id_form = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('contact_detail_attributes')?.get('id')

  bio= this.professionalDetails.get('bio')
  bar_registration_number = this.professionalDetails.get('bar_registration_attributes')?.get('document_number')
  consultation_fee = this.professionalDetails.get('consultation_fee')
  office_door_no = this.professionalDetails.get('office_address_attributes')?.get('door_no')
  office_street = this.professionalDetails.get('office_address_attributes')?.get('street')
  office_city_id = this.professionalDetails.get('office_address_attributes')?.get('city_id')
  office_pincode = this.professionalDetails.get('office_address_attributes')?.get('pincode')
  bar_proof_file = this.professionalDetails.get('bar_registration_attributes')?.get('file')
  career_start_year = this.professionalDetails.get('career_start_year')
  operational_city_id = this.professionalDetails.get('operational_city_id')
  image = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('image')
  first_name = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('name_attributes')?.get('first_name')
  middle_name = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('name_attributes')?.get('middle_name')
  last_name = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('name_attributes')?.get('last_name')
  dob = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('dob')
  gender = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('gender')
  phone1 = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('contact_detail_attributes')?.get('phone1')
  phone2 = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('contact_detail_attributes')?.get('phone2')
  contact_email = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('contact_detail_attributes')?.get('contact_email')
  id_proof_file = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('id_proof_attributes')?.get('file')
  id_proof_number = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('id_proof_attributes')?.get('document_number')
  id_proof_type = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('id_proof_attributes')?.get('document_type_id')

  door_no = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('address_attributes')?.get('door_no')
  street = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('address_attributes')?.get('street')
  city_id = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('address_attributes')?.get('city_id')
  pincode = this.professionalDetails.get('user_attributes')?.get('user_detail_attributes')?.get('address_attributes')?.get('pincode')


  profilePic: File | undefined;
  idProofFile: File | undefined;
  barProofFile: File | undefined;



  profilePicURL: any = "assets/advocate-icon.png";
  idProofURL: any = "assets/id.png";
  barProofURL: any;


  public message: string | undefined;


  public profilePicPath: any;
  public idProofPath: any;
  public barProofPath: any;





  preview(){
    const MAX_MEGABYTE = 2;
    this.compress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
      .then(
        (result) => {
          console.log(this.image?.value)
          // @ts-ignore
          this.image?.setValue(result);
          console.log(this.image?.value)
        },
        (result: string) => {
          console.error(
            "The compression algorithm didn't succeed! The best size we can do is",
            this.compress.byteCount(result),
            'bytes'
          );
          // @ts-ignore
          this.image?.setValue(result);
          this.snack.open('Sorry! File too large or too small')
        }
      );
  }


  //
  // preview1(files: any) {
  //   if (files.length === 0)
  //     return;
  //
  //   var mimeType = files[0].type;
  //   this.profilePic = files[0]
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }
  //
  //   console.log(this.profilePic)
  //
  //   var reader = new FileReader();
  //   this.profilePicPath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.profilePicURL = reader.result;
  //     // @ts-ignore
  //     this.image!.setValue(this.profilePicURL)
  //     console.log(this.image!.value)
  //   }
  // }

  previewIDProof() {
    const MAX_MEGABYTE = 5;
    this.compress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
      .then(
        (result) => {
          console.log(this.id_proof_file?.value)
          // @ts-ignore
          this.id_proof_file?.setValue(result);
        },
        (result: string) => {
          console.error(
            "The compression algorithm didn't succeed! The best size we can do is",
            this.compress.byteCount(result),
            'bytes'
          );
          this.snack.open('Sorry! File too large')
        }
      );
  }



  previewBarProof() {
    const MAX_MEGABYTE = 5;
    this.compress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
      .then(
        (result) => {
          // @ts-ignore
          this.bar_proof_file?.setValue(result);
          console.log(this.bar_proof_file?.value)
        },
        (result: string) => {
          console.error(
            "The compression algorithm didn't succeed! The best size we can do is",
            this.compress.byteCount(result),
            'bytes'
          );
          this.snack.open('Sorry! File too large')
        }
      );
  }










  tags_list: {
    id: null,
    title: "",
    tag_type_id: null
  }[] = [];

  tags_control = new FormControl()


  tag_title(value: number): string {
    return this.specs.find(tag => tag?.id === value)!.title
  }



  get selectedTags(): any[]{
    let arr = []
    for (let i=0; i<this.tags.length;i++){
      arr.push(this.tags.value[i].tag_id)
    }
    return arr
  }

  get tags(): FormArray {
    return this.professionalDetails.get('advocate_tags_attributes') as FormArray
  }

  newTag(tag_id: number): FormGroup {
    return this._formBuilder.group({
      tag_id: tag_id
    })
  }



  removeTag(index: number) {
    this.tags.removeAt(index)
  }


  submit() {
    console.log(JSON.stringify(this.professionalDetails.value))
    if( this.professionalDetails.valid){
      this.signupService.newAdvocateStep2(this.professionalDetails.value, this.id!).subscribe((response) => {
          if (response.id != null) {
            this.router.navigate([`/payment/${this.user_id}`])
          }
        }
      )
    }


  }



  displayFn(tag: any) {
    return tag.title
  }


}
