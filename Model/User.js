const mongoose = require('mongoose');
const Schema = mongoose.Schema;   //obj que sera usado para esquematizar o user

//Esquema do banco de dados -> Usuario
const UserSchema = new Schema({

  //Campo email, tipo String, Campo obrigatorio, Campo Unico, seja minusculo
  email: { type: String, required: true, unique: true, lowercase: true },
  //o campo selected receber falso, indica para o banco que, ao retornar
  //os dados de uma busca, o password nao deve estar incluso
  password: { type: String, required: true, selected: false  },
  //tabela created armazena o momento da criacao de usuario
  created: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', UserSchema);
