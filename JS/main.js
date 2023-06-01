const cardNumber = document.querySelector('.card_number');
const cardOwnerName = document.querySelector('.card-name-owner');
const cardExpirationDateMonth = document.querySelector('.exp_date span:first-child');
const cardExpirationDateYear = document.querySelector('.exp_date span:last-child');
const cardPin = document.querySelector('.card-back p');
const cardNameInput = document.getElementById('card-name');
const cardNumberInput = document.getElementById('card-number');
const cardMonthInput= document.getElementById('month');
const cardYearInput = document.getElementById('year');
const cardCvcInput = document.getElementById('cvc');
const confirmButton = document.getElementById('confirm');
const form = document.querySelector('form');
const completedSubmission = document.querySelector('.completed');


const GetInputValue = (e,element) =>  element.textContent = e.target.value;


cardNameInput.addEventListener('input',(e) =>{GetInputValue(e,cardOwnerName)});

cardNumberInput.addEventListener('input',(e) => {

    const value = e.target.value;
    const words = [];

    for (let i = 0; i < value.length; i += 4) {
      words.push(value.substr(i, 4));
    }
    cardNumber.textContent= words.join(' ');
});
cardMonthInput.addEventListener('input',(e) =>{GetInputValue(e,cardExpirationDateMonth)});
cardYearInput.addEventListener('input',(e) =>{GetInputValue(e,cardExpirationDateYear)});
cardCvcInput.addEventListener('input',(e) => {GetInputValue(e,cardPin)});

const isEmpty = value => !value.trim();

const isCardNumberValid = (cardNum) => {
  
    const regex = /^[0-9]{16}$/;
    return regex.test(cardNum);
}

const isValid = (input) => {

    const formField = input.parentElement;
    input.classList.remove('invalid');
    const errorText = formField.querySelector('small');
    errorText.textContent = '';
}

const isNotValid = (input,message) => {

    const formField = input.parentElement;
    input.classList.add('invalid');
    const errorText = formField.querySelector('small');
    errorText.textContent = message;
}

const validateInput = (input, regex, errorMessage) => {
    const value = input.value.trim();
  
    if (isEmpty(value)) {
      isNotValid(input, 'Cannot be blank.');
      return false;
    }
  
    if (!regex.test(value)) {
      isNotValid(input, errorMessage);
      return false;
    }
  
    isValid(input);
    return true;
  };
  
const checkCardNameValidation = () => validateInput(cardNameInput,/^[a-zA-Z]{6,20} ?$/,'must be 6 length');

const checkCardNumber = () => validateInput(cardNumberInput,/^[0-9]{16}$/,'wrong format Numbers only');

const checkCvcValidation = () => validateInput(cardCvcInput,/\d{3}/,'must be 3 numbers');

const checkExpiryDateMonth = () => validateInput(cardMonthInput,/^[01][0-9]$/,'wrong Format');

const checkExpiryDateyear = () => validateInput(cardYearInput,/^(2[3-9])$/,'wrong Format');


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
document.querySelector('form').addEventListener('input',debounce((e) => {
    switch (e.target.id) {

        case 'card-name':
            checkCardNameValidation();
            break;
        case 'card-number':
            checkCardNumber();
            break;
        case 'cvc':
            checkCvcValidation();
            break;
        case 'month':
            checkExpiryDateMonth();
            break;
        case 'year':
            checkExpiryDateyear();
            break;
    }
}));

form.addEventListener('submit',  (e) => {
    
    e.preventDefault();

    let iscardNameValid = checkCardNameValidation(),
        isCardNumberValid = checkCardNumber(),
        isExpiryMonthValid = checkExpiryDateMonth(),
        isExpiryYearValid = checkExpiryDateyear(),
        isPinNumberValid = checkCvcValidation();

    const isFormValid = iscardNameValid&&
                        isCardNumberValid&&
                        isExpiryMonthValid&&
                        isExpiryYearValid&&
                        isPinNumberValid;

    if(isFormValid) {
      form.style.display='none';
      completedSubmission.style.display='block';
    }
});

const clearFormInputs = () => {

 cardNameInput.value='';
 cardNumberInput.value='';
 cardMonthInput.value='';
 cardYearInput.value='';
 cardCvcInput.value='';

};

document.getElementById('continue').addEventListener('click',() => {

    completedSubmission.style.display='none';
    form.style.display='block';
    clearFormInputs();
});