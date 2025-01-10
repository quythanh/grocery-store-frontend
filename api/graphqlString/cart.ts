import { gql } from "@apollo/client";

export const GET_CUSTOMER_CART = gql`
    query GetCustomerCart {
        customerCart {
            id
            total_quantity
            prices {
                subtotal_excluding_tax {
                    currency
                    value
                }
            }
            itemsV2 {
                total_count
                items {
                    id
                    uid
                    quantity
                    prices {
                        price {
                            currency
                            value
                        }
                    }
                    product {
                        image {
                            label
                            url
                        }
                        name
                    }
                    ... on ConfigurableCartItem {
                        configurable_options {
                            option_label
                            id
                            value_id
                            value_label
                        }
                    }
                }
            }
        }
    }
`

export const UPDATE_CART_ITEM = gql`
    mutation UpdateCartItems($cartId: String!, $cartItemUid: ID!, $quantity: Float!) {
        updateCartItems(
            input: {
                cart_id: $cartId,
                cart_items: {
                    cart_item_uid: $cartItemUid,
                    quantity: $quantity
                }
            }
        ) {
            cart {
                id
            }
        }
    }
`
