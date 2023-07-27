import './App.css';
import {useState, useEffect, useReducer, useRef} from "react";
import PlateData from './components/PlateData';

//Custom Hook
function useInput(initialValue){
  const [value, setValue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e) => setValue(e.target.value)
    },
    () => setValue(initialValue)
  ];

}

function App() {
  //Using Uncontrolled Form Element
  const txtTitle = useRef();
  const hexColor = useRef();

  //Using Controlled Form Element
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000");
  

  //Using a Custom Hook
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000");

  const [emotion, setEmotion] = useState("happy");
  const [secondary, setSecondary] = useState("tired");
  const[checked, setChecked] = useReducer(checked => !checked,false);

  //Event Handler Using Uncontrolled Form Element
  const submit = (e) => {
    e.preventDefault();
    let title = txtTitle.current.value;
    let color = hexColor.current.value;

    alert(`${title}, ${color}`);
    txtTitle.current.value = "";
    hexColor.current.value = "";
  };

  //Event Handler Using Controlled Form Element
  const submitControl = (e) => {
    e.preventDefault();
    alert(`${title}, ${color}`);
    setTitle("");
    setColor("#000");
  };

    //Using Custom Hooks
    const submitHooks = (e) => {
      e.preventDefault();
      alert(`${titleProps.value}, ${colorProps.value}`);
      resetTitle();
      resetColor();
    };

  useEffect(() => {
    console.log(`It's ${emotion} and ${secondary} right now`);
  }, [emotion, secondary]);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://data.cityofnewyork.us/resource/nc67-uf89.json?plate=JFH3466").then((response) => response.json())
    .then(setData)
    .then(() => setLoading(false))
    .catch(setError);
  }, []);

  if(loading) return <h1>Loading...</h1>;
  if(error) return <pre>{JSON.stringify(error)}</pre>;
  if(!data) return null;
    return (      
      <PlateData entries={data}/>
    );

  /*return (
    <div className="App">
      <h1>Current emotion is {emotion}</h1>
      <button onClick={() => setEmotion("happy")}>Happy</button>
      <button onClick={() => setEmotion("sad")}>Sad</button>
      <button onClick={() => setEmotion("excited")}>Excited</button>
      <button onClick={() => setEmotion("angry")}>Angry</button>
      <h1>Current secondary emotion is {secondary}</h1>
      <button onClick={() => setSecondary("grateful")}>Grateful</button>
      
      <br></br>
      <br></br>
      <hr></hr>

      <input type="checkbox" value={checked} onChange={setChecked}/>
      <label>{checked ? "Checked" : "Not Checked"}</label>
      
      <br></br>
      <br></br>
      <hr></hr>

      <h1>Using Uncontrolled Form Element</h1>
      <form onSubmit={submit}>
        <input ref={txtTitle} type="text" placeholder="Color Title"></input>
        <input ref={hexColor} type="color"></input>
        <button>Add</button>
      </form>

      <br></br>
      <br></br>
      <hr></hr>

      <h1>Using Controlled Form Element</h1>
      <form onSubmit={submitControl}>
        <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Color Title"></input>
        <input value={color} onChange={(event) => setColor(event.target.value)} type="color"></input>
        <button>Add</button>
      </form>

      <br></br>
      <br></br>
      <hr></hr>

      <h1>Using Custom Hooks</h1>
      <form onSubmit={submitHooks}>
        <input {...titleProps} type="text" placeholder="Color Title"></input>
        <input {...colorProps} type="color"></input>
        <button>Add</button>
      </form>
    </div>
  );*/
}

export default App;
