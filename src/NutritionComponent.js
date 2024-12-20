const NutritionComponent = ({label, quantity, unit}) => {
    return(
        <div>
    <p><b className="label">{label}</b> - {quantity.toFixed(2)}  {unit}</p>
    </div>
    )
}
export default NutritionComponent;