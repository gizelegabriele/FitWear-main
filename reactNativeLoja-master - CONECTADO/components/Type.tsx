export type Product = {
    id: number;
    name: string;
    price: number;
    promoPrice?: number;
    image?: any;
    description: string;
    quantity: number;
  };
  
  export type RootStackParamList = {
    home: undefined;
    cart: { cart: Product[] };
    checkout: { cart: Product[] };
  };