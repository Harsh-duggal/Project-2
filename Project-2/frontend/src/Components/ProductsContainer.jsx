import ProductCard from "./ProductCard";

export default function ProductsContainer({
  contacts,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productQuantity,
}) {
  return (
    <div className="ProductsContainer">
      {contacts.map((product) => {
     const qtyObj = productQuantity?.find((p) => p.id === product.id);
        const qty = qtyObj?.quantity ?? 0; // <-- bulletproof fix
        return(
        <ProductCard
          key={product.id}
          {...product}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={qty}
          
        />
        );
      })}
    </div>
  );
}
