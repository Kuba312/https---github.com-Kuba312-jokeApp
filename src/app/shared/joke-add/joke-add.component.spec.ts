import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppMessageService } from '../services/app-message.service';

import { JokeAddComponent } from './joke-add.component';
import { JokeAddFormModel } from './joke-add.form-model';

describe('JokeAddComponent', () => {
  let component: JokeAddComponent;
  let fixture: ComponentFixture<JokeAddComponent>;

  let appMessageService: any;
  let appMesageServiceSpy: any;
  let dialogRefSpy: any;
  let dialogRef: any;
  let el: DebugElement;


  beforeEach(async () => {
    appMesageServiceSpy = jasmine.createSpyObj('AppMessageService', ['openMessageBar']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [ JokeAddComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTooltipModule,
        MatSnackBarModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AppMessageService, useValue: appMesageServiceSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeAddComponent);
    component = fixture.componentInstance;
    appMessageService = TestBed.inject(AppMessageService);
    dialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render initial form', () => {
    component.formModel  = new JokeAddFormModel();
    fixture.detectChanges();
    const controls = {
      category: "",
      content: "",
    };
    expect(component.formModel.formGroup.value).toEqual(controls);
  });

});
