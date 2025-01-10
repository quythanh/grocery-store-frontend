import { gql } from "@apollo/client"

export const GET_CATEGORY_LIST = gql`
  query CategoryList {
    categoryList {
      children {
        id
        name
      }
    }
  }
`

export const GET_PRODUCT_LIST_BY_CATEGORY_ID = gql`
  query Products($categoryId: String!, $pageSize: Int!) {
    products(
      filter: { category_id: { eq: $categoryId } }
      pageSize: $pageSize
    ) {
      items {
        id
        image {
          label
          url
        }
        name
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
      }
    }
  }
`

export const GET_PRODUCT_LIST = gql`
  query Products($search: String!) {
    products(search: $search) {
      items {
        id
        image {
          label
          url
        }
        name
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
      }
      suggestions {
        search
      }
    }
  }
`
