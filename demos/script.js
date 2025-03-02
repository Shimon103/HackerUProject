const welcome = () => {
    const fullName = prompt("Please enter your full name: ");
    if (fullName.split(" ").length < 2) {
        alert("Name too short")
    } else if (fullName.split(" ").length > 2) {
        alert("Name too Long")
    } else {
        const nameArray = fullName.split(" ")
        if (nameArray[0].length < 2) {
            alert("First name too short")
        }
        if (nameArray[1].length < 2) {
            alert("Last name too short")
        } else {
            alert(`Welcome ${fullName}`)
        }
    }
}

const phone = (phuneNumber) => {
    phuneNumber.length <= 10 && phuneNumber.length >= 9 ? alert("Welcome") : alert("Bad Numner")
}

const email = (emailAdress) => {
    if (!emailAdress.includes("@")) {
        alert("Not a mail")
        return
    }
    const emailDomain = emailAdress.split("@")[1]
    emailDomain.toLowerCase() == "gmail.com" ? alert("welcome") : alert("Not a Gmail mail")
}

const trimName = (name) => {
    alert(`welcome ${name.replaceAll(" ", "")}`)
}

const printName = () => {
    const fullName = prompt("Please enter your full name: ");
    nameArray = fullName.split(" ");
    console.log(`First name: ${nameArray[0]}`);
    console.log(`Last name: ${nameArray[1]}`);

}

// *****************************
const oparation = (a, b, c) => {
    switch (c) {
        case "+":
            console.log(a + b);
            break;
        case "-":
            console.log(a - b);

            break;
        case "*":
            console.log(a * b);

            break;
        case "/":
            console.log(a / b);

            break;
        default:
            break;
    }
}
const myRandom = (n) => {
    let printedNumber = Math.random() * n
    console.log(Math.ceil(printedNumber));
}

const ceilMe = (a) => {
    console.log(Math.ceil(a));
}

const fakeRandom = ()=>{
    const powerList = [10,100,100]
    const powerPicked = powerList[Math.floor(Math.random()*powerList.length)]

    console.log(`Picked power: ${powerPicked}`);
    console.log(Math.ceil(Math.random()*powerPicked));
}

const taxBreak = (a, b) => {
    let basePrice = a / (1 + b/100);
    let tax = a - basePrice
    console.log(`Base price: ${basePrice.toFixed(2)}`);
    console.log(`Added tax: ${tax.toFixed(2)}`);

}