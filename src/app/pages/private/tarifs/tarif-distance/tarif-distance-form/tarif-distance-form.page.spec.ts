import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarifDistanceFormPage } from './tarif-distance-form.page';

describe('TarifDistanceFormPage', () => {
  let component: TarifDistanceFormPage;
  let fixture: ComponentFixture<TarifDistanceFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifDistanceFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifDistanceFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
