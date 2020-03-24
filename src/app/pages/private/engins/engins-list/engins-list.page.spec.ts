import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnginsListPage } from './engins-list.page';

describe('EnginsListPage', () => {
  let component: EnginsListPage;
  let fixture: ComponentFixture<EnginsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnginsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
