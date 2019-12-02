import { Component, OnInit, Input } from '@angular/core';
import { Utils } from '../utils';

@Component({
  selector: 'app-generic-object-editor',
  templateUrl: './generic-object-editor.component.html',
  styleUrls: ['./generic-object-editor.component.css']
})
export class GenericObjectEditorComponent implements OnInit {

  @Input()
  obj: Object;


  constructor() { }

  ngOnInit() {
  }

  getObjectKeys(obj: Object) {
    return Object.keys(obj);
  }

  isObject(obj) {
    return Utils.isJSObject(obj);
  }

  isArray(obj) {
    return Array.isArray(obj);
  }

}
