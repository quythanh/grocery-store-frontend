export type Product = {
  uid: string
  sku: string
  name: string
  image: {
    label: string
    url: string
  }
  price_range: {
    minimum_price: {
      final_price: {
        currency: string
        value: number
      }
    }
  }
}