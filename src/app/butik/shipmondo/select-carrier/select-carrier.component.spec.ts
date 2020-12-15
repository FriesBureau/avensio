import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCarrierComponent } from './select-carrier.component';

describe('SelectCarrierComponent', () => {
  let component: SelectCarrierComponent;
  let fixture: ComponentFixture<SelectCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
