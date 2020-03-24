import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarifColisPage } from './tarif-colis.page';

describe('TarifColisPage', () => {
  let component: TarifColisPage;
  let fixture: ComponentFixture<TarifColisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifColisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifColisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
