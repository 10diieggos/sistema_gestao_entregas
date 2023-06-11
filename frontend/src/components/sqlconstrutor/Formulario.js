// Arquivo Formulario.js
import React from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import extractIdObjetos from './extractIdObjetos';
import convertToLowerCase from './convertToLowerCase';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRadioChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  
    const optionMethods = {
      'id_objetos': extractIdObjetos,
      'letras_minusculas': convertToLowerCase,
      // Adicione outras opções e métodos aqui se necessário
    };
  
    const selectedMethod = optionMethods[this.state.selectedOption];
  
    const treatedValue = selectedMethod(this.state.inputText);
  
    // Atualizar o estado do outputText com o valor tratado
    this.setState({
      outputText: treatedValue,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
         
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Escolha a operação desejada</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={this.state.selectedOption}
            onChange={this.handleRadioChange}
          >
            <FormControlLabel value="id_objetos" control={<Radio />} label="Extrair o id_objetos da lista de codigos fornecida" />
            <FormControlLabel value="letras_minusculas" control={<Radio />} label="Transformar todas as letras em minusculas" />
          </RadioGroup>
          <Button variant="contained" type="submit">Contained</Button>
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
      </form>
    );
  }
}

export default Formulario;