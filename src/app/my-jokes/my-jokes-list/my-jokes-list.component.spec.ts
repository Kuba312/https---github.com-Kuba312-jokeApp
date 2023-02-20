import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { JokeDto } from 'src/app/api/models/jokeDto';
import { JokeAddComponent } from 'src/app/shared/joke-add/joke-add.component';
import { CategoryDataPipe } from 'src/app/shared/pipes/category.pipe';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { ShowJokeComponent } from 'src/app/shared/show-joke/show-joke.component';
import { MyJokesListComponent } from './my-jokes-list.component';

describe('MyJokesComponent', () => {
  let component: MyJokesListComponent;
  let fixture: ComponentFixture<MyJokesListComponent>;
  let storeMock: any;
  let dialogMock: any;
  let appMessageServiceMock: any;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    appMessageServiceMock = jasmine.createSpyObj('AppMessageService', ['openMessageBar']);

    await TestBed.configureTestingModule({
      declarations: [MyJokesListComponent, ShowJokeComponent, CategoryDataPipe],
      imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        MatDialogModule
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: AppMessageService, useValue: appMessageServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJokesListComponent);
    dialogMock = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load my jokes', () => {
    const jokes: JokeDto[] = [{ id: '1', content: 'test joke' }];
    storeMock.pipe.and.returnValue(of(jokes));
    component.ngOnInit();
    component.myJokes$.subscribe(jokes => {
      expect(jokes).toEqual(jokes);
    });
  });

  it('should show joke details', () => {
    const joke: JokeDto = { id: '1', content: 'test joke' };
    const dialogSpy = spyOn(dialogMock, 'open').and.returnValue({
      afterClosed: () => of(joke)
    } as MatDialogRef<ShowJokeComponent>);
    component.showDetails(joke);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call loadMyJokes() if joke is added', fakeAsync(() => {
    const joke: JokeDto = { id: '1', content: 'Test joke' };
    const dialogRef = {
      afterClosed: () => of(joke)
    } as MatDialogRef<JokeAddComponent>;
  
    spyOn(component, 'loadMyJokes');
  
    spyOn(dialogMock, 'open').and.returnValue(dialogRef);
  
    component.openAddDialog();
    tick();
  
    expect(dialogMock.open).toHaveBeenCalled();
  
    expect(component.loadMyJokes).toHaveBeenCalled();
  }));
});
