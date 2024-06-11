
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
import { Observable, Subject, map, startWith } from 'rxjs';
// ================================================================================>> Custom Library
// Environment
import { environment as env } from 'environments/environment';
// Helper
import { SnackbarService } from 'helpers/services/snack-bar/snack-bar.service';
import { GlobalConstants } from 'helpers/shared/global-constants';
// import { HelpersViewerComponent } from 'helpers/shared/viewer/component';
import { PortraitComponent } from 'helpers/shared/portrait/portrait.component';

// Local
import { LoadingSpinnerService } from 'helpers/shared/loading/loading.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuizService } from '../server';
import { Create,DataSetup } from '../interface';
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
    ResponseData = new EventEmitter<CreateComponent>()
    createForm: UntypedFormGroup;
    saving: boolean = false;
    isLoading: boolean;
    sexOptions: { id: number; name: string }[] = [
        { id: 1, name: 'ប្រុស' },
        { id: 2, name: 'ស្រី' },

    ];


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
            sex_id : [null, [Validators.required]],
            sure_name : [null, [Validators.required]],
            given_name: [null, [Validators.required]],
            lattin_name : [null, [Validators.required]],
            phone : [null, [Validators.required]],
            email : [null, [Validators.required]],
            facebook : [null, [Validators.required]],
            telegram : [null, [Validators.required]],
            card_no : [null, [Validators.required]],
            pob : [null, [Validators.required]],
            dob : [null, [Validators.required]],
            address : [null, [Validators.required]],
            contact_name : [null, [Validators.required]],
            contact_phone : [null, [Validators.required]],
            contact_email : [null, [Validators.required]],
            contact_facebook : [null, [Validators.required]],
            contact_telegram : [null, [Validators.required]],
            contact_address : [null, [Validators.required]],
            image : [null]
        });
    }
    srcChange(base64: string): void {
        this.createForm.get('image').setValue(base64);
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
