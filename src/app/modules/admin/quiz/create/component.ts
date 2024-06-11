
// ================================================================================>> Core Library
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild, inject,EventEmitter,Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


// ================================================================================>> Thrid Party Library
// Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';

// RxJS
import { Subject } from 'rxjs';
// ================================================================================>> Custom Library
// Helper
import { SnackbarService } from 'helpers/services/snack-bar/snack-bar.service';
import { GlobalConstants } from 'helpers/shared/global-constants';
// import { HelpersViewerComponent } from 'helpers/shared/viewer/component';
import { PortraitComponent } from 'helpers/shared/portrait/portrait.component';

// Local
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuizService } from '../server';
import { CreateItem,Item } from '../interface';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'create-guest',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    standalone: true,
    imports: [
        RouterModule,
        FormsModule,
        MatIconModule,
        CommonModule,
        MatTooltipModule,
        AsyncPipe,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        MatRadioModule,
        MatDialogModule,
        PortraitComponent,
    ]
})
export class CreateComponent implements OnInit, OnDestroy {
    @Input() src: string = 'assets/images/avatars/image-icon.jpg';

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    ResponseData = new EventEmitter<CreateItem>()
    createForm: UntypedFormGroup;
    saving: boolean = false;
    isLoading: boolean;


    constructor(
        @Inject(MAT_DIALOG_DATA) public title: string,
        private dialogRef: MatDialogRef<CreateComponent>,
        private formBuilder: UntypedFormBuilder,
        private snackBarService: SnackbarService,
        private quizService: QuizService
    ) { }

    ngOnInit(): void {
        this.ngBuilderForm();
    }
    ngBuilderForm(): void {
        this.createForm = this.formBuilder.group({
            name : [null, [Validators.required]],
        });
    }
  
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    submit() {
        if (this.createForm.valid && !this.saving) {
            // Disable the button during form submission
            this.saving = true;
            const body = {
                ...this.createForm.value
            };

            this.quizService.create(body).subscribe({
                next: (response) => {
                    this.ResponseData.emit(response.data);
                    this.dialogRef.close();
                    this.snackBarService.openSnackBar(response.message, GlobalConstants.success);
                },
                error: (err: HttpErrorResponse) => {
                    this.saving = false; // Enable the button if an error occurs
                    const errors: { field: string, message: string }[] | undefined = err.error.errors;
                    let message: string = err.error.message ?? GlobalConstants.genericError;
                    if (errors && errors.length > 0) {
                        message = errors.map((obj) => obj.message).join(', ')
                    }
                    this.snackBarService.openSnackBar(message, GlobalConstants.error);
                },
                complete: () => {
                    this.saving = false;  // Enable the button after form submission is complete
                }
            });
        }
    }
    closeDialog() {
        this.dialogRef.close();
    }
}



