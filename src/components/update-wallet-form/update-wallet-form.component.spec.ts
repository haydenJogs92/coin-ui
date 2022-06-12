import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWalletFormComponent } from './update-wallet-form.component';

describe('UpdateWalletFormComponent', () => {
  let component: UpdateWalletFormComponent;
  let fixture: ComponentFixture<UpdateWalletFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWalletFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWalletFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
