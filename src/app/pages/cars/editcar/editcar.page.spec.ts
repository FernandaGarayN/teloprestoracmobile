import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditcarPage } from './editcar.page';

describe('EditcarPage', () => {
  let component: EditcarPage;
  let fixture: ComponentFixture<EditcarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditcarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
