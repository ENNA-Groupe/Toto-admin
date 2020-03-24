import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersFormPage } from './users-form.page';

describe('UsersFormPage', () => {
  let component: UsersFormPage;
  let fixture: ComponentFixture<UsersFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
