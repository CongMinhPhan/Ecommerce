// components/SupplierItem.js

import React, { useEffect, useState } from 'react';
import SummaryApi from '../common'

const SupplierItem = ({ data }) => {
    const { name, email, phoneNumber, address, productsSupplied = [] } = data;
    const [dataProduct, setDataProduct] = useState([]);

    const fetchProductDetails = async()=>{
        const response = await fetch(SummaryApi.ProductInSupplier.url)
        const dataReponse = await response.json()
    
        setDataProduct(dataReponse?.data)
        // setActiveImage(dataReponse?.data?.productImage[0])
        console.log("product data:", dataReponse?.data);
    
      }
      useEffect(() => {
        fetchProductDetails()
      })

    return (
        <div className='bg-white p-4 m-2 shadow-md rounded'>
            <h3 className='font-bold text-lg mb-2'>{name}</h3>
            <p className='mb-1'><strong>Email:</strong> {email}</p>
            <p className='mb-1'><strong>Số điện thoại:</strong> {phoneNumber}</p>
            <p className='mb-1'><strong>Địa chỉ:</strong> {address}</p>
            <p className='mb-1'><strong>Sản phẩm cung cấp:</strong></p>
            <ul className='list-disc list-inside'>
            {dataProduct && dataProduct.map((product, index) => (
                <li key={index}>
                    name: {product}
                </li>
            ))}
            </ul>
        </div>
    );
};

export default SupplierItem;
