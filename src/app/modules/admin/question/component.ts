// ================================================================>> Core Library (Angular)
import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

// ================================================================>> Third Party Library (Angular Material)
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// ================================================================>> Custom Library (Application-specific)
import { SnackbarService } from 'helpers/services/snack-bar/snack-bar.service';
import { GlobalConstants } from 'helpers/shared/global-constants';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HelpersConfirmationConfig, HelpersConfirmationService } from 'helpers/services/confirmation';
import { environment as env } from 'environments/environment';
import { QuizService } from './server';
import { DataSetup, List } from './interface';
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
        MatPaginatorModule
    ]
})

export class QuestionComponent implements OnInit {

    private quizService                 = inject(QuizService);
    private snackBarService             = inject(SnackbarService);
    private helpersConfirmationService  = inject(HelpersConfirmationService);

    displayedColumns: string[]          = ['no', 'name', 'action'];
    dataSource: MatTableDataSource<DataSetup> = new MatTableDataSource<DataSetup>([]);

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

        this.quizService.list().subscribe({

            next: (response: List) => {

                // Update the data source with the received data
                this.dataSource.data    = response.data;

                // Set isLoading to false to indicate that data loading is complete
                this.isLoading          = false;
            },

            error: (err: HttpErrorResponse) => {

                // Display a snackbar notification with an error message, falling back to a generic error message if not available
                this.snackBarService.openSnackBar(err?.error?.message ?? GlobalConstants.genericError, GlobalConstants.error);
                this.isLoading          = false;
            }
        });
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
        this.matDialog.open(CreateComponent, dialogConfig);
    }






    // getTotal(): number {
    // // Use map to extract the 'n_of_products' property from each item in the dataSource
    // return this.dataSource.data.map(t => t.n_of_rooms)
    //     // Use reduce to sum up all the extracted values
    //     .reduce((acc, value) => Number(acc) + Number(value), 0);
    // }
}
