import { useNavigate,useSearchParams } from "react-router"
import { Navbar } from "../Components/Navbar"
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Paginator } from "../Components/Paginator";
import { ToastContainer } from 'react-toastify';
import { Footer } from "../Components/Footer";
import { successToast } from "../../utils/toastHelper";

const LIMIT_PER_PAGE =10

const SearchPage = ()=>{
    
    const[sortOrder,setsortOrder] = useState("");
    const navigate = useNavigate();

    const [query] = useSearchParams();
    const searchText= query.get("text")

    const[loading,setLoading] = useState(false);
    const[products,setProducts] = useState([]);
    const[total,setTotal] = useState(0);
    const[page,setPage] = useState(1);

    const getData = async()=>{
        try{
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products?q=${searchText}&limit=${LIMIT_PER_PAGE}&page=${page}&sort=${sortOrder}`,{
                method:"GET",
                credentials:"include"
            })
            const result =  await response.json();
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
        successToast("Page Changed Successfully")
    }
    const handleSortChange =(e)=>{
        console.log(e.target.value);
        setsortOrder(e.target.value);
    }
    const HandleViewProduct = (id)=>{
        navigate(`/view/${id}`)
    }

    useEffect(()=>{
        getData();
    },[searchText,page,sortOrder]);

    return(
        <div className="flex flex-col min-h-screen">
            <ToastContainer/>
        <div className="flex-1 flex">
        {
            loading?
            <div className="flex items-center justify-center w-full">
                <SyncLoader size={20} />
            </div>
            :
            <div className="flex w-full">

                <div className="w-50 bg-blue-200">
                    <div className="flex flex-col gap-3 p-5 items-center">
                        <p className="font-bold text-center  py-2  rounded-md bg-white w-full  ">Filters</p>

                        <div className="flex flex-col gap-2 w-full  p-4 bg-cyan-100 rounded-md cursor-pointer hover:shadow-xl hover:shadow-blue-500 transition-shadow duration-300 border-l-4 border-blue-500">   
                        <h2 className="font-bold font-serif text-blue-900">Sort By price</h2>
                        <label>
                        <input
                        type="radio"
                        name="sortOrder"
                        value="asc"
                        onChange={handleSortChange}
                        checked={sortOrder === "asc"}
                        />
                        Low ➡️ High
                        </label>
                        <label>
                        <input
                        type="radio"
                        name="sortOrder"
                        value="desc"
                        onChange={handleSortChange}
                        checked={sortOrder === "desc"}
                        />
                        High ➡️ Low
                        </label>
                        </div>

                    </div>
                </div>

                <div className="flex flex-1 flex-col p-5 gap-6 bg-blue-100">
                {
                    products.map((ele,idx)=>{
                        return(
                            <div onClick={()=>{HandleViewProduct(ele._id)}} className="shadow-lg rounded-2xl p-4 m-4 bg-white hover:shadow-2xl cursor-pointer transition-shadow duration-300" key={idx}>
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
                                <div className="mt-3 font-medium">
                                    {
                                        (ele.quantity<1) ? <h1 className="text-red-500">Out Of Stock!</h1>
                                        :
                                        <h1>Stock:{ele.quantity}</h1>
                                    }
                                </div>
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
        </div>
        <Footer/>
        </div>
    )
}
export{SearchPage}