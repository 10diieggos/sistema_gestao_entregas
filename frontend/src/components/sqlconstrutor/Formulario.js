import React from 'react';

class Formulario extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const campo1 = document.getElementById('campo1').value;
    const campo2 = document.getElementById('campo2').value;
    const opcoes = Array.from(document.getElementById('opcoes').selectedOptions).map(option => option.value);
    console.log(campo1, campo2, opcoes);
  }
  render() {
    return (
      <form>
        <label>
          Campo de texto 1:
          <textarea id="campo1"></textarea>
        </label>
        <label>
          Campo de texto 2:
          <textarea id="campo2"></textarea>
        </label>
        <label>
          Opções:
          <select id="opcoes" multiple>
            <option value="opcao1">Opção 1</option>
            <option value="opcao2">Opção 2</option>
            <option value="opcao3">Opção 3</option>
            <option value="opcao4">Opção 4</option>
            <option value="opcao5">Opção 5</option>
          </select>
        </label>
        <button type="submit" onClick={this.handleSubmit}>Enviar</button>
      </form>
    );
  }
}

export default Formulario;