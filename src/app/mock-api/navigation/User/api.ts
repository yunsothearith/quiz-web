// ================================================================>> Core Library
import { Injectable }               from '@angular/core';

// ================================================================>> Third Party Library
import { cloneDeep }                from 'lodash-es';

// ================================================================>> Custom Library
import { HelpersNavigationItem }    from 'helpers/components/navigation';
import { HelpersMockApiService }    from 'helpers/mock-api';
import { staffNavigation }          from './data';

@Injectable({ providedIn: 'root' })
export class Staff {

  // Array to store the User navigation items
  private readonly _staffNavigation: HelpersNavigationItem[] = staffNavigation;

  // Constructor with dependency injection of HelpersMockApiService
  constructor(private _helpersMockApiService: HelpersMockApiService) {
        // Call the method to register API response handlers
        this.registerHandlers();
  }

  // Method to register API response handlers for User navigation
  registerHandlers(): void {

    // Register a mock API response for GET request to 'api/navigation/User'
    this._helpersMockApiService.onGet('api/navigation/User').reply(() => {

      // Return a mock response with a 200 status code and cloned User navigation items
      return [
        
        200,
        {
          default: cloneDeep(this._staffNavigation)
        },
      ];
    });
  }
}
