const { Sequelize } = require('sequelize');
const config = require('../config');
const ServicoModel = require('../models/servico');
const ObjetoModel = require('../models/objeto');
const ListaModel = require('../models/lista');
const ObjetoListaModel = require('../models/objetoLista');
const RecebedorModel = require('../models/recebedor');
const ObjetoRecebedorModel = require('../models/objetoRecebedor');
const ContatoModel = require('../models/contato');
const ObjetoContatoModel = require('../models/objetoContato');
const EventoModel = require('../models/evento');
const SimplesModel = require('../models/simples');

const sequelize = new Sequelize(config.database);

const Servico = ServicoModel(sequelize, Sequelize);
const Objeto = ObjetoModel(sequelize, Sequelize);
const Lista = ListaModel(sequelize, Sequelize);
const ObjetoLista = ObjetoListaModel(sequelize, Sequelize);
const Recebedor = RecebedorModel(sequelize, Sequelize);
const ObjetoRecebedor = ObjetoRecebedorModel(sequelize, Sequelize);
const Contato = ContatoModel(sequelize, Sequelize);
const ObjetoContato = ObjetoContatoModel(sequelize, Sequelize);
const Evento = EventoModel(sequelize, Sequelize);
const Simples = SimplesModel(sequelize, Sequelize);

Objeto.belongsTo(Servico, { foreignKey: 'id_servico' });
Servico.hasMany(Objeto, { foreignKey: 'id_servico' });

Objeto.belongsToMany(Lista, { through: ObjetoLista, foreignKey: 'id_objeto', otherKey: 'id_lista' });
Lista.belongsToMany(Objeto, { through: ObjetoLista, foreignKey: 'id_lista', otherKey: 'id_objeto' });

Objeto.belongsToMany(Recebedor, { through: ObjetoRecebedor, foreignKey: 'id_objeto', otherKey: 'id_recebedor' });
Recebedor.belongsToMany(Objeto, { through: ObjetoRecebedor, foreignKey: 'id_recebedor', otherKey: 'id_objeto' });

Objeto.belongsToMany(Contato, { through: ObjetoContato, foreignKey: 'id_objeto', otherKey: 'id_contato' });
Contato.belongsToMany(Objeto, { through: ObjetoContato, foreignKey: 'id_contato', otherKey: 'id_objeto' });

Evento.belongsTo(Objeto, { foreignKey: 'id_objeto' });
Objeto.hasMany(Evento, { foreignKey: 'id_objeto' });

module.exports = {
  sequelize,
  Servico,
  Objeto,
  Lista,
  ObjetoLista,
  Recebedor,
  ObjetoRecebedor,
  Contato,
  ObjetoContato,
  Evento,
  Simples
};
