import { useEffect, useState } from "react";

function App() {
  const light = {
	"backgroundColor" : "#eee",
	"backgroundColorDark" : '#131a26'
  }
  const [modes,setModes] = useState("light");
  const [style,setStyle] = useState(modes); 
  const [calc,setCalc] = useState("");
  const [result,setResult] = useState("");
  const ops = ["/","+","*","-","."];

  // Update Value for each Button
  const updateCalc = (value) =>{
	if(
		(ops.includes(value) && calc === "" && value!=="-") || 
		(ops.includes(value) && ops.includes(calc.slice(-1)))
	){
		return;
	}

	setCalc(calc + value);
	
	if(!ops.includes(value)){
		setResult(eval(calc + value).toString());
	}
  }

  // Delete Button 
  const deleteLast = () =>{
	if( calc === ""){
		return
	}
	const value = calc.slice(0,-1);
	setCalc(value);
  }
  
  // Result Button
  const calculate = () =>{
	try{
		setResult(eval(calc).toString());
	}catch(e){
		console.log(e)
	}
  }
  // Creating the 1-10 Digits Buttons
  const createDigits = () => {
	const digits = [];
	for(let i=1;i<10;i++){
		digits.push(<button onClick={()=>updateCalc(i.toString())} key={i}>{i}</button>)
	}
	return digits; 
 }

 useEffect(()=>{
	if(!result){
		return
	}
	calculate()
 },[calc])
 
  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span>:""}
		  {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={()=>updateCalc("/")}>/</button>
          <button onClick={()=>updateCalc("*")}>*</button>
          <button onClick={()=>updateCalc("+")}>+</button>
          <button onClick={()=>updateCalc("-")}>-</button>
          <button onClick={deleteLast}>DEL</button>
        </div>
        <div className="digits">
		  {createDigits()}
          <button onClick={()=>updateCalc("0")}>0</button>
          <button onClick={()=>updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
