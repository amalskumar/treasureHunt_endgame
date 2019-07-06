import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimpointComponent } from './claimpoint.component';

describe('ClaimpointComponent', () => {
  let component: ClaimpointComponent;
  let fixture: ComponentFixture<ClaimpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
