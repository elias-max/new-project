import $ from 'jquery';

// set initial validity
function setInvalidClass(input)  {
  if (input.data('has-error')){
    input.addClass('is-invalid');
  }
}

// This function checks for form validity
function formInputListener(formInput){
  formInput.on('input', function () {
    // if error from back end
    // remove error class
    if (formInput.hasClass('is-invalid')){
      formInput.removeClass('is-invalid')
    }
    
    // put valid input class
    formInput.addClass('is-valid')
    formInput.removeClass('is-invalid')
    
    // remove valid class if val == ''
    if (formInput.val() == ''){
      formInput.removeClass('is-valid')
    }
    

    if (['password','passwordConfirmation'].includes(formInput.attr('id'))){
      const passwordConfirmation =  $('#passwordConfirmation')
      const password = $('#password')
      const psInvalid = $('#ps-invalid')

      if( passwordConfirmation.val() !== ''){
        const pscInvalid = $('#psc-invalid')
        if(password.val() !== passwordConfirmation.val()){
          passwordConfirmation.removeClass('is-valid').addClass('is-invalid')
          pscInvalid.addClass('invalid-feedback').text('Confirmation does not match password')
        }else{
          pscInvalid.removeClass('invalid-feedback').text('')
          passwordConfirmation.removeClass('is-invalid')
        }
      }
    
      
      if (password.val().length < 8) {
        password.removeClass('is-valid').addClass('is-invalid')
        psInvalid.addClass('invalid-feedback').text('Password needs to be atleast 6 Characters Long')
      }else{
        password.removeClass('is-invalid').addClass('is-valid')
        psInvalid.removeClass('invalid-feedback').text('')
      }
    }

    if (formInput.hasClass('date')){
      const sDInvalid = $('#startDate-invalid')
      const eDInvalid = $('#endDate-invalid')
      if(isDateValid(formInput.val())){
        formInput.addClass('is-valid')
        formInput.removeClass('is-invalid')

        if(formInput.attr('id') == 'startDate'){
          sDInvalid.removeClass('invalid-feedback').text('')
        }else{
          eDInvalid.removeClass('invalid-feedback').text('')
        }

      }else{
        formInput.addClass('is-invalid')
        formInput.removeClass('is-valid')
        
        if(formInput.attr('id') == 'startDate'){
          sDInvalid.addClass('invalid-feedback').text('Date must be in the format dd/mm/yyyy')
        }else{
          eDInvalid.addClass('invalid-feedback').text('Date must be in the format dd/mm/yyyy')
        }
        
      }

      if (formInput.val() == ''){
        formInput.removeClass('is-valid').removeClass('is-invalid')
      }
    }
  });
  
}

function setInputValue(input){
  // short circuiting
  // set the value of the input
  input.val(input.data('flash-value') || input.data('value'))
}

function isDateValid(testDate){
  var dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return dateRegex.test(testDate)
}

function inputMonitors(inputArray){
  for(let i=0; i< inputArray.length; i++) {
    const input = $(`#${inputArray[i]}`); // e.g $('#firstName')
    setInputValue(input)
    formInputListener(input);
    setInvalidClass(input);
  }
}

export { 
  setInvalidClass,
  formInputListener,
  setInputValue,
  isDateValid,
  inputMonitors
}