// ================================================================>> Custom Library
import { HelpersNavigationItem } from 'helpers/components/navigation';

export const adminNavigation: HelpersNavigationItem[] = [

    //===================================>> Dashboard
    {
        id      : 'dashboard',
        title   : 'Dashboard',
        type    : 'basic',
        icon    : 'mat_solid:dashboard',
        link    : 'admin/dashboard'
    },
    //===================================>> Dashboard
    {
        id      : 'quiz',
        title   : 'Quiz',
        type    : 'basic',
        icon    : 'mat_solid:dashboard',
        link    : 'admin/quiz'
    },
    //===================================>> Dashboard
    {
        id      : 'question',
        title   : 'Question',
        type    : 'basic',
        icon    : 'mat_solid:dashboard',
        link    : 'admin/questions'
    },
    //===================================>> User
    {
        id      : 'user',
        title   : 'User Quiz Result',
        type    : 'basic',
        icon    : 'mat_solid:people_alt',
        link    : 'admin/users',
    },
    //===================================>> Profile
    {
        id      : 'profile',
        title   : 'Profile',
        type    : 'basic',
        icon    : 'mat_solid:person',
        link    : 'admin/profile'
    },
];
