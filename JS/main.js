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


const GetInputValue = (e,element) =>  element.textContent = e.target.value;


cardNameInput.addEventListener('input',(e) =>{GetInputValue(e,cardOwnerName)});
cardNumberInput.addEventListener('input',(e) =>{GetInputValue(e,cardNumber)});
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

    const errorText = formField.querySelector('small');
    errorText.textContent = message;
    input.classList.add('invalid');

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
  
const checkCardNameValidation = () => {
    validateInput(cardNameInput,/^[a-zA-Z]{6} ?$/,'must be 6 length');
}

const checkCardNumber = () => {
    validateInput(cardNumberInput,/^[0-9]{16}$/,'wrong format Numbers only');
}

const checkCvcValidation = () => {
 validateInput(cardCvcInput,/\d{3}/,'must be 3 numbers');
}

document.querySelector('form').addEventListener('input',(e) => {
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
    }
})