export const ProductCard = (props) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={props.img} />
      </div>
      <div className="product-info">
        <h5>{props.itemName}</h5>
        <h6>{props.price}</h6>
      </div>
    </div>
  );
};
