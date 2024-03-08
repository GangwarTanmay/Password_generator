let slider = document.getElementById("length");
let lengthDiv = document.querySelector(".showLength p");
let generateButton = document.getElementById("generate");
let result = document.getElementById("result");
let strength = document.getElementById("strength");
let copyButton = document.getElementById("copy");

let dictionary = "";
let UpperCase = "";
let LowerCase = "";
let numbers = "";
let temp_strength = 0;  // initially the strength is 0
let specialSymbols = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

for (let i = 65; i <= 90; i++) {
    UpperCase += String.fromCharCode(i);
}

for (let i = 97; i <= 122; i++) {
    LowerCase += String.fromCharCode(i);
}

for (let i = 0; i <= 9; i++) {
    numbers += i;
}


let length = slider.value;
lengthDiv.innerHTML = "Length : " + length;

slider.addEventListener("input", () => {
    length = slider.value;
    lengthDiv.innerHTML = "Length : " + length;
})

let checks = document.querySelectorAll(".check");

for (let check of checks) {
    check.addEventListener("click", () => {
        let id = check.getAttribute("id");
        changeIcon(id);
    });
}

function changeIcon(id) {
    let element = document.getElementById(id);
    let state = element.getAttribute("name");
    if (state == "false") {
        element.style.backgroundImage = "url('../icons/check-mark.png')";
        element.setAttribute("name", "true");
        state = element.getAttribute("name");
        addInDictionary(id);
    }
    else {
        element.style.backgroundImage = "none";
        element.setAttribute("name", "false");
        state = element.getAttribute("name");
        removeFromDictionary(id);
    }
}

function addInDictionary(id) {
    if (id == 'LC') {
        dictionary += LowerCase;
        temp_strength += 5;
    }
    if (id == 'UC') {
        dictionary += UpperCase;
        temp_strength += 5;
    }
    if (id == 'N') {
        dictionary += numbers;
        temp_strength += 5;
    }
    if (id == 'SS') {
        dictionary += specialSymbols;
        temp_strength += 5;
    }
}

function removeFromDictionary(id) {
    if (id == 'LC') {
        dictionary = dictionary.replace(LowerCase, "");     // replace method returns a new string
        temp_strength -= 5;
    }
    if (id == 'UC') {
        dictionary = dictionary.replace(UpperCase, "");
        temp_strength -= 5;
    }
    if (id == 'N') {
        dictionary = dictionary.replace(numbers, "");
        temp_strength -= 5;
    }
    if (id == 'SS') {
        dictionary = dictionary.replace(specialSymbols, "");
        temp_strength -= 5;
    }
}

generateButton.addEventListener("click", () => {
    if (dictionary.length == 0) showWarning();

    else {

        let password = "";
        for (let i = 0; i < length; i++) {
            let index = Math.floor(Math.random() * dictionary.length);
            password += dictionary.charAt(index);
        }
        result.style.color = "white";
        result.innerText = password;

        // check strength

        let showStrength = "";
        if (length <= 8) {
            showStrength = "WEAK";
        }
        if (length > 9 && length <= 14) {
            if (temp_strength >= 10) {
                showStrength = "MEDIUM";
            }
            else {
                showStrength = "WEAK";
            }
        }
        if (length > 14) {
            if (temp_strength >= 15) {
                showStrength = "STRONG";
            }
            else {
                showStrength = "MEDIUM";
            }
        }

        if (showStrength == "STRONG") {
            strength.style.color = "lightgreen";
            strength.innerText = "Strong password";
        }

        else if (showStrength == "MEDIUM") {
            strength.style.color = "yellow";
            strength.innerText = "Medium password";
        }
        else {
            strength.style.color = "#E74646";
            strength.innerText = "Weak password";
        }
    }
});

function showWarning() {
    let message = document.getElementById("message");
    let symbol = document.getElementById("symbol");
    symbol.style.backgroundImage = "url('../icons/warning.png')";
    message.style.display = "flex";

    let textMessage = document.getElementById("text-message");
    textMessage.innerText = "Select some symbols first!";

    setTimeout(() => {
        message.style.display = "none";
    }, 2000);
}


// copying to clipboard
copyButton.addEventListener("click", () => {
    let text = document.getElementById("result").innerText;
    if (dictionary.length > 0 && text != "PASSWORD") {      // We don't want to copy text 'PASSWORD' text in clipboard
        navigator.clipboard.writeText(text).then(() => {
            let message = document.getElementById("message");
            let symbol = document.getElementById("symbol");
            symbol.style.backgroundImage = "url('../icons/check-mark (1).png')";
            message.style.display = "flex";

            let textMessage = document.getElementById("text-message");
            textMessage.innerText = "Copied";

            setTimeout(() => {
                message.style.display = "none";
            }, 2000);
        });
    }
});