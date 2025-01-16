import { gql } from "@apollo/client"

export const GET_DETAIL_PRODUCT = gql`
  query GetDetailProduct($productSku: String) {
    products(
      currentPage: 1
      filter: { sku: { eq: $productSku } }
      pageSize: 1
    ) {
      items {
        name
        price_range {
          maximum_price {
            final_price {
              value
              currency
            }
          }
        }
        ... on ConfigurableProduct {
          configurable_options {
            label
            values {
              label
              uid
            }
          }
        }
        sku
        image {
          url
          label
        }
      }
    }
  }
`
