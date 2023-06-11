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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
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
      'insere_novos_objetos': insere_novos_objetos,
      'id_objetos': extrai_id_objeto,
      // Adicione outras opções e métodos aqui se necessário
    };

    const selectedMethod = optionMethods[this.state.selectedOption];

    const treatedValue = selectedMethod(this.state.inputText);

    // Atualizar o estado do outputText com o valor tratado
    this.setState({
      outputText: treatedValue,
    });
  }

  handleCopyClick(event) {
    event.preventDefault();

    navigator.clipboard.writeText(this.state.outputText);
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
            <FormControlLabel value="insere_novos_objetos" control={<Radio />} label="Inserir novos objetos" />
            <FormControlLabel value="id_objetos" control={<Radio />} label="Extrair o id do objeto e serviço" />
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

        <Button variant="contained" onClick={this.handleCopyClick}>Copiar resultado</Button>
          
      </form>
    );
  }
}

export default Formulario;