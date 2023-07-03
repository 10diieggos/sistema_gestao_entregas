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
import api_insere_objeto from './api_insere_objeto';
import api_insere_lista from './api_insere_lista';
import api_insere_evento from './api_insere_evento';
import api_insere_objetosXlistas from './api_insere_objetosXlistas';
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
    this.handleResetClick = this.handleResetClick.bind(this);
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
      'api_insere_objeto': api_insere_objeto,
      'api_insere_lista': api_insere_lista,
      'api_insere_evento': api_insere_evento,
      'api_insere_objetosXlistas': api_insere_objetosXlistas,
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

    const apiInsertOptions = [
      'api_insere_servico',
      'api_insere_objeto',
      'api_insere_lista',
      'api_insere_evento',
      'api_insere_objetosXlistas'
    ];
    
    const isApiInsert = apiInsertOptions.includes(this.state.selectedOption);
    
    if (isApiInsert) {
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

  handleResetClick(event) {
    event.preventDefault();
  
    this.setState({
      selectedOption: '',
      inputText: '',
      outputText: '',
      error: '',
    });
  }

  render() {
    return (
      <div className="form-container">
        <FormControl className="form-control">
        <h3 className="form-label" id="demo-radio-buttons-group-label">Escolha a operação desejada</h3>
          <div className="radio-group-container">
            <fieldset className="radio-group-fieldset">
              <legend className="radio-group-legend">Via API</legend>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={this.state.selectedOption}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel value="api_insere_servico" control={<Radio />} label="Inserir servico" />
                <FormControlLabel value="api_insere_objeto" control={<Radio />} label="Inserir objeto" />
                <FormControlLabel value="api_insere_lista" control={<Radio />} label="Inserir lista" />
                <FormControlLabel value="api_insere_objetosXlistas" control={<Radio />} label="Inserir objeto x lista" />
                <FormControlLabel value="api_insere_evento" control={<Radio />} label="Inserir evento" />
              </RadioGroup>
            </fieldset>
            <fieldset className="radio-group-fieldset">
              <legend className="radio-group-legend">Gerar SQL</legend>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={this.state.selectedOption}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel value="insere_servico" control={<Radio />} label="Inserir serviço" />
                <FormControlLabel value="insere_novos_objetos" control={<Radio />} label="Inserir novos objetos" />
                <FormControlLabel value="insere_listas" control={<Radio />} label="Inserir listas" />
                <FormControlLabel value="associar_objetos_listas" control={<Radio />} label="Associar objetos/listas" />
                <FormControlLabel value="insere_recebedores" control={<Radio />} label="Inserir recebedores" />
                <FormControlLabel value="insere_eventos" control={<Radio />} label="Inserir eventos" />
                <FormControlLabel value="inserir_simples" control={<Radio />} label="Inserir simples" />
              </RadioGroup>
            </fieldset>
            <fieldset className="radio-group-fieldset">
              <legend className="radio-group-legend">Ações</legend>
              <div className="button-column">
                <Button variant="outlined" size="small" onClick={this.handleResetClick}>Nova Operação</Button>
                <Button variant="outlined" size="small" onClick={this.handleCopyClick}>Copiar</Button>
              </div>
            </fieldset>
          </div>
        </FormControl>

        {this.state.error &&
          <Alert severity="warning" variant='filled'>
            <AlertTitle>Atenção</AlertTitle>
            {this.state.error}
          </Alert>}      
        
          <div className="textarea-container">
            <TextareaAutosize 
              className="textarea"
              minRows={10} 
              rows={this.state.inputText.split('\n').length}
              value={this.state.inputText}
              onChange={this.handleInputChange}
              placeholder="Insira o texto aqui..."
            />     
                
            <TextareaAutosize 
              className="textarea output-textarea"
              minRows={10} 
              rows={this.state.inputText.split('\n').length}
              value={this.state.outputText}
              readOnly
              placeholder="Resultado..."
            />
          </div>
      </div>
    );
  }
}

export default Formulario;