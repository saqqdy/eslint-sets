export interface Product {
  category: string
  id: number
  inStock: boolean
  name: string
  price: number
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  createdAt: Date
  id: string
  items: CartItem[]
  status: 'cancelled' | 'completed' | 'pending' | 'processing'
  total: number
  userId: number
}
