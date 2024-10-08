import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivoComponent } from './reactivo.component';

describe('ReactivoComponent', () => {
  let component: ReactivoComponent;
  let fixture: ComponentFixture<ReactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
