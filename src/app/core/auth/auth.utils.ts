// ================================================================>> Core Library
import { inject }       from '@angular/core';

// ================================================================>> Third Party Library
import jwt_decode       from 'jwt-decode';

// ================================================================>> Costom Library
import { User }         from '../user/user.types';
import { UserService }  from '../user/user.service';

interface TotkenPayload {

    exp     : number
    iat     : number
    user    : User;
}

export class AuthUtils {

    /**
     * Is token expired?
     *
     * @param token
     */

    static isTokenExpired(token: string): boolean {
        // Return if there is no token
        if (!token || token === '') {
            return true;
        }

        // Get the expiration exp
        const exp = this._getTokenExpirationDate(token);

        if (exp === null) {
            return true;
        }

        const expirationTime = exp * 1000; // Convert to milliseconds

        if (expirationTime < Date.now()) {
            // Token is expired
            console.log('Token is expired');
            return true;
        } else {
            // Token is still valid
            // console.log('Token is valid');
            return false;
        }
    }

    private static _getTokenExpirationDate(token: string): number | null {

        const _userService = inject(UserService);
        // Get the decoded token
        
        const decodedToken: TotkenPayload = jwt_decode(token);

        // Return if the decodedToken doesn't have an 'exp' field
        if (!decodedToken.hasOwnProperty('exp')) {
            return null;
        }

        if (decodedToken.hasOwnProperty('user')) {
            _userService.user = decodedToken.user;
        }

        return decodedToken.exp;
    }
}
