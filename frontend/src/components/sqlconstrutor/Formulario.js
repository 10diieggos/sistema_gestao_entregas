import React from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';

class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Escolha a consulta desejada</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={this.state.selectedOption}
            onChange={this.handleChange}
          >
            <FormControlLabel value="id_objetos" control={<Radio />} label="Extrair o id_objetos da lista de codigos fornecida" />
            <FormControlLabel value="opcao2" control={<Radio />} label="opcao2" />
            <Button variant="contained" type="submit">Contained</Button>
          </RadioGroup>
        </FormControl>
      </form>
    );
  }
}

export default Formulario;