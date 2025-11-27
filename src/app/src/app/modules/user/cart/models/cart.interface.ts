
export interface Cart {
  status:string
  numOfCartItems: number
  cartId:string
  data: Data

}
export interface Data {
  _id:string
  cartOwner:string
  products:Product []
  createdAt:string
  updatedAt:string
  __v:number
  totalCartPrice: number

}

export interface Product {
  count:number
  _id:string
  product:Product2
  price:number
  
}

export interface Product2{
  subCategory:Subcategory []
  _id:string
  title:String
  quantity: number
  imageCover: string
  category : Category
  brand:Brand
  ratingsAverage: number
  id :string
}

export interface Subcategory {
_id : string
name :String
slug :String
category :String


}

export interface Category {
  _id : string
name :String
slug :String
image :String

}
 export interface Brand {
  _id : string
name :String
slug :String
image :String
 }
