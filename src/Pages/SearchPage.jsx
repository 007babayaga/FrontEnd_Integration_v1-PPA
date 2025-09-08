import { useSearchParams } from "react-router"
import { Navbar } from "../Components/Navbar"
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Paginator } from "../Components/Paginator";
import { ToastContainer, toast } from 'react-toastify';

const LIMIT_PER_PAGE =10

const SearchPage = ()=>{

    const [query] = useSearchParams();
    const searchText= query.get("text")

    const[loading,setLoading] = useState(false);
    const[products,setProducts] = useState([]);
    const[total,setTotal] = useState(0);
    const[page,setPage] = useState(1);


    const getData = async()=>{
        try{
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products?q=${searchText}&limit=${LIMIT_PER_PAGE}&page=${page}`,{
                method:"GET"
            })
            const result =  await response.json();
            console.log(result);
            setTotal(result.data.total);
            setProducts(result.data.products);
        }
        catch(err){
            alert("Error in the products APi",err.message);
        }
        finally{
            setLoading(false);
        }
    }
    const handleClick = (e)=>{
        setPage(e);
        toast.success("Page Changed Successfully")
    }

    useEffect(()=>{
        getData();
    },[searchText,page]);

    return(
        <>
        <ToastContainer autoClose={2000}/>
        <Navbar/>
        {
            loading?
            <div className="fixed top-1/2 left-1/2 -translate-1/2">
                <SyncLoader size={20} />
            </div>
            :
            <div className="flex min-h-screen">

                <div className="w-50 bg-blue-200">
                    <p>Filters</p>
                </div>

                <div className="flex flex-1 flex-col p-5 gap-6 bg-blue-100">
                {
                    products.map((ele,idx)=>{
                        return(
                            <div className="shadow-lg rounded-2xl p-4 m-4 bg-white hover:shadow-2xl cursor-pointer transition-shadow duration-300" key={idx}>
                                <h1 className="text-lg font-semibold mb-2">Item Name:{ele.title}</h1>
                                <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                                    <div className="flex gap-2 overflow-x-auto h-full w-full">
                                        {ele.images?.map((img, i) => (
                                        <img 
                                            key={i} 
                                            src={img} 
                                            className="h-full object-cover rounded-md" 
                                        />
                                        ))}
                                    </div>
                                </div>
                                <h1 className="mt-3 font-medium">Quantity:{ele.quantity}</h1>
                                <p className="text-gray-700">Price:{ele.price}</p>
                            </div>
                        )
                    })
                }
                {
                    products.length===0&&(
                        <div className="py-30">
                            <p className="text-2xl text-center ">No product found for Your Search{" "}
                                <span className=" text-2xl underline text-blue-600">{searchText}</span>
                            </p>
                        </div>
                    )
                }
                <div className="flex justify-center">
                    <Paginator limit={LIMIT_PER_PAGE} page={page} total={total} handleClick={handleClick} />
                </div>
                </div>
            </div>
        }
        </>
    )
}
export{SearchPage}