import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnginsPage } from './engins.page';

describe('EnginsPage', () => {
  let component: EnginsPage;
  let fixture: ComponentFixture<EnginsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnginsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
