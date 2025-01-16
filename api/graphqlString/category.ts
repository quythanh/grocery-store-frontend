import { gql } from "@apollo/client"

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query Category($categoryId: Int, $pageSize: Int, $currentPage: Int) {
    category(id: $categoryId) {
      name
      products(pageSize: $pageSize, currentPage: $currentPage) {
        items {
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
          ... on ConfigurableProduct {
            weight
          }
        }
        page_info {
          current_page
          page_size
          total_pages
        }
      }
    }
  }
`
