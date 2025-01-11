export type Price = {
    currency: string;
    value: number;
};

export type ConfigurableCartItem = {
    id: number;
    option_label: string;
    value_id: number;
    value_label: string;
}

export type CartItem = {
    uid: string;
    quantity: number;
    prices: {
        price: Price
    };
    product: {
        name: string;
        image: {
            label: string;
            url: string;
        }
    };
    configurable_options?: ConfigurableCartItem[];
}

export type Cart = {
    id: string;
    total_quantity: number;
    itemsV2: {
        items: CartItem[];
        total_count: number;
    };
    prices: {
        subtotal_excluding_tax: Price;
    }
}
