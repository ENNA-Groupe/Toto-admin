import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnginsFormPage } from './engins-form.page';

describe('EnginsFormPage', () => {
  let component: EnginsFormPage;
  let fixture: ComponentFixture<EnginsFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginsFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnginsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
