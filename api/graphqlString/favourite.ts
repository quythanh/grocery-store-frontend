import { gql } from "@apollo/client"

export const GET_FAVOURITE_PRODUCTS = gql`
  query Wishlist {
    wishlist {
      items_count
      sharing_code
      items {
        added_at
        product {
          uid
          sku
          name
          image {
            label
            url
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
`
