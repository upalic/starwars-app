import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarwarsListComponent } from './starwars-list.component';

describe('StarwarsListComponent', () => {
  let component: StarwarsListComponent;
  let fixture: ComponentFixture<StarwarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarwarsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarwarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
