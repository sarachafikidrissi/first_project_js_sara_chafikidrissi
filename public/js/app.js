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

//check special characters
const checkSpecialCharacters = (str) => {
    let specialCharacters = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\^0-9]/
    if(specialCharacters.test(str)){
        return true
    }
}


//* create database where users information will be stored

let database = [{name: "hajar", email: "hajar@demo.com", age: 17, password: "12345", balance : 2200, loan: 0, investedMoney: 1000, investpercent: 120}]

class Client{
    constructor(name, email, age, password, balance, loan, investedMoney, investpercent){
        this.name = name
        this.email = email
        this.age = age
        this.password = password
        this.balance = 2000
        this.loan = loan
        this.investedMoney = investedMoney
        this.investpercent = investpercent
    }
}

const signUp = () => {
        //* Name
        let name = prompt("enter a name")
        if(name == "exit"){
            create()
        }else{
            name = nameCheck(name).name
            while(name.length < 5 || checkSpecialCharacters(name) || name == ""){
                nameagain = prompt("enter a name")
                name = nameCheck(nameagain).name
            }
        }
        //* Email
        let email = prompt("enter a email")
        if(email == "exit"){
            create()
        }else{
            while(checkEmailAt(email) || email.length < 10 || uniqueEmail(email) || email == ""){
                emailagain = prompt("enter email")
                email = emailCheck(emailagain)
            }
            email = emailCheck(email)
        }

        //* Age
        let age = prompt("enter a age")
        if(age == "exit"){
            create()
        }else{
            while(checkAge(age) || age.length == 0 || age.length >= 3 ){
                let ageagin = prompt("enter your age")
                age = ageagin
            }
        }
        let password = prompt("enter a password")
        if(password == "exit"){
            create()
        }else{
            while(checkPwd(password) == true){
                let passwordagain = prompt("enter your password")
                password = passwordagain
            }
            password = checkPwd(password)
        }
        let confirmPassword = prompt("confirm you password")
        if(confirmPassword != password){
            alert("password incorrect , unfortunatly you are blocked")
        }else if(confirmPassword == "exit"){
            create()
        }
        else{
            let clientInfo = new Client(name, email, parseInt(age), password)
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
            //* check if this user has a loan
            let idx = database.findIndex(e => e.email == email)
            if(database[idx].loan != 0){
                let beforebalance = database[idx].balance
                let credit = (database[idx].balance * 10) / 100
                database[idx].balance -= credit
                database[idx].loan -= credit
                console.log(`balance was ${beforebalance} lost ${credit} stays ${database[idx].loan} and now balance is ${database[idx].balance}`);
            }
            if(database[idx].investedMoney != 0 && database[idx].investpercent < 120){
                let newbalance = (database[idx].investedMoney * 20) / 100
                database[idx].balance += newbalance
                database[idx].investpercent += 20

            }
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
    console.log("you are loged out succesfully")
    create()
}



const withdraw = (userEmail) => {
    let idx = database.findIndex(e => e.email == userEmail)
    let money = prompt("how much woul you like to withdraw?")
        while(money > database[idx].balance){
            let newmoney = prompt("solde insufisant, choose another amount to withdraw")
            money = newmoney
        }
        let withdrawMoney = money
        database[idx].balance -= withdrawMoney
        console.log(database[idx].name + "You have withdraw " + withdrawMoney + " now your balance is " + database[idx].balance)
    return (withdrawMoney)
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
    console.log(database[client].name + " has deposit " + depositAmount + " now your balance is " + database[client].balance)
    return(depositAmount)
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
    database[idx].loan = parseInt(userLoan)
    console.log(database[idx].name + " take a loan of amount " + userLoan + " now your balance is " + database[idx].balance)
    return({userLoan: userLoan, email: userEmail})
}

const invest = (userEmail) =>{
    let idx = database.findIndex(e => e.email == userEmail)
    let investamount = prompt("how would you like to invest")
    while(investamount > database[idx].balance){
        let newinvestamount = prompt("your balance is less than the amount you want to invest")
        investamount = newinvestamount
    }
    database[idx].balance -= parseInt(investamount)
    database[idx].investedMoney += parseInt(investamount)
    console.log(`${database[idx].name} has invest ${investamount}`);
    return (investamount)
    
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

            let usernameidx = database.findIndex(e => e.email == isLogedIn)
            let username = database[usernameidx].name

            if(isLogedIn){
                let logedUser = prompt("choose an action from these options: (logout, withdraw money, deposit money, take a loan, invest)")
                if(logedUser == "logout"){
                    logout()
                    return (`${username} has deposit ${logout()}`)
                    
                }else if( logedUser == "exit"){
                    create()
                }
                if(logedUser == "withdraw money"){
                    return withdraw(isLogedIn)
                    
                }else if( logedUser == "exit"){
                    create()
                }
                if(logedUser == "deposit"){
                    return deposit(isLogedIn)

                }else if( logedUser == "exit"){
                    create()
                }
                if(logedUser === "take a loan"){
                    return loan(isLogedIn)

                }else if( logedUser == "exit"){
                    create()
                }
                if(logedUser == "invest"){
                    return invest(isLogedIn)

                }else if( logedUser == "exit"){
                    create()
                }
                
            }
            
        }else if(userChoice == "change password"){
            changePassword()
        }
    }else if(userChoice == "exit"){
        create()
    }


    
   
}

create()


console.log(database);

// let client1 = new Client("hajar", "hajar@email.com", 18, "12345")


// console.log(client1);

// database.push(client1)
// console.log(database);



