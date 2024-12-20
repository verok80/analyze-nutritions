import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import NutritionComponent from './NutritionComponent';
import Loader from './Loader/Loader';
import image from './tabletop.jpg';





//

function App() {
  const MY_ID = 'dc43f5c9';
  const MY_KEY = '41004f36187693a52846881269bea7f0';
  const MY_URL = 'https://api.edamam.com/api/nutrition-details'


  const [mySearch, setMySearch]= useState();
  const [nutrition, setNutrition] = useState();
  const [wordEntered, setWordEntered] = useState('');
  const [loading, setLoading] = useState(false);

const getData = async(ingr) =>{
  setLoading(true);

  const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'accept': 'application/json'
            },
              body: JSON.stringify({ingr:ingr})
            
})
if (response.ok){
    setLoading(false);

 
  const data= await response.json();
  setNutrition(data);
}
else{
  setLoading(false);
 
  Swal.fire({
    title: "ERROR!",
    text: "Ingredients entered incorrectly. Example: 1egg 2bananas 1apple, etc",
    //imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=3350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/70/70",
    //imageWidth: 70,
    //imageHeight: 70,
    //imageAlt: "Custom image"
  })
  
}
}
const myDataSearch = (e)=> {
  setMySearch(e.target.value)
}
const finalSearch =(e) => {
  e.preventDefault();
  setWordEntered(mySearch);

}
useEffect(() => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
}, []);


useEffect(() =>{
  if(wordEntered !== ''){
    let ingr = wordEntered.split(/[,,;,\n,\r]/);
    getData(ingr);
  }

}, [wordEntered])

  return (
    <div>
    
       {loading && <Loader/>}
       <div className='container'>
      <img src= {image} alt="" />
   
      <h1>Nutrition Analysis</h1>
      </div>
      <div className='container'>
      <form onSubmit={finalSearch}>
        <input  className="searchBox" onChange={myDataSearch} placeholder="Enter your ingridients..." />
        <div className='container'>
        <button type="submit">Analyze</button>
        </div>
      </form>
      </div>
   <div className='list list-box'>
    {
      nutrition && <p className='calories'>{nutrition.calories} total kcal </p>
    }
    {
      nutrition && Object.values(nutrition.totalNutrients).map(({label, quantity, unit})=>
    
    <NutritionComponent
    label={label}
    quantity ={quantity}
    unit ={unit}
    />
  )
}

    </div>
    </div>
  );
}

export default App;
