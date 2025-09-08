const Paginator = ({total,limit,page,handleClick})=>{
    const toatlPages = Math.ceil(total/limit);

    const dummyArray = new Array(toatlPages).fill("hi");
    console.log(dummyArray);
    

    return(
        <>
        <div>
            {
                dummyArray.map((ele,idx)=>{
                    const selected = idx+1 == page;
                    return(
                        <button onClick={()=>{handleClick(idx+1)}}  className={`px-3.5 py-3 bg-blue-400 text-white  m-1 rounded-md cursor-pointer transition-all hover:scale-105 hover:bg-blue-600 ${selected?'bg-blue-900':'bg-blue-400'}`}
                        key={idx}>
                        {idx+1}
                        </button>
                    )
                })
            }
        </div>
        </>
    )
}
export{Paginator}