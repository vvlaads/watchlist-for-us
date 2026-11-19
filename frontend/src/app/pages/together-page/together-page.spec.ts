import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TogetherPage } from './together-page';

describe('TogetherPage', () => {
  let component: TogetherPage;
  let fixture: ComponentFixture<TogetherPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TogetherPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TogetherPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
