import { gql } from "@apollo/client"

export const GET_FAVOURITE_PRODUCTS = gql`
  query GetWishlist {
    customer {
      wishlist {
        id
        items_count
        items {
          added_at
          id
          product {
            uid
            sku
            name
            image {
              url
              label
            }
            price_range {
              minimum_price {
                regular_price {
                  currency
                  value
                }
                final_price {
                  currency
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`

export const REMOVE_ITEM_FROM_WISHLIST = gql`
  mutation RemoveProductsFromWishlist(
    $wishlistId: ID!
    $wishlistItemsIds: [ID!]!
  ) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: $wishlistItemsIds
    ) {
      wishlist {
        id
        items_count
        items {
          added_at
          product {
            uid
            sku
            name
            image {
              url
              label
            }
            price_range {
              minimum_price {
                regular_price {
                  currency
                  value
                }
                final_price {
                  currency
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ADD_PRODUCT_TO_WISHLIST = gql`
  mutation AddProductsToWishlist(
    $wishlistId: ID!
    $sku: String!
    $quantity: Float!
  ) {
    addProductsToWishlist(
      wishlistId: $wishlistId
      wishlistItems: { sku: $sku, quantity: $quantity }
    ) {
      wishlist {
        id
        items_count
        sharing_code
        updated_at
      }
    }
  }
`
