import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { MOCK_JOKES } from 'server/mock-data';
import { JokeItemComponent } from 'src/app/shared/joke-item/joke-item.component';
import { CategoryDataPipe } from 'src/app/shared/pipes/category.pipe';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { JokesListComponent } from './jokes-list.component';

describe('JokesListComponent', () => {
  let component: JokesListComponent;
  let fixture: ComponentFixture<JokesListComponent>;
  let dialogMock: MatDialog;
  let appMessageService: any;
  let appMesageServiceSpy: any;
  let mockStore: MockStore;
  let storeMock: any;
  let el: DebugElement;
  let initialState = {
    jokes: {
      ids: [],
      entities: {}
    }
  };

  beforeEach(waitForAsync(() => {
    storeMock = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [JokesListComponent, MockComponent(JokeItemComponent), CategoryDataPipe],
      imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatCardModule,
        MatTooltipModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: AppMessageService, useValue: appMesageServiceSpy },
        provideMockStore({ initialState })
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesListComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'jokes$', { writable: true });
    appMessageService = TestBed.inject(AppMessageService);
    dialogMock = TestBed.inject(MatDialog);
    el = fixture.debugElement;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render proper values in the template', () => {
    let buttons = el.queryAll(By.css('.btn'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].nativeElement.textContent).toBe(' Dodaj ');
  });

  it('should render proper amount of jokes', () => {
    component.jokes$ = of(MOCK_JOKES);
    fixture.detectChanges();
    let jokes = el.queryAll(By.css('.slider__slide'));
    expect(jokes.length).toBe(2);
  });

  it('should render joke item component correctly', () => {
    component.jokes$ = of(MOCK_JOKES);
    fixture.detectChanges();
    const jokeItemComponent = fixture.debugElement.query(By.directive(JokeItemComponent)).componentInstance;
    expect(jokeItemComponent).toBeTruthy();
  });

  it('should call open dialog with adding new joke', () => {
    spyOn(component, 'openAddDialog');
    let buttons = el.queryAll(By.css('.btn'));
    buttons[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.openAddDialog).toHaveBeenCalled();
  });

  it('should show new joke if next onNext method is called', () => {
    component.jokes$ = of(MOCK_JOKES);
    fixture.detectChanges();
    component.onNext();
    fixture.detectChanges();

    let slides = el.queryAll(By.css('.slider__slide'));
    expect(slides[0].nativeElement.style.transform).toBe('translateX(-100%)')
  });

  it('should show new joke if next onPrevious method is called', () => {
    component.jokes$ = of(MOCK_JOKES);
    fixture.detectChanges();
    component.onNext();
    component.onPrevious();
    fixture.detectChanges();
    let slides = el.queryAll(By.css('.slider__slide'));
    
    expect(slides[0].nativeElement.style.transform).toBe('translateX(0%)');
  });


})
