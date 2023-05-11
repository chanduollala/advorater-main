import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {Advocate} from "../../models/advocate";
import {FormBuilder} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {SearchService} from "../../services/search-service/search.service";
import {LocationService} from "../../services/location service/location.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // @ts-ignore
  @ViewChild('nameSearch') nameSearch: ElementRef;


  cities: any[] = [];
  specs: any[] = [];
  filteredCities!: Observable<any[]>;
  filteredSpecs!: Observable<any[]>;

  responseList!: Advocate[];

  offset: number =0

  current_year = new Date().getFullYear()


  data = this.formBuilder.group({
    city_id: [0],
    name: [''],
    tag_id: [''],
  })

  tag_id = this.data.get('tag_id')


  advocates: Advocate[] = [];

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private searchService: SearchService,
              private locationService: LocationService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {



  }

  ngAfterViewInit(): void {
    this.nameSearch!.nativeElement.focus()
  }


  ngOnInit() {

    this.adminService.getCities().subscribe(
      response => {
        console.log(response)
        for (let data in response) {
          // @ts-ignore
          this.cities.push(response[data])
        }


        this.adminService.getSpecializations().subscribe(
          response => {
            for (let data in response) {
              // @ts-ignore
              this.specs.push(response[data])
            }

            let city_id = Number.parseInt(sessionStorage.getItem('city_id')!)
            let tag_id = this.activatedRoute.snapshot.paramMap.get('tag_id')

            if (tag_id!=null){
              this.data.setValue({
                city_id: city_id,
                tag_id: tag_id,
                name: ''
              })
            }
          }
        );


      }
    );


    this.data.valueChanges.subscribe((value) => {
      this.search(this.data.value)
    })




  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    var s = this.cities.filter(city => city.city_name.toLowerCase().includes(filterValue));
    console.log(s)
    return s
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.specs.filter(option => option.toLowerCase().includes(filterValue));
  }


  search(value: any) {
    this.advocates = []
    console.log("i")
    let s;
    //tag and name
    if (!value.city_id && value.tag_id && value.name.length > 2) {
      console.log('c1 tn')
      s = this.searchService.searchByNameTag(value.name, value.tag_id, 0, 10)
    }
    //city and name
    else if (value.city_id && !value.tag_id && value.name.length > 2) {
      console.log('c2 cn')

      s = this.searchService.searchByNameCity(value.name, value.city_id, 0, 10)
    }
    //city and tag
    else if (value.city_id && value.tag_id && !(value.name.length > 2)) {
      console.log('c3 ct')

      s = this.searchService.searchByTagCity(value.tag_id, value.city_id, 0, 10)
    }
    else if (value.city_id && value.tag_id && value.name.length > 2) {
      console.log('c4 ctn')

      s = this.searchService.searchByNameCityTag(value.name, value.city_id, value.tag_id, 0, 10)
    }

    else if (value.city_id && !value.tag_id && !(value.name.length > 2)) {
      console.log('c5 c')

      s = this.searchService.searchByNameCity('', value.city_id, 0, 10)
    }

    else if (!value.city_id && value.tag_id && !(value.name.length > 2)) {
      console.log('c6 t')

      s = this.searchService.searchByNameTag('', value.tag_id, 0, 10)
    }

    else if (!value.city_id && !value.tag_id && value.name.length>2) {
      console.log('c4 n')
      s = this.searchService.searchByName(value.name, 0, 10)
    }

    if (s) {
      s.subscribe((response: Array<any>) => {
        if (response) {
          console.log(response)

          for (let x = 0; x < response.length; x++)
            this.advocates.push(new Advocate(response[x]))
        }
      })
    }

  }


  loadmore(value: any) {
    let offset = this.advocates.length
    console.log("i")
    let s;
    //tag and name
    if (!value.city_id && value.tag_id && value.name.length > 2) {
      console.log('c1 tn')
      s = this.searchService.searchByNameTag(value.name, value.tag_id, offset, 10)
    }
    //city and name
    else if (value.city_id && !value.tag_id && value.name.length > 2) {
      console.log('c2 cn')

      s = this.searchService.searchByNameCity(value.name, value.city_id, offset, 10)
    }
    //city and tag
    else if (value.city_id && value.tag_id && !(value.name.length > 2)) {
      console.log('c3 ct')

      s = this.searchService.searchByTagCity(value.tag_id, value.city_id, offset, 10)
    }
    else if (value.city_id && value.tag_id && value.name.length > 2) {
      console.log('c4 ctn')

      s = this.searchService.searchByNameCityTag(value.name, value.city_id, value.tag_id, offset, 10)
    }

    else if (value.city_id && !value.tag_id && !(value.name.length > 2)) {
      console.log('c5 c')

      s = this.searchService.searchByNameCity('', value.city_id, offset, 10)
    }

    else if (!value.city_id && value.tag_id && !(value.name.length > 2)) {
      console.log('c6 t')

      s = this.searchService.searchByNameTag('', value.tag_id, offset, 10)
    }

    else if (!value.city_id && !value.tag_id && value.name.length>2) {
      console.log('c4 n')
      s = this.searchService.searchByName(value.name, offset, 10)
    }

    if (s) {
      s.subscribe((response: Array<any>) => {
        if (response) {
          console.log(response)

          for (let x = 0; x < response.length; x++)
            this.advocates.push(new Advocate(response[x]))
        }
      })
    }

  }


  view_advocate(id: number) {
    this.router.navigate([`/view_advocate/${id}`])

  }
}
