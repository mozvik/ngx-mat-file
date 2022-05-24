import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';

import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-mat-file',
  templateUrl: './ngx-mat-file.component.html',
  styleUrls: [ './ngx-mat-file.component.css'
  ],
  providers: [
    { provide: MatFormFieldControl, useExisting: NgxMatFileComponent },
  ]
})

export class NgxMatFileComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<Array<File>>  {
  @Input() preview = true
  @Input() hiddenUpload = false;
  @Input() buttonBrowseText = "Browse";
  @Input() buttonUploadText = "Upload";
  @Input() buttonRemoveAllText = "Remove All";
  @Input() buttonVariant = "mat-flat-button";
  @Input() minlength: any = 1;
  @Input() invalidMinFileCountMessage = "Minimum {0} file(s) required";
  @Input() maxlength: any = 3;
  @Input() invalidMaxFileCountMessage = "Maximum number of files exceeded";
  @Input() invalidFileTypeMessage = "Invalid file type. \nAllowed file types: {0}";
  @Input() maxFileSize = 5;
  @Input() invalidFileSizeMessage = "Maximum size: {0} MB";
  @Input() dragAndDropText = "Drag & drop files here";
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get previewWidth() {
    return this._previewWidth;
  }
  set previewWidth(req: any) {
    this._previewWidth = req.toString();
    this.previewWidthStyle = "max-width: " + this._previewWidth + "px"
    this.stateChanges.next();
  }
  private _previewWidth = 200

  @ViewChild('ngx_mat_file_input', { static: true }) ngx_mat_file_input?: ElementRef;

  private onChange: any = () => {}
  private onTouch: any = () => {}
  public selectedFiles: Array<File> = [] 
  public invalidFiles: Array<any> = []
  public previewData: any = [] 
  files?: any[]
  public previewWidthStyle: string = ""

  //MatFormFieldControl Interface
  static nextId = 0;
  stateChanges = new Subject<void>();
  @HostBinding() id = `app-ngx-mat-file-${NgxMatFileComponent.nextId++}`;
  placeholder: string = "";
  focused: boolean = false;
  touched: boolean = false;
  shouldLabelFloat: boolean = false;
  controlType: string = "app-ngx-mat-file";
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  
  onContainerClick(event: MouseEvent): void { }
  
  get errorState(): boolean {
    return this.ngControl.control?.errors != null && this.ngControl?.control?.touched;
  }

  get empty() {
    let n = this.value;
    return !n.area && !n.exchange && !n.subscriber;
  }
  

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
  this._disabled = coerceBooleanProperty(value);
  this._disabled ? this.ngControl.control?.enable() : this.ngControl.control?.disable();
  this.stateChanges.next();
}
private _disabled = false;
 //MatFormFieldControl Interface

 @Input()
 get multiple(): boolean {
   return this._multiple;
 }
 set multiple(value: boolean) {
   this._multiple = coerceBooleanProperty(value);
 this._multiple ? this.ngx_mat_file_input?.nativeElement.setAttribute("multiple","") : "";
 this.stateChanges.next();
 }
  private _multiple = false;
  
  @Input()
 get accept(): string {
   return this._accept;
 }
 set accept(value: string) {
   this._accept = value;
   this._accept ? this.ngx_mat_file_input?.nativeElement.setAttribute("accept", this._accept) : ""
   this.typeError = this.invalidFileTypeMessage.replace("{0}" , this.accept)
   this.stateChanges.next()
 }
  private _accept = ""
  
  public typeError = ""
  
  set value(val: any) {  
    if (val && this.value !== val && val!=[]) {
      this.stateChanges.next();
      this.onChange(val)
      this.onTouch(val)
    }
  }

  private extensionLists = {
    video: ['ogm', 'wmv', 'ogv', 'mov', 'asx', 'mpeg', 'm4v', 'avi', 'mpg', 'mp4', 'webm'],
    audio: ['opus', 'wav', 'ogg', 'm4a', 'oga', 'mid', 'webm', 'weba', 'flac', 'mp3', 'aiff', 'wma', 'au'],
    image: ['tiff', 'pjp', 'jfif', 'svg', 'xbm', 'dib', 'jxl', 'jpeg', 'webp', 'ico', 'tif', 'pjpeg', 'avif', 'jpg', 'gif', 'bmp', 'png']
  }

@Output() onUploadClick = new EventEmitter<any>();


  constructor(@Optional() @Self() public ngControl: NgControl) {
     if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.interpolation()
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  writeValue(value: any) { 
    if (!value) {
      this.removeAll()
    }
    this.value = value
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }
  
  registerOnTouched(fn: any){
    this.onTouch = fn
  }

  interpolation() {
    this.typeError = this.invalidFileTypeMessage.replace("{0}" , this.accept)
    this.invalidFileSizeMessage = this.invalidFileSizeMessage.replace("{0}", this.maxFileSize.toString())
    this.invalidMinFileCountMessage = this.invalidMinFileCountMessage.replace("{0}", this.minlength.toString())
    this.invalidMaxFileCountMessage = this.invalidMaxFileCountMessage.replace("{0}", this.maxlength.toString())
    this.previewWidthStyle = "max-width: " + this.previewWidth + "px";
  }  

  uploadClick() {
    this.onUploadClick.emit(this.selectedFiles);
  }

  selectionChange(e: any): void {
    this.invalidFiles = []
    let files = e.type == "drop" ? e.dataTransfer.files : e.target.files 

    if (this.selectedFiles.length == 0) {
      this.selectedFiles = []
    } 
    let arr = [...this.selectedFiles] as Array<File>
    
    for (const file of files) {

      if ( this.fileSizeValid(file.size) && 
        this.fileTypeValid(file))
      {
        if (arr.find(f =>
        f.name == file.name &&
        f.size == file.size &&
        f.type == file.type) === undefined) {
          this.selectedFiles.push(file)
          this.computePreviewData(file)
        }
      }
      else if(!this.fileSizeValid(file.size)) {
        this.invalidFiles.push({
          name: file.name,
          size: file.size,
        })      
      } else {
        this.invalidFiles.push({
          name: file.name,
          type: file.type,
        })   
      }
    }

    this.writeValue(this.selectedFiles)
  }

  removeAll() {
    this.selectedFiles = []
    this.invalidFiles = []
    this.previewData = []
    this.writeValue(this.selectedFiles)
  }

  removeFile(index: number) {
    this.invalidFiles = []
    this.ngx_mat_file_input!.nativeElement.value = ""
    this.selectedFiles.splice(index, 1)  
    this.previewData.splice(index, 1)  
    this.writeValue(this.selectedFiles)
  }

  computePreviewData(file: File) {
    if (!this.preview || !this.isImage(file)) {
      return
    }
    
    const reader = new FileReader()
    reader.onload = (value) => {
       this.previewData.push(value.target?.result)
    }
    reader.readAsDataURL(file)
    
  }

  isImage(file: File): boolean{
    return file.type.indexOf('image') != -1
  }

  fileCount(): number {
    return this.selectedFiles.length
  }

  invalidFileCount(): number {
    return this.invalidFiles.length
  }

  fileTypeValid(file: File): boolean {
    const extensions = this.accept.split(',').map(item=>item.trim())

    if (extensions.filter(item=>file.name.endsWith(item.toLowerCase())).length > 0) {
      return true;
    }
    if (this.accept.includes('image') || this.accept.includes('video') || this.accept.includes('audio')) {
      return  this.isValidExtension(file.name, 'image') ||
              this.isValidExtension(file.name, 'video') ||
              this.isValidExtension(file.name, 'audio')
    }
   
    return this.accept.includes(file.type)
  }

  private isValidExtension(fileName: string, property: string) {
    if (!this.extensionLists.hasOwnProperty(property)) {
      return false      
    }
    if (this.accept.includes('/*')){
      if (this.extensionLists[property as keyof typeof this.extensionLists].filter((val: string) => fileName.endsWith(val)).length > 0) {
        return true
      }
      return false
    }
    else {
      if (this.accept.slice(this.accept.indexOf('/')+1) != '' && fileName.endsWith(this.accept.slice(this.accept.indexOf('/')+1))) {
        return true
      }
      return false
    }
  }

  fileSizeValid(fileSize: number): boolean {
    return this.byteToMegabyte(fileSize) <= this.maxFileSize
  }

  byteToMegabyte(byte: number): number{
    return byte / 1048576
  }
}