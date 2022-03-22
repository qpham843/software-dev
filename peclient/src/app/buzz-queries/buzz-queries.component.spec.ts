import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuzzQueriesComponent } from './buzz-queries.component';

describe('BuzzQueriesComponent', () => {
  let component: BuzzQueriesComponent;
  let fixture: ComponentFixture<BuzzQueriesComponent>;

  beforeEach(waitForAsync(() => {
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
