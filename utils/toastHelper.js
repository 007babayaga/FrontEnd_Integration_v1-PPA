import { Slide, toast } from "react-toastify";

const errorToast = (txt) => {
    toast.error(txt, {
        position: "top-right",
        autoClose: 2000,
        toastId: "uniqueId",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored",
        transition: Slide,
    });
}
const successToast = (txt) => {
    toast.success(txt, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "uniqueId",
        theme:"colored",
        transition: Slide,
    });
}
export{errorToast,successToast};