import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceTypeComponent } from './add-service-type.component';

describe('AddServiceTypeComponent', () => {
  let component: AddServiceTypeComponent;
  let fixture: ComponentFixture<AddServiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServiceTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
