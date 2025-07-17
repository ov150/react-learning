export const fetchCategory = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/category`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data.categories, "category data from action");
            dispatch({
                type: 'GET_CATEGORY',
                payload: data.categories
            });
        } catch (error) {
            console.log(error);
        }
    };
};


export const addCategoryAction = (formData, token) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/category`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            dispatch({
                type: 'ADD_CATEGORY',
                payload: data.category
            });
        } catch (error) {
            console.log(error);
        }
    };
};


export const updateCategoryAction = (formData, token, id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/category/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            dispatch({
                type: 'UPDATE_CATEGORY',
                payload: data.category
            });
        } catch (error) {
            console.log(error);
        }
    };
};


export const deleteCategoryAction = (id, token) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/category/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                dispatch({
                    type: 'DELETE_CATEGORY',
                    payload: id
                });
            } else {
                console.error("Failed to delete category");
            }
        } catch (error) {
            console.log(error);
        }
    };
}