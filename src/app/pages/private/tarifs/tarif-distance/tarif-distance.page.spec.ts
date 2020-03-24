import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarifDistancePage } from './tarif-distance.page';

describe('TarifDistancePage', () => {
  let component: TarifDistancePage;
  let fixture: ComponentFixture<TarifDistancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifDistancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifDistancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
