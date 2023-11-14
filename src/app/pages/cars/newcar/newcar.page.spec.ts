import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewcarPage } from './newcar.page';

describe('NewcarPage', () => {
  let component: NewcarPage;
  let fixture: ComponentFixture<NewcarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewcarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
