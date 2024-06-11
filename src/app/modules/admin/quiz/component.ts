// ================================================================>> Core Library (Angular)
import { Component, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

// ================================================================>> Third Party Library (Angular Material)
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// RxJS
import { Subject, takeUntil } from 'rxjs';

// ================================================================>> Custom Library (Application-specific)
import { SnackbarService } from 'helpers/services/snack-bar/snack-bar.service';
import { GlobalConstants } from 'helpers/shared/global-constants';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HelpersConfirmationConfig, HelpersConfirmationService } from 'helpers/services/confirmation';
import { environment as env } from 'environments/environment';
import { QuizService } from './server';
import { Item, List } from './interface';
// UI Swtich
import { UiSwitchModule} from 'ngx-ui-switch';

import { CreateComponent } from './create/component';
@Component({
    selector: 'quiz',
    standalone: true,
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        NgClass,
        DecimalPipe,
        MatPaginatorModule,
        UiSwitchModule
    ]
})

export class QuizComponent implements OnInit {
   
    constructor(private changeDetectorRef: ChangeDetectorRef) { }
    private quizService                 = inject(QuizService);
    private snackBarService             = inject(SnackbarService);
    private helpersConfirmationService  = inject(HelpersConfirmationService);
    private _unsubscribeAll: Subject<List> = new Subject<List>();
    displayedColumns: string[]          = ['no', 'name', 'active', 'n_of_question', 'action'];
    dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>([]);

    fileUrl         : string    = env.FILE_BASE_URL; // Assuming this is the base URL for file-related operations
    total           : number    = 10;
    limit           : number    = 10;
    page            : number    = 1;
    from            : Date;
    to              : Date;
    receipt_number  : string    = '';
    isLoading       : boolean   = false;

    ngOnInit    (): void {
        // Initialize data by fetching from the backend on component initialization
        this.isLoading = true;

        this.quizService.items$.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: List) => {
            if (res) {
                this.dataSource.data = res.data ?? [];
                this.total = res.pagination.totalItems;
                this.limit = res.pagination.perPage;
                this.page = res.pagination.currentPage;
                // this.view(this.dataSource.data[0]);
            } else {
                this.list(this.page, this.limit);
            }
            // Mark for check
            this.changeDetectorRef.markForCheck();
        });

    }

    list(_page: number = 1, _page_size: number = 10): void {
        const params: { page: number, page_size: number, key?: string, role?: number } = {
            page: _page,
            page_size: _page_size
        }

        this.isLoading = true;
        this.quizService.list(params).subscribe({
            next: res => {
                this.quizService.items = res;
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.snackBarService.openSnackBar(err.error?.message ?? GlobalConstants.genericError, GlobalConstants.error);
            }
        });
    }



    onPageChanged(event: PageEvent): void {
        if (event && event.pageSize) {
            this.limit = event.pageSize;
            this.page = event.pageIndex + 1;
            this.list(this.page, this.limit);
        }
    }


    private matDialog = inject(MatDialog);
    create(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = false;
        dialogConfig.position = { right: '0px' };
        dialogConfig.height = '100dvh';
        dialogConfig.width = '100dvw';
        dialogConfig.maxWidth = '650px'
        dialogConfig.panelClass = 'custom-mat-dialog-as-mat-drawer';
        dialogConfig.enterAnimationDuration = '0s';
        const dialogRef             = this.matDialog.open(CreateComponent, dialogConfig);
        dialogRef.componentInstance.ResponseData.subscribe((quizs: Item) => {
            const data              = this.dataSource.data;
            data.unshift(quizs);
            this.dataSource.data    = data;
        });
    }


    onDelete(type: Item): void {
        // Build the configuration for the confirmation dialog
        const configAction: HelpersConfirmationConfig = {

            title       : `Remove <strong> ${type.name} </strong>`,
            message     : 'Are you sure you want to remove this receipt number permanently? <span class="font-medium">This action cannot be undone!</span>', // Confirmation message

            icon    : {

                show    : true,
                name    : 'heroicons_outline:exclamation-triangle',
                color   : 'warn',
            },

            actions: {

                confirm : {

                    show    : true,
                    label   : 'Remove',
                    color   : 'warn',
                },

                cancel  : {

                    show    : true,
                    label   : 'Cancel',
                },
            },
            dismissible : true,
        };

        // Open the confirmation dialog and save the reference
        const dialogRef = this.helpersConfirmationService.open(configAction);

        // Subscribe to the afterClosed event of the dialog reference
        dialogRef.afterClosed().subscribe((result: string) => {

            // Check if the user confirmed the action
            if (result && typeof result === 'string' && result === 'confirmed') {

                // Call the delete method from the service to remove the type
                this.quizService.delete(type.id).subscribe({

                    next    : (response: { status_code: number, message: string }) => {

                        // If successful, filter the deleted type from the data source
                        this.dataSource.data = this.dataSource.data.filter((v: Item) => v.id != type.id);
                        // Display a success message using the snackbar service
                        this.snackBarService.openSnackBar(response.message, GlobalConstants.success);
                    },
                    error   : (err: HttpErrorResponse) => {

                        // Handle errors by displaying an error message using the snackbar service
                        this.snackBarService.openSnackBar(err?.error?.message || GlobalConstants.genericError, GlobalConstants.error);
                    }
                });
            }
        });
    }


}
