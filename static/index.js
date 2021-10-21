
let cardList = document.querySelector('#list')
let employees = []
let authenticated = false;
let errors = {
    name:'',
    email:'',
    phone:'',
    city:'',
    zipcode:'',
    street:'',
    date_of_birth:''
}
let currentEmployee = null
let previousCard = null

let handleEdit = (card)=>{
    if(previousCard!=null){
        previousCard.style.border='1px solid silver'
    }
    let form = document.getElementById('add-form')
    if(previousCard==card){
        previousCard = null
        form.name.value = ''
        form.email.value = ''
        form.phone.value = ''
        form.city.value = ''
        form.zipcode.value = ''
        form.street.value = ''
        form.date_of_birth.value = ''
        document.getElementById('edit-employee').style.display='none'

    }else{
        document.getElementById('edit-employee').style.display='inline-block'
        card.style.border='2px solid lightgreen'
        
        let date = new Date(currentEmployee.date_of_birth)
        let year = date.getFullYear()
        let month = (''+(date.getMonth()+1)).length==2?date.getMonth()+1:'0'+(date.getMonth()+1)
        let day = (''+(date.getDate())).length==2?date.getDate():'0'+(date.getDate())
     
        let formatedDate = `${year}-${month}-${day}`
        form.name.value = currentEmployee.name
        form.email.value = currentEmployee.email
        form.phone.value = currentEmployee.phone
        form.city.value = currentEmployee.city
        form.zipcode.value = currentEmployee.zipcode
        form.street.value = currentEmployee.street
        form.date_of_birth.value = formatedDate

        previousCard = card
    }
}

let hideErrors = () =>{
    let errorSpans = document.getElementsByClassName('error')
    for(let error of errorSpans){
        error.innerText = ''
    
    }
}

let showErrors = () => { 
    let errorSpans = document.getElementsByClassName('error')
    let i = 0;
    for(let error in errors){
        errorSpans[i].innerText = errors[error]
        i++
    }
}

let handleValidation = (employee) => {
    let isCorrect = true
    if(employee.name.length==0){
        errors.name = `Name field can't be empty.`
        isCorrect = false
    }
    else if(!employee.name.match(/^[a-zA-Z\s]+$/)){
        errors.name = 'Name field should be only letters.'
        isCorrect = false
    }else{
        errors.name = ''
    }

    if(employee.email.length==0){
        errors.email = `Email field can't be empty.`
        isCorrect = false
    }
    else if(!employee.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        errors.email = 'Email field should be properly formated. johndoe@example.com'
        isCorrect = false
    }else{
        errors.email = ''
    }
    if(employee.phone.length==0){
        errors.phone = `Phone field can't be empty.`
        isCorrect = false
    }
    else if(!employee.phone.match(/^[0-9\s]*$/)){
        errors.phone = 'Phone field should be properly formated. Use only numbers and spaces. eg 066 060 950'
        isCorrect = false
    }else{
        errors.phone = ''
    }

    if(employee.city.length==0){
        errors.city = `City field can't be empty.`
        isCorrect = false
    }
    else if(!employee.city.match(/^[a-zA-Z\s]+$/)){
        errors.city = 'City field should be only letters.'
        isCorrect = false
    }else{
        errors.city = ''
    }

    if(employee.zipcode.length==0){
        errors.zipcode = `Zipcode field can't be empty.`
        isCorrect = false
    }
    else if(!employee.zipcode.match(/^[0-9]+$/)){
        errors.zipcode = 'Zipcode field should be only numbers.'
        isCorrect = false
    }

    if(employee.street.length==0){
        errors.street = `Street name field can't be empty.`
        isCorrect = false
    }
    else if(!employee.street.match(/^[a-zA-Z0-9\s]+$/)){
        errors.street = 'Street name field can consist of only letters, numbers and spaces. eg: Kraljevica Marka 2' 
        isCorrect = false
    }

    if(employee.date_of_birth.length==0){
        errors.date_of_birth = `Date field can't be empty.`
        isCorrect = false
    }
    else{
        errors.date_of_birth = ''
    }



    hideErrors()
    return isCorrect
}

let fetchUsers = async ()=>{
    let response = await fetch('http://localhost:3000/employees')
    let employees = await response.json()
    return employees
}

let fetchUser = async (id)=>{
    let response = await fetch(`http://localhost:3000/employees/${id}`)
    let json = await response.json()

    return json
}

let addEmployee = async (employee)=>{
    let response = await fetch('http://localhost:3000/employees',{
        method:'POST',
        body:JSON.stringify(employee),
        headers:{
            'Content-type':'application/json'
        }
    })
    let data = await response.json()
    if(data.message == 'Successful insert.'){
        let curEmployee = await fetchUser(data.userID)
        
        employees = [...employees, curEmployee]
        
        let cardListElements = createListElements([curEmployee])

        cardListElements.forEach((listElement)=>{
            cardList.appendChild(listElement)
        })
    }
}

let editEmployee = async (id)=>{
    let form = document.getElementById('add-form')

    currentEmployee.name = form.name.value
    currentEmployee.email =  form.email.value 
    currentEmployee.phone = form.phone.value
    currentEmployee.city = form.city.value 
    currentEmployee.zipcode = form.zipcode.value  
    currentEmployee.street = form.street.value  
    currentEmployee.date_of_birth = form.date_of_birth.value

    if(handleValidation(currentEmployee)){
        let response = await fetch(`http://localhost:3000/employees/${id}`,{
            method:'PUT',
            body:JSON.stringify(currentEmployee),
            headers:{
                'Content-type':'application/json'
            }
        })
        let data = await response.json()
        if(data.message == 'Successful edit.'){
            employees = employees.map((employee)=>employee.id!=currentEmployee.id?employee:currentEmployee)
            return true
        }
    }
    else{
        showErrors()
        return false
    }
   
}

let deleteEmployee = async (id)=> {
    let response = await fetch(`http://localhost:3000/employees/${id}`,{
        method:'DELETE',
    })
    let data = await response.json()

    if (data.message == 'Successful delete.'){
        return true
    }
    return false
}

document.getElementById('edit-employee').addEventListener('click', async (evt)=>{
    evt.preventDefault()
    if(await editEmployee(currentEmployee.id)){
        reRenderCard(previousCard) 
    }
        
 
   
})

document.getElementById('add-form').addEventListener('submit',async (evt)=>{
    evt.preventDefault()
    let employee = {
            id:null,
            name:evt.target.name.value,
            email:evt.target.email.value,
            phone:evt.target.phone.value,
            city:evt.target.city.value,
            zipcode:evt.target.zipcode.value,
            street:evt.target.street.value,
            date_of_birth:evt.target.date_of_birth.value
    }

    if(handleValidation(employee))
        await addEmployee(employee)
    else
        showErrors()
})


let checkIfAuthenticated = async ()=>{
    let response = await fetch('http://localhost:3000/isauthenticated',{
    headers:{
        'Authorization':`Bearer ${localStorage?.getItem('employees-token')}`
    }
    })
    if(response.status == 403)
        return false
    let auth = await response.json()

    return auth
}

document.addEventListener('DOMContentLoaded', async (evt)=>{
    authenticated = await checkIfAuthenticated()
    if(authenticated){
        employees = await fetchUsers()
        if(employees!=undefined){
            let cardListElements = createListElements(employees)

            cardListElements.forEach((listElement)=>{
                cardList.appendChild(listElement)
            })
        }
        showAuthenticatedUI()
    }else{
        showNotAuthenticatedUI()
    }
})

document.getElementById('auth-btn').addEventListener('click',async (evt)=>{
    evt.preventDefault()
    let response = await fetch('http://localhost:3000/auth')
    let json = await response.json()
    localStorage.setItem('employees-token', json.token)
    window.location.reload()
})

document.getElementById('logout-btn').addEventListener('click',async (evt)=>{
    evt.preventDefault()
    localStorage.removeItem('employees-token')
    window.location.reload()
})

let showNotAuthenticatedUI = ()=>{
    document.getElementById('not-authenticated').style.display = 'block'
}
let showAuthenticatedUI = ()=>{
    document.getElementById('authenticated').style.display = 'block'
}

let reRenderCard = (card)=>{
    let cardHeader = card.children[0]
    let cardBody = card.children[1]
    let title = cardHeader.children[2]
    title.innerHTML = `${currentEmployee.name}`
    cardBody.innerHTML = `
    <p>Email: ${currentEmployee.email}</p>
    <p>Phone: ${currentEmployee.phone}</p>
    <p>Adress: ${currentEmployee.city}, ${currentEmployee.zipcode}, ${currentEmployee.street}</p>
    <p>Date of birth: ${new Date(currentEmployee.date_of_birth).toLocaleDateString()}</p>
   
    `
}

let createListElements = (employees)=>{
    let listElements = employees.map((employee)=>{
        let card = document.createElement('div')
        card.classList.add('card')
        card.setAttribute('data-id',employee.id)
        let cardHeader = document.createElement('div')
        cardHeader.classList.add('card-header')
        let editBtn = document.createElement('span')
        editBtn.classList.add('edit-btn')
        editBtn.innerText = 'Edit'
       
        let deleteBtn = document.createElement('span')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerText = 'X'
        cardHeader.appendChild(editBtn)
        cardHeader.appendChild(deleteBtn)
        // cardHeader.innerHTML+=`
        // <span class="edit-btn">Edit</span>
        // <span class="delete-btn">X</span>
        // `
        let cardTitle = document.createElement('h3')
        cardTitle.classList.add('card-title')
        let cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        cardTitle.innerHTML = `${employee.name}`
        
        cardBody.innerHTML = `
        <p>Email: ${employee.email}</p>
        <p>Phone: ${employee.phone}</p>
        <p>Adress: ${employee.city}, ${employee.zipcode}, ${employee.street}</p>
        <p>Date of birth: ${new Date(employee.date_of_birth).toLocaleDateString()}</p>
       
        `
        cardHeader.appendChild(cardTitle)
        card.appendChild(cardHeader)
        card.appendChild(cardBody)
        editBtn.addEventListener('click',(evt)=>{
            // card.style.border='3px solid green'
            currentEmployee = employee
            handleEdit(card)
        })
        deleteBtn.addEventListener('click',async (evt)=>{
            let id = employee.id
            let x = confirm(`Really delete user ${employee.name}?`)
            if(x){
                let deleted = await deleteEmployee(id)   
                if(deleted){
                    card.remove()
                    employees = employees.filter((employee)=>employee.id!==id)
                    document.getElementById('edit-employee').style.display='none'
                }
            }
           
        })
        return card
    })

    return listElements
}

