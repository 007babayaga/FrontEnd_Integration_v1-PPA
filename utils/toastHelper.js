import { Slide, toast } from "react-toastify";

const erorrToast = (txt) => {
    toast.error(txt, {
        position: "top-right",
        autoClose: 2000,
        toastId: "uniqueId",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
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
        theme: "light",
        transition: Slide,
    });
}
export{erorrToast,successToast};