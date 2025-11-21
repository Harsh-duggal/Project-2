import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";

export default function GroceriesAppContainer() {
  //states
  const [productQuantity, setProductQuantity] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  const [postResponse, setPostResponse] = useState("");
  //To handle the submission of data

    const handleOnSubmit = async(e) =>{ e.preventDefault();
       try{ await axios.post("http://localhost:3000/Project-2", formData);
setPostResponse(Date.now());
setFormData({
  productName: "",
  brand: "",
  image: "",
  price: "",
});
      } catch(error){
        console.log(error.message);
      }
    };
//To handle on Change event for the form
    const handleOnChange = (e) => {
    setFormData((prevData) => {
        return {...prevData, [e.target.name]: e.target.value};
    });
  };

  const handleOnDelete = async(productId) => {
    try{
      await axios.delete(`http://localhost:3000/Project-2/${productId}`);
      setPostResponse(Date.now());
    }
    catch(error){
      console.log(error.message);
    }
  };

  //UseEffects
  useEffect(()=>{
    handleContactsDB();
  }, [postResponse]);

  const handleContactsDB = async () => {
    try{
      const response = await axios.get("http://localhost:3000/Project-2");
      console.log(response)
      const withId = response.data.map((p) => ({
      ...p,
      id:p._id,
    }));
  


    setProducts(withId);
    setProductQuantity(
      withId.map((p) => ({ id: p.id, quantity: 0 }))
    );
    }
    catch(error){
      console.log(error.message);
    }
  }

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;

    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleAddToCart = (productId) => {
    const product = products.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  return (
    <div>
      <NavBar quantity={cartList.length} />
      <div className="GroceriesApp-Container">
        <ProductForm 
                    productName={formData.productName}
                    brand={formData.brand}
                    image={formData.image}
                    price={formData.price}
                    handleOnSubmit={handleOnSubmit}
                   handleOnChange={handleOnChange}/>
                   <p>{postResponse}</p>
        <ProductsContainer
          contacts={products}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleOnDelete={handleOnDelete}
          productQuantity={productQuantity}
        />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
