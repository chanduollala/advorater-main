import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {

  list: any[] = [];
  temp_list: any[] = [];
  keyword = "";
  _img: any;
  _display_label: any;
  _return_value: any;
  @Output() afterChange = new EventEmitter();
  @ViewChild("input", {static: false}) input: ElementRef | undefined;

  @Input("items") set items(value: any) {
    this.list = value;
    this.temp_list = value;
  }

  @Input("display_label") label: string | undefined;
  @Input("value") uid: string | undefined;
  @Input("placeholder") placeholder: string | undefined
  onChange: any = () => {
  };
  onTouch: any = () => {
  };
  // @ts-ignore
  display_value: any = (typeof this.placeholder !== 'undefined' && this.placeholder !== '') ? this.placeholder : 'Select';
  shown = false;

  constructor(private ele: ElementRef) {
  }

  ngOnChanges() {
    this._display_label = (typeof this.label !== 'undefined' && this.label !== '') ? this.label : 'name';
    this._return_value = (typeof this.uid !== 'undefined' && this.uid !== '') ? this.uid : 'id';
    this.display_value = (typeof this.placeholder !== 'undefined' && this.placeholder !== '') ? this.placeholder : 'Select';
  }

  writeValue(value: any) {
    if (value) {
      this.temp_list.map(x => {
        if (x[this._return_value] == value) {
          this.display_value = x[this._display_label];
        }
      })
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  search(e: any) {
    const val = e.toLowerCase();
    // @ts-ignore
    const temp: any[] = this.temp_list.filter(x => {
      // @ts-ignore
      if (x[this._display_label].toLowerCase().indexOf(val) !== -1 || !val) {
        return x;
      }
    });
    this.list = temp;
    if (this.list==[]){
      this.show()
    }
  }

  select(item: any) {
    this.onChange(`${item[this._return_value]}`);
    this.display_value = `${item[this._display_label]}`;
    this.shown = false;
    //this.afterChange.emit(item);
  }

  show() {
    console.log(this.shown)
    this.shown = !this.shown;
    setTimeout(() => {
      this.input!.nativeElement.focus();
    }, 200);
  }

  @HostListener("document:click", ["$event"]) onClick(e: any) {
    if (!this.ele.nativeElement.contains(e.target)) {
      this.shown = false;
    }
  }

  ngOnInit(): void {
  }

}
