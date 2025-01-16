import { useTokenStore } from "@/store/tokenStore"
import { gql, useQuery } from "@apollo/client"

export const useGetIds = () => {
  const token = useTokenStore()
  const GET_WISHLIST_ID = gql`
    query GetWishlist {
      customer {
        wishlist {
          id
        }
      }
    }
  `

  const GET_CART_ID = gql`
    query GetCustomerCart {
      customerCart {
        id
      }
    }
  `
  const { data: wishlistData } = useQuery(GET_WISHLIST_ID, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const { data: cartData } = useQuery(GET_CART_ID, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  return {
    wishlistId: wishlistData?.customer.wishlist.id || "",
    cartId: cartData?.customerCart.id || "",
  }
}
