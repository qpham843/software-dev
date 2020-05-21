import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzzQueriesComponent } from './buzz-queries.component';

describe('BuzzQueriesComponent', () => {
  let component: BuzzQueriesComponent;
  let fixture: ComponentFixture<BuzzQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuzzQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuzzQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
