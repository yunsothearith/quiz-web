// ================================================================>> Core Library (Angular)
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// ================================================================>> Third-Party Library (RxJS)
import { Observable, BehaviorSubject, catchError, timer, delayWhen, tap } from 'rxjs';

// ================================================================>> Custom Library
import { LoadingSpinnerService } from 'helpers/shared/loading/loading.service';
import { environment as env } from 'environments/environment';
import { Item, List } from './interface';

// Injectable decorator is used to define the service as a provider
@Injectable({
    providedIn: 'root',
})

export class QuizService {

    private _items: BehaviorSubject<List | null> = new BehaviorSubject(null);
    set items(value: List) {
        this._items.next(value);
    }
    get items$(): Observable<List> {
        return this._items.asObservable();
    }


    // HttpClient is injected through the constructor
    constructor(private httpClient  : HttpClient) { }

    // LoadingSpinnerService is injected using the inject function
    private loadingSpinner          = inject(LoadingSpinnerService);
     // Method to retrieve a list of product types from the backend
     list(params?: { page: number, page_size: number, key?: string }): Observable<List> {
        const requestStartTime = Date.now();
        return this.httpClient.get<List>(`${env.API_BASE_URL}/admin/quizs`, { params: params }).pipe(
            // Only add a delay if the request finishes in less than 1 seconds
            delayWhen(() => {
                const timeElapsed = Date.now() - requestStartTime;
                if (timeElapsed < 1000) {
                    return timer(1000 - timeElapsed);
                } else {
                    return timer(0); // No delay
                }
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Error occurred:', error);
                return new Observable(observer => {
                    observer.error(error);
                    observer.complete();
                }) as Observable<List>;
            })
        );
    }


    // Method to create a new product type
    create  (body: { name: string }): Observable<{ data: Item, message: string }> {
        return this.httpClient.post<{ data: Item, message: string }>(`${env.API_BASE_URL}/admin/quizs`, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }

    // Method to update an existing product type
    update  (id: number, body: { name: string }): Observable<{ data: Item, message: string }> {
        return this.httpClient.put<{ data: Item, message: string }>(`${env.API_BASE_URL}/rooms/quizs/${id}`, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }

    // Method to delete an existing product type
    delete  (id: number = 0): Observable<{ status_code: number, message: string }> {
        return this.httpClient.delete<{ status_code: number, message: string }>(`${env.API_BASE_URL}/admin/quizs/${id}`, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
}
