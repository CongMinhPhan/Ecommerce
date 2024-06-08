import React, { useState } from 'react';
import ShowProductInSupplier from './ShowProductInSupplier';
import ShowImportOrderInSupplier from './ShowImportOrderInSupplier';

const SupplierItem = ({ data }) => {
    const { name, email, phoneNumber, address, productsSupplied = [], orders = [] } = data;
    const [openListProduct, setOpenListProduct] = useState(false);
    const [openListImportOrder, setOpenListImportOrder] = useState(false);

    return (
        <div className='bg-white p-6 m-4 shadow-lg rounded-lg'>
            <h3 className='font-bold text-2xl mb-4'>{name}</h3>
            <div className='mb-2'>
                <p className='mb-1'><strong>Email:</strong> {email}</p>
                <p className='mb-1'><strong>Số điện thoại:</strong> {phoneNumber}</p>
                <p className='mb-1'><strong>Địa chỉ:</strong> {address}</p>
            </div>
            <div className='mb-4'>
                <p className='mb-2'><strong>Sản phẩm cung cấp:</strong></p>
                <button
                    onClick={() => setOpenListProduct(true)}
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
                >
                    Danh sách sản phẩm
                </button>
                {openListProduct && (
                    <ShowProductInSupplier
                        listProductId={productsSupplied}
                        onClose={() => setOpenListProduct(false)}
                        data = {data.name}
                    />
                )}
            </div>
            <div>
                <p className='mb-2'><strong>Đơn hàng nhập:</strong></p>
                <button
                    onClick={() => setOpenListImportOrder(true)}
                    className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors'
                >
                    Danh sách đơn hàng
                </button>
                {openListImportOrder && (
                    <ShowImportOrderInSupplier
                        listImportOrderId={orders}
                        onClose={() => setOpenListImportOrder(false)}
                        data = {data.name}
                    />
                )}
            </div>
        </div>
    );
};

export default SupplierItem;
