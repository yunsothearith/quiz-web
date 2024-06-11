/* eslint-disable */
// ================================================================>> Custom Library
import { HelpersNavigationItem } from 'helpers/components/navigation';

export const staffNavigation: HelpersNavigationItem[] = [

    //===================================>> Dashboard
    {
        id      : 'dashboard',
        title   : 'Dashboard',
        type    : 'basic',
        icon    : 'mat_solid:dashboard',
        link    : '/dashboards'
    },
    //===================================>> POS
    {
        id      : 'Quiz',
        title   : 'Quiz',
        type    : 'basic',
        icon    : 'mat_solid:desktop_mac',
        link    : '/quiz',
    },
    //===================================>> Sale
    {
        id      : 'Result',
        title   : 'Result',
        type    : 'basic',
        icon    : 'mat_solid:dashboard',
        link    : '/resule',
    },
    //===================================>> Profile
    {
        id      : 'profile',
        title   : 'Profile',
        type    : 'basic',
        icon    : 'mat_solid:person',
        link    : '/profile'
    },
];
