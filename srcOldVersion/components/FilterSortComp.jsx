export const FilterSortComp = (props) => {
  const { listOfOptions, label } = props;

  return (
    <div className="collection-sort">
      <label>{label}</label>
      <select>
        {listOfOptions.map((opt) => (
          <option value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};