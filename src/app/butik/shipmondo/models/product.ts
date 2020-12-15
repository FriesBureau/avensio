export interface Product {
    id: number;
    title: string;
    imageUrl: string;
    url: string; // Absolute URL to API
    prices: Price[];
  };
  
  export interface Price {
    amount: number;
    currency: string; // Currently SEK and EUR
  };

  export interface Cart {
    items: Item[];
    summery: Price[];
  };
  
  export interface Item {
    product: Product;
    quantity: number;
  };
