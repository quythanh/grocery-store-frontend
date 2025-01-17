import { gql } from "@apollo/client"

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
      items {
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
`

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItems(
    $cartId: String!
    $cartItemUid: ID!
    $quantity: Float!
  ) {
    updateCartItems(
      input: {
        cart_id: $cartId
        cart_items: { cart_item_uid: $cartItemUid, quantity: $quantity }
      }
    ) {
      cart {
        id
      }
    }
  }
`

export const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductsToCart(
    $cartId: String!
    $sku: String!
    $quantity: Float!
    $options: [ID]
  ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: { sku: $sku, quantity: $quantity, selected_options: $options }
    ) {
      cart {
        total_quantity
      }
    }
  }
`

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($cartId: String!, $cartItemUid: ID!) {
    removeItemFromCart(
      input: { cart_id: $cartId, cart_item_uid: $cartItemUid }
    ) {
      cart {
        id
      }
    }
  }
`
