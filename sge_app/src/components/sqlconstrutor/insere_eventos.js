

var query = `INSERT INTO eventos (id_objeto,data_hora,local,situacao,mensagem) VALUES`

export default function insere_eventos(inputText) {
  inputText = eliminarTextosQueNaoFazemParteDosConjuntosObjetoeventosELinhasVazias(inputText)


  let codigosArray = listarTodosOsCodigosEmUmArray(inputText);

  let blocosObjetoeventos = separarCadaBlocoDeObjetoESeuseventosEmUmArray(inputText, codigosArray);

  let array_contendo_todos_os_arrays_de_eventos_de_objeto = blocosObjetoeventos.map(function (item) {
    return item.split('\n').map(function (line) {
      return line.trim();
    });
  });

  for (let index = 0; index < codigosArray.length; index++) {

    const codigo = codigosArray[index];
    let array_de_eventos_do_objeto = array_contendo_todos_os_arrays_de_eventos_de_objeto[index]
    array_de_eventos_do_objeto = excluirArraysQueNaoSaoeventos(array_de_eventos_do_objeto)
    montarQuery(array_de_eventos_do_objeto, codigo);

  }

  query = eliminarAUltimaVirgula(query, '');

  query += `
  ON DUPLICATE KEY UPDATE situacao = VALUES(situacao);
  `

  return query;
}

function eliminarTextosQueNaoFazemParteDosConjuntosObjetoeventosELinhasVazias(inputText) {
  const eliminar = [
    /Imprimir\s+Nova.*?Voltar/sg,
    /SRO\s+.*?interno\./gs,
    /Imprimir\s+Nova.*?exclusivamente de uso interno\./gs,
    /^\s*[\r\n]/gm
  ];

  eliminar.forEach((regex) => {
    inputText = inputText.replace(regex, '');
  });
  return inputText;
}

function listarTodosOsCodigosEmUmArray(texto) {
  const regex = /[A-Z]{2}\d{9}[A-Z]{2}/g; // Define a expressão regular
  const trechos = []; // Array para armazenar os trechos encontrados

  let match;
  while ((match = regex.exec(texto)) !== null) { // Itera sobre todas as ocorrências da regex no texto
    trechos.push(match[0]); // Adiciona o trecho encontrado ao array
  }

  return trechos;
}

function separarCadaBlocoDeObjetoESeuseventosEmUmArray(inputText, codigosArray) {
  const regex = new RegExp(`(${codigosArray.join('|')})\\s+((?:\\d{2}\\/){2}\\d{4}\\s+\\d{2}:\\d{2}:\\d{2}(?:\\s+\\S+)?)`, 'g');
  const matches = inputText.match(regex);

  if (!matches) {
    return [];
  }

  const result = [];
  let startIndex = inputText.indexOf(matches[0]);
  for (let i = 0; i < matches.length; i++) {
    const endIndex = i < matches.length - 1 ? inputText.indexOf(matches[i + 1]) : inputText.length;
    result.push(inputText.substring(startIndex, endIndex).trim());
    startIndex = endIndex;
  }

  return result;
}

function excluirArraysQueNaoSaoeventos(array_de_eventos_do_objeto) {
  array_de_eventos_do_objeto.shift();
  array_de_eventos_do_objeto.shift();
  return array_de_eventos_do_objeto
}

function montarQuery(array_de_eventos_do_objeto, codigo) {
  let data, local, situacao, resto, mensagem
  let arrays_de_dados_dos_eventos = array_de_eventos_do_objeto.map(function (line) {
    return line.split('\t');
  })

  arrays_de_dados_dos_eventos = juntarOarrayDeMensagemComSeuRespectivoArrayDeEvento(arrays_de_dados_dos_eventos)

  arrays_de_dados_dos_eventos = analisarSeExisteDuplicacaodeDataHoraNoseventosDoObjetoEAcrescentarUmSegundoCasoNecessarioParaEvitarConflitosDeChavePrimaria(arrays_de_dados_dos_eventos)

  for (let i = 0; i < arrays_de_dados_dos_eventos.length; i++) {
    const line = arrays_de_dados_dos_eventos[i];
    [data, local, situacao, resto = 'descartar', mensagem] = line;

    if (mensagem === undefined) {
      query += `
(
  (SELECT id FROM objetos WHERE codigo = '${codigo}'),
  '${converterAdataHoraParaOformatoSuportadoPeloMySql(data.trim())}',
  '${local.trim()}',
  '${situacao.trim()}',
  NULL
),`
    } else {
      query += `
(
  (SELECT id FROM objetos WHERE codigo = '${codigo}'),
  '${converterAdataHoraParaOformatoSuportadoPeloMySql(data.trim())}',
  '${local.trim()}',
  '${situacao.trim()}',
  '${mensagem.trim()}'
),`
    }
  }
}
function juntarOarrayDeMensagemComSeuRespectivoArrayDeEvento(input) {
  const output = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i].length === 1 && output.length > 0) {
      output[output.length - 1].push(input[i][0]);
    } else {
      output.push(input[i]);
    }
  }
  return output
}

function analisarSeExisteDuplicacaodeDataHoraNoseventosDoObjetoEAcrescentarUmSegundoCasoNecessarioParaEvitarConflitosDeChavePrimaria(arrays_de_dados_dos_eventos) {
  let array_de_datas = [];
  for (let index = 0; index < arrays_de_dados_dos_eventos.length; index++) {
    const array_de_dados_do_evento = arrays_de_dados_dos_eventos[index];
    let [data] = array_de_dados_do_evento;
    array_de_datas.push(data);
  }
  array_de_datas = array_de_datas.reverse()

  array_de_datas = garanteDataHoraUnica(array_de_datas).reverse()


  for (let index = 0; index < array_de_datas.length; index++) {
    const data = array_de_datas[index];
    arrays_de_dados_dos_eventos[index][0] = data;
  }

  return arrays_de_dados_dos_eventos

  function garanteDataHoraUnica(array_de_datas) {
    const novo_array_de_datas = [];
    let objeto_contador = criarUmObjetoComAsQuantidadesDeCadaDataHoraSendoAPropriaDataHoraAchave(array_de_datas)


    const datas_horas_unicas = formarArrayComElementosUnicos(array_de_datas)

    for (let index = 0; index < datas_horas_unicas.length; index++) {
      let data_hora = datas_horas_unicas[index];
      if (objeto_contador[data_hora] === 1) {
        novo_array_de_datas.push(data_hora);
      } else {

        let segundosParaAcrescentar = Array.from({ length: objeto_contador[data_hora] }, (_, index) => index)


        segundosParaAcrescentar.forEach(segundos => {
          let new_data_hora = addSecondsToDateTime(data_hora, segundos)
          novo_array_de_datas.push(new_data_hora)
        })

      }
    }
    return novo_array_de_datas;
  }
  function criarUmObjetoComAsQuantidadesDeCadaDataHoraSendoAPropriaDataHoraAchave(array_de_datas) {
    let objeto_contador = {};
    array_de_datas.forEach(element => {
      if (objeto_contador[element]) {
        objeto_contador[element]++;
      } else {
        objeto_contador[element] = 1;
      }
    });
    return objeto_contador;
  }

  function formarArrayComElementosUnicos(array_de_datas) {
    const uniqueArray = array_de_datas.filter((element, index) => {
      return index === array_de_datas.indexOf(element);
    });
    return uniqueArray
  }

  function addSecondsToDateTime(dateTimeString, secondsToAdd) {
    const [dateString, timeString] = dateTimeString.split(' ');
    const [day, month, year] = dateString.split('/');
    const [hour, minute, second] = timeString.split(':');
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    date.setSeconds(date.getSeconds() + secondsToAdd);
    const newDay = date.getDate().toString().padStart(2, '0');
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const newYear = date.getFullYear();
    const newHour = date.getHours().toString().padStart(2, '0');
    const newMinute = date.getMinutes().toString().padStart(2, '0');
    const newSecond = date.getSeconds().toString().padStart(2, '0');
    return `${newDay}/${newMonth}/${newYear} ${newHour}:${newMinute}:${newSecond}`;
  }

}

function converterAdataHoraParaOformatoSuportadoPeloMySql(dataHora) {
  const partes = dataHora.split(' ');
  const dataPartes = partes[0].split('/');
  const horaPartes = partes[1].split(':');

  const dia = parseInt(dataPartes[0], 10);
  const mes = parseInt(dataPartes[1], 10) - 1; // Os meses em JavaScript são baseados em zero
  const ano = parseInt(dataPartes[2], 10);
  const horas = parseInt(horaPartes[0], 10);
  const minutos = parseInt(horaPartes[1], 10);
  const segundos = parseInt(horaPartes[2], 10);

  const data = new Date(ano, mes, dia, horas, minutos, segundos);

  const anoFormatado = data.getFullYear();
  const mesFormatado = `0${data.getMonth() + 1}`.slice(-2);
  const diaFormatado = `0${data.getDate()}`.slice(-2);
  const horasFormatadas = `0${data.getHours()}`.slice(-2);
  const minutosFormatados = `0${data.getMinutes()}`.slice(-2);
  const segundosFormatados = `0${data.getSeconds()}`.slice(-2);

  return `${anoFormatado}-${mesFormatado}-${diaFormatado} ${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
}

function eliminarAUltimaVirgula(str, novoCaractere) {
  return str.slice(0, -1) + novoCaractere;
}


