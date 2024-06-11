// ================================================================================>> Core Library
import { Routes } from '@angular/router';

// ================================================================================>> Thrid Party Library

// ================================================================================>> Custom Library

// Local
import { DashboardComponent } from './dashboard/component';

export default [

    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'quiz',
        loadChildren: () => import('./quiz/routes')
    },
    {
        path: 'questions',
        loadChildren: () => import('./question/routes')
    }

] as Routes;
