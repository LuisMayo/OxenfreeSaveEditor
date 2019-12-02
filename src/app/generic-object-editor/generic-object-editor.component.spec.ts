import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericObjectEditorComponent } from './generic-object-editor.component';

describe('GenericObjectEditorComponent', () => {
  let component: GenericObjectEditorComponent;
  let fixture: ComponentFixture<GenericObjectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericObjectEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericObjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
