export class Servicepoint {

    id: number;
    name: string;
    address: string;
    address2: string;
    zipcode: string;
    city: string;
    country: string;
    distance: number; // Burde være 'integer', men det findes ikke i javascript / typescript
    longitude: number;
    latitude: number;
    carrier_code: string;
    opening_hours: [string];
    in_delivery: boolean;
    out_delivery: boolean;

}
