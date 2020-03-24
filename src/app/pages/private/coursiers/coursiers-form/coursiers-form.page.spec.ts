import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoursiersFormPage } from './coursiers-form.page';

describe('CoursiersFormPage', () => {
  let component: CoursiersFormPage;
  let fixture: ComponentFixture<CoursiersFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursiersFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursiersFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
