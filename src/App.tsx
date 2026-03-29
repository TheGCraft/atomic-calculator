import { useState, type KeyboardEvent, useEffect } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

type CalcButton = {
  value: string;
  onClick: () => void;
  id: number;
};
function App() {


  //State to store the current input
  const [display, setDisplay] = useState<string>("");
  //State to store the result
  const [result, setResult] = useState<string>("0");
  //Function to add a value to the display
  const addValue = (value: string) => {
    setDisplay((prev: string) => {
      //If the last character is an operator and the new value is an operator, replace the last character with the new value
      const lastChar = prev.slice(-1);
      const operators = ["+", "-", "*", "/"];
      //If empty and starting with an operator except minus, ignore or ad 0
      if (prev === "" && ["+", "*", "/", "%"].includes(value)) return prev;
      //Prevent consecutive operators
      if (operators.includes(lastChar) && operators.includes(value)) {
        return prev.slice(0, -1) + value;
      }
      // If the "number" being typed is just "0", replace it with the new digit
      // But allow "0."
      const parts = prev.split(/[\+\-\*\/\%]/);
      const currentNumber = parts[parts.length - 1];
      if (currentNumber === "0" && !isNaN(Number(value)) && value !== ".") {
        return prev.slice(0, -1) + value;
      }

      //Prevent multiple decimals in one number
      if (value === "." && currentNumber.includes(".")) return prev;



      return prev + value;

    });
  };




  //Function to clear the display
  const clearAll: () => void = () => {
    setDisplay("");
    setResult("");
  }
  //Function to delete the last value
  const deleteLast: () => void = () => {
    setDisplay(display.slice(0, -1));
  }
  //Function to calculate the result
  const calculateResult: () => void = () => {
    try {
      const evalResult = evaluate(display);
      //Avoid long floating point strings
      const formattedResult = Number(evalResult.toFixed(10)).toString();

      setResult(formattedResult);
      setDisplay(formattedResult);
    } catch (error) {
      setResult("Error");
    }
  }
  //Function to handle keyboard input
  const handleKeyPress: (event: KeyboardEvent) => void = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === "Enter") {
      calculateResult();

    } else if (key === "Escape" || key === "c") {
      clearAll();
    } else if (key === "Backspace" || key === "Delete") {
      deleteLast();
    } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "." || key === "(" || key === ")" || key === "%") {
      addValue(key);
    } else if (key >= "0" && key <= "9") {
      addValue(key);
    }
  }

  //useEffect to handle keyboard input
  useEffect(() => {
    const handler = (e: any) => {
      handleKeyPress(e);
    }
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    }
  }, [display]);

  const buttons: CalcButton[] = [
    {
      value: "-",
      onClick: () => addValue("-"),
      id: 7
    },

    {
      value: "+",
      onClick: () => addValue("+"),
      id: 11
    },

    {
      value: "/",
      onClick: () => addValue("/"),
      id: 2
    },
    {
      value: "*",
      onClick: () => addValue("*"),
      id: 3
    },
    {
      value: "1",
      onClick: () => addValue("1"),
      id: 12
    },
    {
      value: "2",
      onClick: () => addValue("2"),
      id: 13
    },
    {
      value: "3",
      onClick: () => addValue("3"),
      id: 14
    },
    {
      value: "4",
      onClick: () => addValue("4"),
      id: 8
    },
    {
      value: "5",
      onClick: () => addValue("5"),
      id: 9
    },
    {
      value: "6",
      onClick: () => addValue("6"),
      id: 10
    },
    {
      value: "7",
      onClick: () => addValue("7"),
      id: 4
    },
    {
      value: "8",
      onClick: () => addValue("8"),
      id: 5
    },
    {
      value: "9",
      onClick: () => addValue("9"),
      id: 6
    },
    {
      value: "0",
      onClick: () => addValue("0"),
      id: 15
    },



    {
      value: ".",
      onClick: () => addValue("."),
      id: 16
    },
    {
      value: "=",
      onClick: calculateResult,
      id: 17
    },
    {
      value: "C",
      onClick: clearAll,
      id: 0
    },
    {
      value: "DEL",
      onClick: deleteLast,
      id: 1
    },
  ];






  return (
    <>
      <section id="center">
        <div className="header">
          <div className="title">
            <h1>Atomic Calculator </h1>

            <p>A Super Simple Calculator Built With React</p>

          </div>
        </div>
        <div className="container">
          <div className="calculator">
            <div className="expression" style={{ fontSize: display.length > 15 ? '1.2rem' : '2rem' }}>{display || "0"}</div>
            <div className="display" onKeyDown={handleKeyPress} tabIndex={0}>{result}</div>
            <div className="buttons">
              {buttons.map((button) => {
                return (
                  <button key={button.id} onClick={button.onClick}>{button.value}</button>
                )

              })}

            </div>
          </div>
        </div>

        <div className="footer">
          <p>Type your expression and press <span className="key">=</span> to calculate</p>
          <p>Press <span className="key">C</span> to clear all</p>
          <p>Press <span className="key">DEL</span> to delete the last value</p>
        </div>

      </section>


    </>
  )
}

export default App
