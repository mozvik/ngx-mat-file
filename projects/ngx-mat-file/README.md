# File input component for Angular Material

## Description

- Preview option
- Drag & Drop support
- Can be used with both reactive and template driven forms
- `Validators`, like required, min, max-length and file size
- Works within `mat-form-field`

## Demo

[Stackblitz](https://stackblitz.com/edit/angular-ivy-m2v6mv)

[Demo](https://mozvik.github.io/ngx-mat-file/)

## Install

Install ngx-mat-file

```
npm i ngx-mat-file
```

## API Reference

```ts
import { NgxMatFileModule } from 'ngx-mat-file';

@NgModule({
  imports: [ NgxMatFileModule ]
})
```

Selector: `ngx-mat-file`

### Properties

| Name                                | Type                | Default                                      | Description                                                             |
| ----------------------------------- | ------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| @Input() required                   | `boolean`           | false                                      | Whether the component is required.                                      |
| @Input() multiple                   | `boolean`           | false                                      | Allows multiple file selection.                                         |
| @Input() accept                     | `string`            | empty                                      | Accepting file types.                                                   |
| @Input() preview                    | `boolean`           | true                                       | Enable image preview.                                                   |
| @Input() previewWidth               | `string \| number`  | 200px                                      | Size of preview in pixels.                                              |
| @Input() hiddenUpload               | `boolean`           | false                                      | Hide or show Upload button.                                             |
| @Input() minlength                  | `number`            | 1                                          | Minimum number of files.                                                |
| @Input() maxlength                  | `number`            | 3                                          | Maximum number of files.                                                |
| @Input() maxFileSize                | `number`            | 5                                          | Maximum file size in megabytes.                                         |
| @Input() buttonVariant              | `string`            | mat-flat-button                            | [Button style.](https://material.angular.io/components/button/overview) |
| @Input() buttonBrowseText           | `string`            | Browse                                     | Label of browse button                                                  |
| @Input() buttonUploadText           | `string`            | Upload                                     | Label of upload button                                                  |
| @Input() buttonRemoveAllText        | `string`            | Remove All                                 | Label of remove all button                                              |
| @Input() dragAndDropText            | `string`            | Drag & drop files here                     | Label of dropzone                                                       |
| @Input() invalidMinFileCountMessage | `string`            | Minimum {0} file(s) required               | Custom error message                                                    |
| @Input() invalidMaxFileCountMessage | `string`            | Maximum number of files exceeded           | Custom error message                                                    |
| @Input() invalidFileTypeMessage     | `string`            | Invalid file type. Allowed file types: {0} | Custom error message                                                    |
| @Input() invalidFileSizeMessage     | `string`            | Maximum size: {0} MB                       | Custom error message                                                    |
|                                     |                     |                                              |                                                                         |
| @Output() onUploadClick             | `EventEmitter<any>` | -                                            | Event emitted when upload button clicked.                               |


## Usage

### Template driven

```html
<mat-form-field appearance="outline">
  <ngx-mat-file
    [required]=true
    [multiple]=false
    [minlength]=2
    [maxlength]=5
    [maxFileSize]=10
    (onUploadClick)="yourUploadFunction(files)"
    [(ngModel)]="files"
    name="fileInput">
  </ngx-mat-file>
</mat-form-field>
```

### Reactive

```html
<mat-form-field appearance="outline">
  <ngx-mat-file
    [required]=true
    accept="image/*"
    [minlength]="3" 
    [multiple]="true"
    [preview]="true"
    [hiddenUpload]="true"
    previewWidth=100
    formControlName="files">
  </ngx-mat-file>
</mat-form-field>
```




## License

MIT
