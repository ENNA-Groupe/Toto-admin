import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarifDistanceListPage } from './tarif-distance-list.page';

describe('TarifDistanceListPage', () => {
  let component: TarifDistanceListPage;
  let fixture: ComponentFixture<TarifDistanceListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifDistanceListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifDistanceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
