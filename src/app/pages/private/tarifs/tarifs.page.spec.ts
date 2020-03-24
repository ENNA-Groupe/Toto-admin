import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarifsPage } from './tarifs.page';

describe('TarifsPage', () => {
  let component: TarifsPage;
  let fixture: ComponentFixture<TarifsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
