const { Servico } = require('../database');

exports.getAll = async (req, res) => {
  try {
    const servicos = await Servico.findAll();
    res.status(200).json(servicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const servico = await Servico.findByPk(id);
    if (servico) {
      res.status(200).json(servico);
    } else {
      res.status(404).json({ error: 'Servico not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const servico = await Servico.create(data);
    res.status(201).json(servico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const servico = await Servico.findByPk(id);
    if (servico) {
      await servico.update(data);
      res.status(200).json(servico);
    } else {
      res.status(404).json({ error: 'Servico not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const servico = await Servico.findByPk(id);
    if (servico) {
      await servico.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Servico not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
