$("#rastreamentCodes").change(function () {
  $('#buttons_div .button_link').remove()

  let rastreamentCodes = $("#rastreamentCodes").val().match(/[A-z]{2}\d{9}[A-z]{2}/gm)

  rastreamentCodes = [...new Set(rastreamentCodes)]
  
  if (rastreamentCodes) {
      array_chunk(50, rastreamentCodes).forEach((codes, index) => {
      
      button = $('<a href="https://websro2.correiosnet.int/rastreamento/sro?opcao=pesquisa&objetos=' + codes.join(';') + '" target="_blank"><button class="button_link" >' + (index + 1) + '</button></a>');
      
      button.appendTo($('#buttons_div'))
    });
  }

});