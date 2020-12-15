export class Quotes {

    product_code: string;
    service_codes: string;
    sender: {
        name: string;
        address1: string; 
        zipcode: number;
        city: string;
        country_code: string;
        email: string;
        mobile: number;

    };
    receiver: {
        name: string;
        address1: string;
        zipcode: number;
        city: string;
        country_code: string;
        email: string;
        mobile: number;
    };
    parcels: [
        {
          weight: number;
        }
      ];

      /* Quotes result  */

      carrier_code: string; // example: gls
      description: string; // example: Til PakkeShop: 0-1 kg
   //   product_code: string;
   // service_codes: string;
   price: number; // example: 42.5
   price_before_vat: number; // example 34.0

}
