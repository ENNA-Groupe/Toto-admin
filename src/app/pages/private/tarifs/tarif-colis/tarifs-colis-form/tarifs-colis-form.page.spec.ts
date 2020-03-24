import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarifsColisFormPage } from './tarifs-colis-form.page';

describe('TarifsColisFormPage', () => {
  let component: TarifsColisFormPage;
  let fixture: ComponentFixture<TarifsColisFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifsColisFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifsColisFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
