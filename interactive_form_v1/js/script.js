//The "Name" field
const nameField = document.getElementById('name');

nameField.focus(); //Adding focus to the name field

//"Job Role" section
const jobRole = document.getElementById('title'); 
const otherJob = document.getElementById('other-job-role');

otherJob.style.display = 'none'; //element wont show when page loads.

//Added Event listener when the user selects "Other" in the "Job Role" drop down menu, the "Other job role" text field will appear. 
jobRole.addEventListener('change', (e) => {
    if(e.target.value === 'other'){
        otherJob.style.display = 'block';
    } else {
        otherJob.style.display = 'none';
    }
});

//"T-Shirt Info" section
const selectDesign = document.getElementById('design');
const color = document.getElementById('color');
const selectColor = document.getElementById('color').children;

color.disabled = true;

selectDesign.addEventListener('change', (e) => {    
    color.disabled = false;

    for(let i = 1; i < selectColor.length; i++){
        let colorValue = e.target.value;
        let dataTheme = selectColor[i].getAttribute('data-theme');
        
        if(colorValue === dataTheme){
            selectColor[i].hidden = false;
            selectColor[i].setAttribute('selected', true);
        } else {
            selectColor[i].hidden = true;
            selectColor[i].removeAttribute('selected');
        }
    }
});

//"Register for Activities" section
const activities = document.getElementById('activities');
const activityCost = document.getElementById('activities-cost');
let totalCost = 0;

activities.addEventListener('change', (e) => {
    let cost = e.target.getAttribute('data-cost');
    cost = parseInt(cost);
    if(e.target.checked) {
        totalCost += cost;
    } else {
        totalCost -= cost;
    }
    activityCost.innerHTML = `Total: $${totalCost}`;
});

//"Payment Info" section
const paymentMethod = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

paypal.hidden = true;
bitcoin.hidden = true; 

paymentMethod[1].setAttribute('selected', true);

paymentMethod.addEventListener('change', (e) => {
    if (e.target.value === 'bitcoin') {
        bitcoin.style.display = 'block';
        creditCard.style.display = 'none';
        paypal.style.display = 'none'; 
        
    } else if (e.target.value === 'paypal') {
        paypal.style.display = 'block'; 
        bitcoin.style.display = 'none';
        creditCard.style.display = 'none';
    } else {
        creditCard.style.display = 'block';
        bitcoin.style.display = 'none';
        paypal.style.display = 'none'; 
    }
}); 

//Form validation
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const formElement = document.querySelector('form');

function validateName () {
    const nameInput = nameField.value;
    const nameTest = /^[a-z]/i.test(nameInput);
    if(!nameTest){
        nameField.parentElement.classList.add('not-valid');
        nameField.parentElement.lastElementChild.style.display = 'block';
    } else {
        nameField.parentElement.classList.add('valid');
        nameField.parentElement.classList.remove('not-valid');
        return true;
    }
};
function validateEmail () {
    const emailInput = email.value;
    const emailTest = /^[^@]+@[^@.]+\.com+$/i.test(emailInput);
    if(!emailTest){
        email.parentElement.classList.add('not-valid');
        email.parentElement.lastElementChild.style.display = 'block';
    } else {
        email.parentElement.classList.add('valid');
        email.parentElement.classList.remove('not-valid');
        return true;
    }
};
function validateCard () {
    const cardInput = cardNumber.value;
    const cardTest = /^\d{13,16}$/.test(cardInput);
    if(!cardTest){
        cardNumber.parentElement.classList.add('not-valid');
        cardNumber.parentElement.lastElementChild.style.display = 'block';
    } else {
        cardNumber.parentElement.classList.add('valid');
        cardNumber.parentElement.classList.remove('not-valid');
        return true;
    }
};
function validateZip () {
    const zipInput = zipCode.value;
    const zipTest = /^\d{5}$/.test(zipInput);
    if(!zipTest){
        zipCode.parentElement.classList.add('not-valid');
        zipCode.parentElement.lastElementChild.style.display = 'block';
    } else {
        zipCode.parentElement.classList.add('valid');
        zipCode.parentElement.classList.remove('not-valid');
        return true;
    }
};
function validateCvv () {
    const cvvInput = cvv.value;
    const cvvTest = /^\d{3}$/.test(cvvInput);
    if(!cvvTest){
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.lastElementChild.style.display = 'block';
    } else {
        cvv.parentElement.classList.add('valid');
        cvv.parentElement.classList.remove('not-valid');
        return true;
    }
};
function activitiesValidator () {
    if(totalCost === 0){
        activities.classList.add('not-valid');
        activities.parentElement.lastElementChild.style.display = 'block';
    } else {
        activities.classList.replace('not-valid', 'valid');
        return true;
    }
};

formElement.addEventListener('submit', (e) => {
    if(!validateName()){
        e.preventDefault();
    }
    if(!validateEmail()){
        e.preventDefault();
    }
    if(!activitiesValidator()){
        e.preventDefault();
    }
    if(paymentMethod.value === 'credit-card'){
        if(!validateCard()){
            e.preventDefault();
        }
        if(!validateCvv()){
            e.preventDefault();
        }
        if(!validateZip()){
            e.preventDefault();
        }
    }
});

//*Accessability*/
const checkbox = document.querySelectorAll('.activities-box input');

for(let i = 0; i < checkbox.length; i++){
    checkbox[i].addEventListener('focus', (e) => {
        checkbox[i].parentNode.classList.add('focus');
    });
    checkbox[i].addEventListener('blur', (e) => {
        checkbox[i].parentNode.classList.replace('focus', 'blur');
    });
};

