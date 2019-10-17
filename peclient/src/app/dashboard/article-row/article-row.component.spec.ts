import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRowComponent } from './article-row.component';

describe('ArticleRowComponent', () => {
  let component: ArticleRowComponent;
  let fixture: ComponentFixture<ArticleRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
