//this version correctly handles text entry sand backspaces

document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const answerLabel = document.getElementById("answerLabel");
  const askButton = document.getElementById("askButton");
  const myString = "Pensive Wolf, please answer our question:"; // Replace this with your desired string
  let isPrankMode = false;
  let prankIndex = 0;
  let isBackSpace = false;
  let hiddenString = "";

  let joshReplies = [
    "The Wolf is tired now, please try again later",
    "The Wolf does not feel like answering your question",
    "Your petition has offended the Wolf",
    "The Wolf is not obligated to answer your question",
    "The Wolf did not like your question",
    "Do not waste the Wolf's great wisdom",
  ];

  textInput.addEventListener("keydown", (event) => {
    var key = event.keyCode || event.charCode;

    if (key == 8 || key == 46) {
      isBackSpace = true;
    } else {
      isBackSpace = false;
      if (isPrankMode) {
        if ((65 <= key && key <= 90) || key === 32) {
          hiddenString += String.fromCharCode(key);
          // answerLabel.textContent = hiddenString;
        }
      }
    }

    // if (event.key === "backspace"){
    //     isBackSpace = true;
    // } else {
    //     isBackSpace = false;
    // }
  });
  textInput.addEventListener("input", () => {
    const enteredText = textInput.value;
    if (enteredText === "") {
      isPrankMode = false;
      prankIndex = 0;
    }
    if (!isBackSpace) {
      if (!isPrankMode && enteredText.charAt(0) === ".") {
        isPrankMode = true;
        textInput.value = myString.charAt(0); // Display the first character of myString
        prankIndex++;
      } else if (isPrankMode) {
        // prankIndex = enteredText.length - 1;
        if (prankIndex < myString.length) {
          textInput.value = enteredText.substring(0, enteredText.length - 1);
          textInput.value += myString.charAt(prankIndex); // Append corresponding character from myString
          prankIndex++;
        } else {
          textInput.value = enteredText.substring(0, enteredText.length - 1);
          textInput.value += " "; //append a blank space after using all the characters in myString
          prankIndex++;
        }
      }
    } else {
      textInput.value = enteredText.substring(0, enteredText.length);
      //isBackSpace = false;
      if (isPrankMode && prankIndex > 0) {
        prankIndex--;
        hiddenString = hiddenString.substring(0, enteredText.length);
        // answerLabel.textContent = hiddenString;
      }
      if (prankIndex <= 0) {
        isPrankMode = false;
      }
    }
  });

  // textInput.addEventListener("click", (event) => {
  //     event.preventDefault();
  // });

  askButton.addEventListener("click", () => {
    const enteredText = textInput.value;
    if (isPrankMode) {
      let stringToCap = capitalize(hiddenString);
      answerLabel.textContent = stringToCap;
      resetPrankMode();
      
    } else {
      answerLabel.textContent = joshReplies[Math.floor(Math.random() * 6)];
    }
  });

  function capitalize(hiddenString){
    const arr = hiddenString.split(" ");

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toLowerCase();
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }
    const str2 = arr.join(" ");
    return str2;
  }

  function resetPrankMode(){
    hiddenString = "";
      textInput.value = "";
      isPrankMode = false;
      prankIndex = 0;
  }
});
