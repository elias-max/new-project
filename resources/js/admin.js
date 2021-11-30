import $ from 'jquery';

import { inputMonitors } from './helpers/formHelpers'

$(() => {
  const inputArray = ['firstName','lastName'];
  inputMonitors(inputArray)

  $('.schoolLevelsDropdown').select2({
    theme: 'bootstrap4'
  })
});