import { Bounce, Flip, Slide, toast, Zoom } from "react-toastify";

const erorrToast = (txt) => {
    toast.error(txt, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: "unique-toast",
        transition: Slide,
    });
}
const successToast = (txt) => {
    toast.success(txt, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "unique-toast",
        theme: "light",
        transition: Slide,
    });
}
export{erorrToast,successToast};