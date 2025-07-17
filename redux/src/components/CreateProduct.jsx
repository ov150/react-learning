import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../redux/categoryActions";
import { addProductAction } from "../redux/productActions";

const CreateProduct = () => {
    const { categories } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });



    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("price", Number(productData.price));
        formData.append("category", productData.category);
        if (productData.image) {
            formData.append("image", productData.image);
        }
        const token = localStorage.getItem("token");
        dispatch(addProductAction(formData, token));
    };
   


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            />
            <select
                name="category"
                id="category"
                value={productData.category}
                onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                required
            >
                <option value="" disabled>
                    Select Category
                </option>
                {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.name}
                    </option>
                ))}
            </select>
            <input
                type="file"
                onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })}
            />
            <button type="submit">Create Product</button>
        </form>
    );
}

export default CreateProduct;