import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharadeComponent } from './charade.component';

describe('CharadeComponent', () => {
  let component: CharadeComponent;
  let fixture: ComponentFixture<CharadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
