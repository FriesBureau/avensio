// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const API_URL = 'https://reqres.in/api/';

export const environment = {
  production: false,
  instagram_token: 'INSTAGRAM_TOKEN',
  stripe_token: 'pk_test_51GtZPOEIhPBZpG1VtJ4nii3S9EZ08CMyk9VXbKLQ13UzdI3Ze4Rwd7P2fOMBBV0GfOHOESbk4mE1aQA3moj6IMqf00lXRsYkzp', // Find her: https://dashboard.stripe.com/test/apikeys
  paypal_token: 'PAYPAL_CLIENT_ID',
  googlemaps_api_key: 'AIzaSyCiVUGl-6Ka-dkPWSgHB2oGKfmZXN1hTPY',
  shipmondo_api_key: 'd2b98058-76ba-4479-b5d5-44c5095aa5f9',
  USERS_URL: `${API_URL}users`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
