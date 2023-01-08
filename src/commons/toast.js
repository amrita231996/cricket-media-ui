import { toast } from 'react-toastify';

const config = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
}

export const successToast = (element) => {
    toast.success(element, config);
}

export const errorToast = (element) => {
    toast.error(element, config);
}