import ProductCard from "./ProductCard";

export default function ProductsContainer({
  contacts,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleOnDelete,
  productQuantity,
}) {
  return (
    <div className="ProductsContainer">
      {contacts.map(product => {
    const qty = productQuantity.find(p => p.id === product.id)?.quantity || 0;
        return(
        <ProductCard
          key={product.id}
          {...product}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleOnDelete={handleOnDelete}
          productQuantity={qty}
        />
        );
      })}
    </div>
  );
}
