import axios from 'axios';

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:3000/api/product");
            const data = await response.json();
            dispatch({
                type: 'GET_PRODUCT',
                payload: data.products
            });
        }
         catch (error) {
            console.log(error);
        }
    };
};


export const addProductAction = (formData, token) => {
    console.log(formData, "form data from action");
    console.log(token, "token from action");
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3000/api/product", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.data;
            dispatch({
                type: 'ADD_PRODUCT',
                payload: data.product
            });
        } catch (error) {
            console.log(error);
        }
    };
};


export const updateProduct = (formData, token, id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3000/api/product/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })

            const data = await response.json();
            dispatch({type: "UPDATE_PRODUCT", payload: data.product});
        } catch (error) {
            console.log(error)
        }
    }
}



export const deleteProduct = (id, token) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3000/api/product/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                dispatch({ type: "DELETE_PRODUCT", payload: id });
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.log(error);
        }
    };
}