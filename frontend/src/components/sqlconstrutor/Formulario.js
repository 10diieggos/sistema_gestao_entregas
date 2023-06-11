import React from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base';

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
    console.log(this.state.selectedOption)
    // Tratar o valor do inputText aqui
    const treatedValue = this.state.inputText.toUpperCase();
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
            <FormControlLabel value="opcao2" control={<Radio />} label="opcao2" />
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