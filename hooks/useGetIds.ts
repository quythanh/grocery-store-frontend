import { useTokenStore } from "@/store/tokenStore"
import { gql, useQuery } from "@apollo/client"

export const GET_ID = gql`
  query GetWishlist {
    customer {
      wishlist {
        id
      }
    }
    customerCart {
      id
    }
  }
`
export const useGetIds = () => {
  const { token } = useTokenStore()

  const { data } = useQuery(GET_ID, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "no-cache",
  })

  return {
    wishlistId: data?.customer.wishlist.id,
    cartId: data?.customerCart.id,
  }
}
