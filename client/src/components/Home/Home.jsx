import React from 'react'
import Poster from '../Poster/Poster'
import { useSelector } from 'react-redux'

import Products from '../Products/Products'
import Categories from '../Categories/Categories'
import Traits from '../Traits/Traits'
// import { useGetProductsQuery } from '../../features/api/apiSlice'

const Home = () => {

  const { list } = useSelector(({ products }) => products)
  const categories = useSelector(({ categories }) => categories)
  // console.log(products)
  // const { products, categories } = useSelector((state) => state)
  // const { data, isLoading, isFetching, isSuccess } = useGetProductsQuery({ title: "Red" })
  // const res = useGetProductsQuery()
  // console.log(res)
  return (
    <>
    {/* {console.log(categories.list.data)} */}
      <Poster />
      <Products products={list.data} amount={5} title="Trending" />
      <Categories products={categories.list.data} amount={5} title="Categories" />
      <Traits />
    </>
  )
}

export default Home
