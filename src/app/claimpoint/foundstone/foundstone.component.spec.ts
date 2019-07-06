import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundstoneComponent } from './foundstone.component';

describe('FoundstoneComponent', () => {
  let component: FoundstoneComponent;
  let fixture: ComponentFixture<FoundstoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundstoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundstoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
