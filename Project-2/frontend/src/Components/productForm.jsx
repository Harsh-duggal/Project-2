  import { useState } from "react";
import axios from "axios";

export default function ProductForm({productName,brand,image,price,handleOnSubmit,handleOnChange}){
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/Project-2", formData);

      // refresh product list
      refreshProducts();

      // reset form
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });

    } catch (error) {
      console.log(error.message);
    }
  };

    return <div>
        <form onSubmit={handleOnSubmit}></form>
        <label htmlFor=""></label>
        <input type="text" name="name" value={productName} onChange={handleOnChange}
        placeholder="Product Name"
        />
        <br/>

        <label htmlFor="brand">Brand</label>
        <input type="text"
        name="brand"
        id="brand"
        value={brand}
        onChange={handleOnChange}
        placeholder ="brand"
        />
        <br/>

        <label htmlFor="image"></label>
        <input 
        type="image"
        name="image"
        id="image"
        value={image}
        onChange={handleOnSublit}
        placeholder="image"
        />
        <br/>

        <label htmlFor="price"></label>
        <input 
        type="price"
        name={price}
        id="price"
        value={price}
        onChange={handleOnSubmit}
        placeholder="price"
/>

<button>Submit</button>


    </div>
}