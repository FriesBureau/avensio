import { Product } from './product';

// Order
export interface Order {
    shippingDetails?: any;
    product?: Product;
    orderId?: any;
    ordercreated?: any;
    shippingcost?: any;
    totalAmount?: any;
}