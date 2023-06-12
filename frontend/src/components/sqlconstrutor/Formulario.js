import React from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import extrai_id_objeto from './extrai_id_objeto';
import insere_novos_objetos from './insere_novos_objetos';

class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      inputText: '',
      outputText: '',
    };
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
  }

  handleRadioChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  handleInputChange(event) {
    const inputText = event.target.value;

    const optionMethods = {
      'insere_novos_objetos': insere_novos_objetos,
      'id_objetos': extrai_id_objeto,
      // Adicione outras opções e métodos aqui se necessário
    };

    const selectedMethod = optionMethods[this.state.selectedOption];

    const treatedValue = selectedMethod(inputText);

    // Atualizar o estado do inputText e do outputText
    this.setState({
      inputText: inputText,
      outputText: treatedValue,
    });
  }

  handleCopyClick(event) {
    event.preventDefault();

    navigator.clipboard.writeText(this.state.outputText);
  }

  render() {
    return (
      <form>
         
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Escolha a operação desejada</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={this.state.selectedOption}
            onChange={this.handleRadioChange}
          >
            <FormControlLabel value="insere_novos_objetos" control={<Radio />} label="Inserir novos objetos" />
            <FormControlLabel value="id_objetos" control={<Radio />} label="Extrair o id do objeto e serviço" />
          </RadioGroup>
        </FormControl>
          
        <TextareaAutosize 
          minRows={50} 
          maxRows="60"
          value={this.state.inputText}
          onChange={this.handleInputChange}
        />     
          
        <TextareaAutosize 
          minRows={50} 
          maxRows="60"
          value={this.state.outputText}
          readOnly
        />

        <Button variant="contained" onClick={this.handleCopyClick}>Copiar resultado</Button>
          
      </form>
    );
  }
}

export default Formulario;