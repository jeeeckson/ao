/**
 * Created by horacio on 30/07/2016.
 */

export default {
  /* elementChildName: ( 'option', 'tr', etc ) */
  makeInputFilterElement: ($input, $filteredElement, elementChildName) => {
    $input.keyup(() => {
      let val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

      $filteredElement.find(elementChildName).show().filter(() => {
        let text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
      }).hide();
    });
  }
};
