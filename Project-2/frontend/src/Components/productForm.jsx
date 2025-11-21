export default function ProductForm({productName,
    brand,
    image,
    price,
    handleOnSubmit,
    handleOnChange})
    {

    return <div>
        <form onSubmit={handleOnSubmit}>
        <label htmlFor=""></label>
        <input type="text" 
        name="productName" 
        value={productName} 
        onChange={handleOnChange}
        placeholder="Product Name"
        />
        <br/>

        <label htmlFor="brand"></label>
        <input type="text"
        name="brand"
        id="brand"
        value={brand}
        onChange={handleOnChange}
        placeholder ="brand"
        />
        <br/>

        <label htmlFor="image"></label>
        <input type="text"
        name="image"
        id="image"
        value={image}
        onChange={handleOnChange}
        placeholder="image"
        />
        <br/>

        <label htmlFor="price"></label>
        <input 
        type="text"
        name="price"
        id="price"
        value={price}
        onChange={handleOnChange}
        placeholder="price"
/>
<br/>
<button type = "Submit">Submit</button>
</form>

    </div>
}