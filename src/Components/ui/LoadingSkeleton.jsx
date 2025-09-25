import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingSkeleton = ({className})=>{
    return(
        <>
        <Skeleton count={2} className={`${className}animate-pulse bg-gray-300 rounded-md`}/>
        </>
    )
}
export{LoadingSkeleton}