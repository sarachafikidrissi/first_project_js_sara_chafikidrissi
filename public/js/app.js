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
    let ageChecked = age.trim().toLowerCase()
    let num =/[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\^A-Za-z]/
    if(num.test(ageChecked)){
        return(true)
    }

}

const checkSpecialCharacters = (str) => {
    let specialCharacters = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\^0-9]/
    if(specialCharacters.test(str)){
        return true
    }
}

//* create database where users information will be stored

let database = [{name: "hajar", email: "hajar@demo.com", age: 17, password: "12345"}]

class Client{
    constructor(name, email, age, password){
        this.name = name
        this.email = email
        this.age = age
        this.password = password
    }
}
const create = () => {
    //^ask client to choose an action
    let userChoice = prompt("choose an action from these options: (sign up, login, change password)")
    //^check user choice
    let x = check(userChoice)

    if(x == 1){
        //^user choose to Sign Up
        if(userChoice == "sign up"){
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
            let clientInfo = new Client(name, email, age, password)
            database.push(clientInfo)
        }
    }
   
}

let userChoice = prompt("choose an action from these options: (sign up, login, change password)")

while(userChoice == "" || userChoice != "sign up" || userChoice != "login" || userChoice != "change password"){
    create()
}

console.log(database);

// let client1 = new Client("hajar", "hajar@email.com", 18, "12345")


// console.log(client1);

// database.push(client1)
// console.log(database);



