// ================================================================>> Core Library
import { Route }                from '@angular/router';

// ================================================================>> Custom Library
import { initialDataResolver }  from 'app/app.resolvers';
import { AuthGuard }            from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard }          from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent }      from 'app/layout/layout.component';

export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboard'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path        : 'auth',
        canActivate : [NoAuthGuard],
        component   : LayoutComponent,
        data: {
            layout  : 'empty'
        },
        loadChildren: () => import('app/modules/auth/auth.routes')
    },

    // Admin routes
    {
        path        : '',
        canActivate : [AuthGuard],
        component   : LayoutComponent,
        resolve     : {
            initialData: initialDataResolver
        },
        children    : [
            // {
            //     path        : 'profile',
            //     loadChildren: () => import('app/modules/profile/profile.routing')
            // },
            {
                path        : 'admin',
                loadChildren: () => import('app/modules/admin/routes')
            },
            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () => import('app/modules/error/error-404.module').then(m => m.Error404Module),
                canActivate: [AuthGuard]
            },
            { path: '**', redirectTo: '404-not-found' }
        ]
    }
];
