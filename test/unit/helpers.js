/**
 * Grabs the placeover for a given input.
 * @param [jQuery selector] the input
 * @return [jQuery selector] the overtext
 */
function getText($input) {
  return $input.siblings('.input-placeover');
}

/**
 * Check if the text is visible.
 * @param $input [jQuery selector] the inputs
 * @return [boolean] true, if the text is visible
 */
function textVisible($input) {
  return getText($input).is(':visible');
}

/**
 * Check if the text is not visible.
 * @param $input [jQuery selector] the input
 * @return [boolean] true, if the text is not visible
 */
function textNotVisible($input) {
  return !textVisible($input);
}