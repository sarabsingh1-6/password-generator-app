import "./App.css";
import { useState } from "react";
import { upperCaseLetters, lowerCaseLetters, numbers, special } from "./data";
import Modal from "./modal/Modal";

function App() {
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(6);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [modal, setModal] = useState({
    title: "",
    show: false,
    message: "",
  });

  //increment counter fun
  const increaseCounter = (e) => {
    e.preventDefault();
    if (counter < 20) {
      // here am checking for the password length max 20
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  //decrement counter fun
  const decreaseCounter = (e) => {
    e.preventDefault();
    if (counter > 6) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  //on button click genereate password this function will run
  const generatePassword = (e) => {
    e.preventDefault();
    let _passowrd = "";
    for (let i = 0; i < counter; i++) {
      _passowrd += getRandom(); // adding random char to the _password var by call getRamdom fun
    }
    setPassword(_passowrd); // setting password state to the value to _password var
  };

  const getRandom = () => {
    const chars = [];

    if (isUppercase) {
      chars.push(
        upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)]
      );
    }

    if (isLowercase) {
      chars.push(
        lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)]
      );
    }

    if (numbers) {
      chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }

    if (isSymbol) {
      chars.push(special[Math.floor(Math.random() * special.length)]);
    }

    if (chars.length === 0) return ""; // if no value is pushed in chars return empty string

    return chars[Math.floor(Math.random() * chars.length)]; // return random value from chars array
  };

  const createCopy = () => {
    const textAreaEl = document.createElement("textarea"); // creating a textarea element here
    textAreaEl.innerHTML = password; // adding the password state value into the textarea
    document.body.appendChild(textAreaEl); // appeding to the body
    textAreaEl.select();
    document.execCommand("copy");
    textAreaEl.remove();
  };

  const copyPasswordHandler = (e) => {
    e.preventDefault();

    if (password.trim().length === 0) {
      setModal({
        title: "ERROR",
        message: "Please generate your password first!",
        show: true,
      });
    } else {
      setModal({
        title: "SUCCESS",
        message: "Your Password has been copied",
        show: true,
      });
    }
    createCopy(); // calling the copy function
  };

  const closeModalHandler = () => {
    setModal({ ...modal, show: false });
  };

  return (
    <div className="App">
      {modal.show && (
        <Modal
          onClose={closeModalHandler}
          title={modal.title}
          message={modal.message}
        />
      )}
      <div className="mainWrap">
        <div className="generator">
          <h2 className="generator__title">Password Generators</h2>
          <h4 className="password">{password}</h4>
          {/* password state value will be show here */}
        </div>

        <form className="generator__form">
          <div className="generator__form-controls">
            <div className="generator__form-control">
              <label htmlFor="uppercase">Uppercase </label>
              <input
                checked={isUppercase} //adding check attr
                onChange={(e) => {
                  setIsUppercase(e.target.checked); //on change manuplating the state value
                }}
                type="checkbox"
                id="uppercase"
                name="uppercase"
              ></input>
            </div>
            <div className="generator__form-control">
              <label htmlFor="lowercase">Lowercase </label>
              <input
                checked={isLowercase} //adding check attr
                onChange={(e) => {
                  setIsLowercase(e.target.checked); //on change manuplating the state value
                }}
                type="checkbox"
                id="lowercase"
                name="lowercase"
              ></input>
            </div>
            <div className="generator__form-control">
              <label htmlFor="numbers">Numbers </label>
              <input
                checked={isNumber} //adding check attr
                onChange={(e) => {
                  setIsNumber(e.target.checked); //on change manuplating the state value
                }}
                type="checkbox"
                id="numbers"
                name="numbers"
              ></input>
            </div>
            <div className="generator__form-control">
              <label htmlFor="symbols">Symbols </label>
              <input
                checked={isSymbol} //adding check attr
                onChange={(e) => {
                  setIsSymbol(e.target.checked); //on change manuplating the state value
                }}
                type="checkbox"
                id="symbols"
                name="symbols"
              ></input>
            </div>

            <div className="generator__length">
              <h4 className="generator__length-title">Password Length</h4>
              <div className="generator__length-counter">
                <button onClick={decreaseCounter}>-</button>
                <span>{counter}</span>
                <button onClick={increaseCounter}>+</button>
              </div>
            </div>

            <div className="generator__form-actions">
              <button onClick={generatePassword} className="btn generate-btn">
                Generate Password
              </button>
              <button onClick={copyPasswordHandler} className="btn copy-btn">
                Copy Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
