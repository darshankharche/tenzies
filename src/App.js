
import './App.css';
import React from 'react';
import Card from './components/Card';
import Confetti from 'react-confetti';
function App() {
  const [state,setState] = React.useState([
    {
      id: 0,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    },
    {
      id: 1,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    },
    {
      id: 2,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    },
    {
      id: 3,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    },
    {
      id: 4,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    },
    {
      id: 5,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    },
    {
      id: 6,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    },
    {
      id: 7,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    },{
      id: 8,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    },{
      id: 9,
      isFixed: false,
      value: Math.floor(Math.random()* 10)   
    }
  ])
  const [selectedNumber,setSelectedNumber] = React.useState()
  const [status,setStatus] = React.useState("InProgress")
  const showNumbers = state.map(per=> <Card key={per.id} id={per.id} number={per.value} handleClick={handleClick} />)

  //console.log(selectedNumber)

  function changeNumbers(){
    if(status === "InProgress"){
      setState(prevState=>{
        const newArray = []
        for(let i = 0; i < prevState.length ; i++){
          
            newArray.push(prevState[i].isFixed ? prevState[i] : {...prevState[i], value: Math.floor(Math.random()* 10) }) 
          
        }
        
        return newArray
      })
      
    }else{
      setState(prevState=>{
        const newArray = []
        for(let i = 0; i < prevState.length ; i++){             
          newArray.push({...prevState[i],isFixed: false,value: Math.floor(Math.random()* 10)})
          document.getElementById(`card${i}`).classList.remove("green")
          document.getElementById(`card${i}`).classList.remove("red")
        }
        return newArray
      })
      setSelectedNumber(NaN)
      setStatus("InProgress")
    }
    
  }

  function handleClick(id,value){
    const checkIfCorrect = selectedNumber ? selectedNumber : value
    !selectedNumber && setSelectedNumber(value)
    

    const cardElement = document.getElementById(`card${id}`)
    ///console.log(cardElement)
    value === checkIfCorrect ? cardElement.classList.add("green") : cardElement.classList.add("red")
    value !== checkIfCorrect && setStatus("Failed")

    setState(prevState=>{
      const newState = []
      let count = 0
      for(let i =0; i< prevState.length;i++){
        if(prevState[i].id === id){
          newState.push({...prevState[i],isFixed: true})
          
        }else{
          newState.push(prevState[i])
        }
        if(document.getElementById(`card${i}`).classList.contains("green")){
          count++
        }
      }
      //console.log(count)
      if(count === 10){
        setStatus("Success")
      }
      return newState
    })
  }
  //console.log(status)
  return (
    <div className="App">
      <div className="main-section">
        <h1>Tenzies</h1>
        
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        {status === "Success" && <p>Congratulations !! You won the game</p>}
        {status === "Failed" && <p>Oops, Please try again</p>}
        <div className='numbers'>
         {showNumbers}
        </div>
        <button onClick={changeNumbers}>{status === "InProgress" ? "Roll" : "Restart"}</button>  
        {status === "Success" && <Confetti />}
      </div>
    </div>
  );
}

export default App;
