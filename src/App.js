import React, { useState } from "react";

import Display from "./components/Display";
import Button from "./components/Button";

import "./App.css";

const buttons = [
  ["C", "%", "√", "^"],
  [7, 8, 9, "+"],
  [4, 5, 6, "-"],
  [1, 2, 3, "×"],
  [0, ".", "⌫", "÷"],
];

const calculate = (a, b, operator) =>
  operator
    ?
    operator === "+"
      ? a + b
      : operator === "-"
        ? a - b
        : operator === "×"
          ? a * b
          : operator === "^"
            ? a ** b
            : operator === "√"
              ? a === 0
                ? Math.sqrt(b)
                : Math.pow(b, 1 / a)
              : a / b
    : a ? a : b;

const App = () => {
  let [calc, setState] = useState({
    operator: "",
    num0: 0,
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    const num = calc.num.toString().includes(".") && ["0", "."].includes(calc.num.slice(-1))
      ? calc.num.toString() + value
      : Number(calc.num.toString() + value);
    setState({
      ...calc,
      num: num,
      res: calculate(calc.num0, num, calc.operator),
    });
  };

  const dotClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setState({
      ...calc,
      num: calc.num.toString().includes(".") ? calc.num : calc.num.toString() + value,
    });
  };

  const operatorClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    const res = !calc.res && calc.num ? calc.num : calc.res;
    const num0 = calc.res;
    setState({
      ...calc,
      operator: value,
      num0: num0,
      num: 0,
      res: calculate(num0, 0, value),
    });
  };

  const backspaceClickHandler = () => {
    const operator = calc.num ? calc.operator : "";
    const num0 = operator ? calc.num0 : 0;
    const num = calc.num === 0 && operator === "" && calc.num0 !== 0
      ? calc.num0
      : calc.num.toString().slice(0, -1).includes(".")
        ? calc.num.toString().slice(0, -1)
        : Number(calc.num.toString().slice(0, -1));
    setState({
      ...calc,
      num0: num0,
      num: num,
      operator: operator,
      res: calculate(num0, num, operator),
    });
  };

  const percentClickHandler = () => {
    setState({
      ...calc,
      num0: 0,
      operator: "",
      num: calc.res / 100,
      res: calc.res / 100,
    });
  };

  const clearClickHandler = () => {
    setState({
      ...calc,
      operator: "",
      num0: 0,
      num: 0,
      res: 0,
    });
  };

  return (
    <div className="calculator bg-secondary">
      <Display num0={calc.num0} operator={calc.operator} num={calc.num} res={calc.res} />
      <div className="buttons">
        {buttons.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              value={btn}
              onClick={
                btn === "C"
                  ? clearClickHandler
                  : btn === "%"
                    ? percentClickHandler
                    : btn === "⌫"
                      ? backspaceClickHandler
                      : btn === "÷" || btn === "×" || btn === "-" || btn === "+" || btn === "^" || btn === "√"
                        ? operatorClickHandler
                        : btn === "."
                          ? dotClickHandler
                          : numClickHandler
              }
              className={
                btn === "C" || btn === "⌫"
                  ? "button bg-danger"
                  : btn == "÷" || btn === "×" || btn === "-" || btn === "+" || btn === "^" || btn === "√" || btn === "%"
                    ? "button bg-warning"
                    : "button bg-primary"
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
