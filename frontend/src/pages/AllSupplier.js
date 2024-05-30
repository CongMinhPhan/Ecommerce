import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import SupplierItem from '../components/SupplierItem';
import UploadSupplier from '../components/UploadSupplier';



const AllSupplier = () => {
    const [openUploadSupplier, setOpenUploadSupplier] = useState(false);
    const [allSupplier, setAllSupplier] = useState([]);

    const fetchAllSupplier = async () => {
        const response = await fetch(SummaryApi.allSupplier.url)
        const dataResponse = await response.json();

        setAllSupplier(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllSupplier()
    }, [])

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>Tất cả nhà cung cấp</h2>
                <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={() => setOpenUploadSupplier(true)}>
                    Cập nhật nhà cung cấp
                </button>
            </div>


            {/*All supplier  */}
            <div>
                {
                    allSupplier.map((supplier, index) => {
                        return(
                            <SupplierItem data={supplier} key={index+"allSupplier"} fetcbdata={fetchAllSupplier}/>
                        )
                    })
                }
              
            </div>

            {/* Upload supplier */}
            {
                openUploadSupplier && (
                    <UploadSupplier onClose={() => setOpenUploadSupplier(false)} fetcbdata={fetchAllSupplier}/>
                )
            }


        </div>
    )
}

export default AllSupplier