import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoursiersListPage } from './coursiers-list.page';

describe('CoursiersListPage', () => {
  let component: CoursiersListPage;
  let fixture: ComponentFixture<CoursiersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursiersListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursiersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
