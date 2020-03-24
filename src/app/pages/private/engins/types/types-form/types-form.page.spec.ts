import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypesFormPage } from './types-form.page';

describe('TypesFormPage', () => {
  let component: TypesFormPage;
  let fixture: ComponentFixture<TypesFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypesFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
