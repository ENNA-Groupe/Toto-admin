import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarifsColisListPage } from './tarifs-colis-list.page';

describe('TarifsColisListPage', () => {
  let component: TarifsColisListPage;
  let fixture: ComponentFixture<TarifsColisListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifsColisListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifsColisListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
