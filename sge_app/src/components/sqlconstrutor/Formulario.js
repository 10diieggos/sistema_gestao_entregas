// caminho relativo deste arquivo: frontend/src/components/sqlconstrutor/Formulario.js
import React from 'react';
import { Alert, AlertTitle, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import select_ids_objeto_servico from './select_ids_objeto_servico';
import insere_servico from './insere_servico';
import insere_novos_objetos from './insere_novos_objetos';
import insere_listas from './insere_listas';
import select_id_listas from './select_id_listas';
import associar_objetos_listas from './associar_objetos_listas';
import insere_recebedores from './insere_recebedores';
import insere_eventos from './insere_eventos';
import inserir_simples from './inserir_simples';
import api_insere_servico from './api_insere_servico';
import './Formulario.css';

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
      'insere_servico': insere_servico,
      'insere_novos_objetos': insere_novos_objetos,
      'select_ids_objeto_servico': select_ids_objeto_servico,
      'insere_listas': insere_listas,
      'select_id_listas': select_id_listas,
      'associar_objetos_listas': associar_objetos_listas,
      'insere_recebedores': insere_recebedores,
      'insere_eventos': insere_eventos,
      'inserir_simples': inserir_simples,
      'api_insere_servico': api_insere_servico,
      // Adicione outras opções e métodos aqui se necessário
    };

    const selectedMethod = optionMethods[this.state.selectedOption];

    if (!selectedMethod) {
      // Exibir mensagem de erro e limpar o conteúdo do textarea
      this.setState({
        inputText: '',
        outputText: '',
        error: 'Selecione uma operação antes de inserir os dados.',
      });
      return;
    }

    if (this.state.selectedOption === 'api_insere_servico') {
      selectedMethod(inputText, (response) => {
        this.setState({
          inputText: inputText,
          outputText: response,
          error: '',
        });
      });
    } else {
      const treatedValue = selectedMethod(inputText);

      // Limpar a mensagem de erro, se houver, e atualizar o estado do inputText e do outputText
      this.setState({
        inputText: inputText,
        outputText: treatedValue,
        error: '',
      });
    }
  }

  handleCopyClick(event) {
    event.preventDefault();

    navigator.clipboard.writeText(this.state.outputText);
  }

  render() {
    return (
      <div className="form-container">
        <FormControl className="form-control">
          <FormLabel id="demo-radio-buttons-group-label">Escolha a operação desejada</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={this.state.selectedOption}
            onChange={this.handleRadioChange}
          >
            <FormControlLabel value="insere_servico" control={<Radio />} label="Inserir novo servico" />
            <FormControlLabel value="insere_novos_objetos" control={<Radio />} label="Inserir novos objetos" />
            <FormControlLabel value="insere_listas" control={<Radio />} label="Inserir novas listas" />
            <FormControlLabel value="associar_objetos_listas" control={<Radio />} label="Inserir associação entre objetos e listas" />
            <FormControlLabel value="insere_recebedores" control={<Radio />} label="Inserir recebedores" />
            <FormControlLabel value="insere_eventos" control={<Radio />} label="Inserir eventos" />
            <FormControlLabel value="inserir_simples" control={<Radio />} label="Inserir objetos simples" />
            <FormControlLabel value="select_ids_objeto_servico" control={<Radio />} label="Extrair o id do objeto e do serviço" />
            <FormControlLabel value="select_id_listas" control={<Radio />} label="Extrair o id das listas" />
            <FormControlLabel value="api_insere_servico" control={<Radio />} label="Inserir servico via API" />
          </RadioGroup>
        </FormControl>

        {this.state.outputText && <Button className="btn" variant="contained" onClick={this.handleCopyClick}>Copiar resultado</Button>}
        {this.state.error &&
          <Alert severity="warning" variant='filled'>
            <AlertTitle>Atenção</AlertTitle>
            {this.state.error}
          </Alert>}      
        
        <TextareaAutosize 
          className="textarea"
          minRows={10} 
          maxRows="20"
          value={this.state.inputText}
          onChange={this.handleInputChange}
          placeholder="Insira o texto aqui..."
        />     
          
        <TextareaAutosize 
          className="textarea output-textarea"
          minRows={10} 
          maxRows="20"
          value={this.state.outputText}
          readOnly
          placeholder="Resultado..."
        />

          
      </div>
    );
  }
}

export default Formulario;