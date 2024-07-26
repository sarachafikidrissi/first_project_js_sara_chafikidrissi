//~ helper functions
// to check user choice
const check = (param) => {
    let choices = ["sign up", "login", "change password"]
    if(choices.includes(param)){
        return 1
    }
    // }else{
    //     alert(`our bank doesn't offer this choice : ${param}`)
    // }
}


// to check name
const nameCheck = (name) => {
    //^remove spaces at end and first
    let trimedName = name.trim()
    //^upper case first letter
    //^uppercase letters after space
    let splitName = trimedName.toLowerCase().split(' ')
    let length = 0
    for (let i = 0; i < splitName.length; i++) {
        splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1)
        length += splitName[i].length
    }
    name = splitName.join(' ')
    return({name: name, length: length })
}

// to check email

const emailCheck = (email) => {
    let checkedEmail = email.trim().toLowerCase()
    if(database.find(e => e.email === checkedEmail)){

    }
    return(checkedEmail)
    
}

const checkEmailAt = (email) => {
    let arr = email.split('').filter(e => e == "@")
    if(arr.length >1 || arr.length<= 0){
        return true
    }
}

//check if email is unique
const uniqueEmail = (email) => {
    if(database.find(element => element.email === email)){
        return true
    }
}

const checkAge = (age) => {
    let ageChecked = age.trim()
    let num =/[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\^A-Za-z]/
    if(num.test(ageChecked)){
        return(true)
    }

}

//check password 
const checkPwd = (password) => {
    let pwdChecked = password.trim()
    let pwdHasSpace = pwdChecked.split(' ').find(e => e == " ")
    if (pwdHasSpace || pwdChecked.length < 7){
        return true
    }else{
        return pwdChecked
    }
    

}

const checkSpecialCharacters = (str) => {
    let specialCharacters = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\^0-9]/
    if(specialCharacters.test(str)){
        return true
    }
}

//* create database where users information will be stored

let database = [{name: "hajar", email: "hajar@demo.com", age: 17, password: "12345", balance : 2000}]

class Client{
    constructor(name, email, age, password, balance){
        this.name = name
        this.email = email
        this.age = age
        this.password = password
        this.balance = 2000
    }
}

const signUp = () => {
        //* Name
        let name = prompt("enter a name")
        name = nameCheck(name).name
        while(name.length < 5 || checkSpecialCharacters(name) || name == ""){
            nameagain = prompt("enter a name")
            name = nameCheck(nameagain).name
        }
        //* Email
        let email = prompt("enter a email")
        while(checkEmailAt(email) || email.length < 10 || uniqueEmail(email) || email == ""){
            emailagain = prompt("enter email")
            email = emailCheck(emailagain)
        }
        email = emailCheck(email)

        //* Age
        let age = prompt("enter a age")
        while(checkAge(age) || age.length == 0 || age.length >= 3 ){
            let ageagin = prompt("enter your age")
            age = ageagin
        }
        let password = prompt("enter a password")
        while(checkPwd(password) == true){
            let passwordagain = prompt("enter your password")
            password = passwordagain
        }
        password = checkPwd(password)
        let confirmPassword = prompt("confirm you password")
        if(confirmPassword != password){
            alert("password incorrect , unfortunatly you are blocked")
        }else{
            let clientInfo = new Client(name, email, age, password)
            database.push(clientInfo)
            alert("Your account have been created")
        }

    }

const logIn = () => {
    let email = prompt("enter your email")
    if(database.find(e => e.email == email)){
        let password = prompt("enter your password")
        if(database.find(e => e.password == password)){
            alert("You are Loged In")
            return (email)
        }else{
            alert("Password is incorrect")
        }
    }else{
        alert("Email is incorrect")
    }
    // return (email)
}

const changePassword = () => {
    let email = prompt("Enter your email to change your password")
    if (database.find(e => e.email == email)){
        let newPassword = prompt("enter your new password")
        while(checkPwd(newPassword) == true){
            let passwordagain = prompt("enter your password")
            newPassword = passwordagain
        }
        newPassword = checkPwd(newPassword)

        let idx = database.findIndex(e => e.email == email)
        database[idx].password = newPassword
    }
}


const logout = () => {
    alert("you are loged out succesfully")
    create()
}



const withdraw = (userEmail) => {
    let idx = database.findIndex(e => e.email == userEmail)
    let money = prompt("how much woul you like to withdraw?")
    {
        while(money > database[idx].balance){
            let newmoney = prompt("solde insufisant, choose another amount to withdraw")
            money = newmoney
        }
        let withdrawMoney = money
        database[idx].balance -= withdrawMoney
        alert("You have withdraw " + withdrawMoney + " now your balance is " + database[idx].balance)
    }
}
const deposit = (userEmail) => {
    let amount = prompt("how much would you like to deposit?")
    while(amount > 1000){
        let newamount = prompt("how much would you like to deposit? you can deposit an amout up to 1000 dirhams only")
        amount = newamount
    }
    let depositAmount = amount
    let client = database.findIndex(e => e.email == userEmail)
    database[client].balance += parseInt(depositAmount)
    alert("You have deposit " + depositAmount + " now your balance is " + database[client].balance)
    
}

const loan = (userEmail) => {
    let idx = database.findIndex(e => e.email == userEmail)

    let userBalance = database[idx].balance
    let maxLoan = (userBalance * 20) / 100 
    let userLoan = prompt("how much would like to take as a loan?")
    while(userLoan > maxLoan){
        let newloan = prompt("unfortunatly you can take  loan up to 20% of your account balance, please choose another number")
        userLoan = newloan
    }
    // userLoan = newloan
    database[idx].balance += parseInt(userLoan)
    alert("You have take a loan of amount " + userLoan + " now your balance is " + database[idx].balance)
}

const create = () => {
    //^ask client to choose an action
    let userChoice = prompt("choose an action from these options: (sign up, login, change password)")
    //^check user choice
    let x = check(userChoice)

    if(x == 1){
        if(userChoice == "sign up"){
            //^user choose to Sign Up
            signUp()
        }else if(userChoice == "login"){
            //^user choose to login
            let isLogedIn = logIn()

            if(isLogedIn){
                let logedUser = prompt("choose an action from these options: (logout, withdraw money, deposit money, take a loan, invest)")
                if(logedUser == "logout"){
                    logout()
                }
                else if(logedUser == "withdraw money"){
                    withdraw(isLogedIn)
                }else if(logedUser == "deposit"){
                    deposit(isLogedIn)
                }else if(logedUser === "take a loan"){
                    loan(isLogedIn)
                }
            }
            
        }else if(userChoice == "change password"){
            changePassword()
        }
    }
   
}

create()


console.log(database);

// let client1 = new Client("hajar", "hajar@email.com", 18, "12345")


// console.log(client1);

// database.push(client1)
// console.log(database);



