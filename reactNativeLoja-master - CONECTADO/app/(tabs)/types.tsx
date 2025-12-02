export type Product = {
    id: number;
    name: string;
    price: string;
    image: any;
    quantity: number; // Adicionando o campo 'quantity'
  };
  
  // types.ts (ou arquivo de tipagem)
  export type RootStackParamList = {
    home: undefined;
    cart: { cart: { id: number; name: string; price: string; image: any; quantity: number }[] };
    checkout: { cart: { id: number; name: string; price: string; image: any; quantity: number }[] };
  };
  