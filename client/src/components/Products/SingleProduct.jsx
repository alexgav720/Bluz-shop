import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../features/api/apiSlice';
import { ROUTES } from '../../utils/routes';
import Product from './Product';

import Products from "./Products"
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../features/Products/ProductsSlice';

const SingleProduct = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const navigate = useNavigate()
    const { related } = useSelector(({ products }) => products)
    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

    useEffect(() => {
        if (!isLoading && !isFetching && !isSuccess) {
            navigate(ROUTES.HOME)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, isSuccess])

    useEffect(() => {
        if (!data) return;

        dispatch(getRelatedProducts(data.data.category.id))
    }, [data, dispatch])

    return (
        !data ? (
            <section />
        ) : (
            <>
                <Product {...data} />
                <Products products={related} amount={5} title="Related Products" />

            </>
        )
    )
}

export default SingleProduct
