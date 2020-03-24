import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoursiersPage } from './coursiers.page';

describe('CoursiersPage', () => {
  let component: CoursiersPage;
  let fixture: ComponentFixture<CoursiersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursiersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursiersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
