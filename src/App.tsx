import { useState, type KeyboardEvent, useEffect } from 'react'
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

      //Prevent multiple leading zeros
      if (prev === "0" && value === "0") {
        return prev;
      }
      //If current value is 0 and the new value is not 0, replace the 0 with the new value
      if (prev === "0" && !isNaN(Number(value))) {
        return value;
      }
      //Prevent leading zeros after an operator
      if (operators.includes(lastChar) && value === "0") {
        return prev;
      }
      //Prevent consecutive operators
      if (operators.includes(lastChar) && operators.includes(value)) {
        return prev.slice(0, -1) + value;
      }
      //Prevent multiple decimal points
      if (value === "." && prev.includes(".")) {
        return prev;
      }
      //Prevent multiple decimal points after an operator
      if (operators.includes(lastChar) && value === ".") {
        return prev;
      }
      //Prevent multiple decimal points after an operator
      if (operators.includes(lastChar) && value === ".") {
        return prev;
      }

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
      //Regex to find numbers with leading zeros
      const sanitizedDisplay = display.replace(/\b0+(?=\d)/g, '');

      const evalResult: number = eval(sanitizedDisplay);
      setResult(evalResult.toString());
      setDisplay(evalResult.toString());
    } catch (error) {
      setResult("Error");
    }
  }
  //Function to handle keyboard input
  const handleKeyPress: (event: KeyboardEvent) => void = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === "Enter") {
      calculateResult();

    } else if (key === "Escape") {
      clearAll();
    } else if (key === "Backspace") {
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
            <div className="expression">{display || "0"}</div>
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
