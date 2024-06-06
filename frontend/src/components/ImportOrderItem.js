import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const ImportOrderItem = ({ data }) => {
    const { orderCode, importedBy, supplier, importDate, products = [] } = data;
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetailsArray = [];
            for (const product of products) {
                try {
                    const response = await fetch(SummaryApi.getProductById.url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ productId: product.product }) // Gửi ID sản phẩm trong request body
                    });
                    const data = await response.json();
                    if (data.success) {
                        productDetailsArray.push({ ...data.data, quantity: product.quantity });
                    } else {
                        console.error("Failed to fetch product:", data.message);
                    }
                } catch (error) {
                    console.error("Error fetching product details:", error);
                }
            }
            setProductDetails(productDetailsArray);
        };

        fetchProductDetails();
    }, [products]);

    return (
        <div className='bg-gray-100 p-6 m-4 shadow-md rounded-lg'>
            <h3 className='font-bold text-xl mb-4 text-gray-800'>Mã đơn hàng: {orderCode}</h3>
            <div className='mb-2 text-gray-700'>
                <strong className='text-lg'>Người nhập hàng:</strong> <span>{importedBy}</span>
            </div>
            <div className='mb-2 text-gray-700'>
                <strong className='text-lg'>Nhà cung cấp:</strong> <span>{supplier.name}</span>
            </div>
            <div className='mb-2 text-gray-700'>
                <strong className='text-lg'>Ngày nhập hàng:</strong> <span>{new Date(importDate).toLocaleDateString()}</span>
            </div>
            <div className='mt-4'>
                <h4 className='font-semibold text-lg mb-2 text-gray-800'>Sản phẩm:</h4>
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white text-gray-800 rounded-lg shadow-sm'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='py-2 px-4 border-b border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider'>
                                    Tên sản phẩm
                                </th>
                                <th className='py-2 px-4 border-b border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider'>
                                    Số lượng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetails.map((product, index) => (
                                <tr key={index} className='hover:bg-gray-100 transition duration-150 ease-in-out'>
                                    <td className='py-2 px-4 border-b border-gray-300'>
                                        {product.productName}
                                    </td>
                                    <td className='py-2 px-4 border-b border-gray-300'>
                                        {product.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    );
};

export default ImportOrderItem;
