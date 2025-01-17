import { useTokenStore } from "@/store/tokenStore"
import { gql, useLazyQuery } from "@apollo/client"

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

  const [getIds, { data }] = useLazyQuery(GET_ID, {
    fetchPolicy: "no-cache",
  })

  return {
    getIds,
    wishlistId: data?.customer.wishlist.id,
    cartId: data?.customerCart.id,
  }
}
