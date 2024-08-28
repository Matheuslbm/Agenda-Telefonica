const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default: ''},
    email: { type: String, required: false, default: ''},
    telefone: { type: String, required: false, default: ''},
    aniversario: { type: String, required: false, default: ''},
    criadoEm: { type: Date, default: Date.now},


})

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string' || id.length !== 24) return;
    const user = await ContatoModel.findById(id);
    return user;
}

Contato.prototype.register = async function() {
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.valida = function() {
    this.cleanUp();
    //validacao
    // email precisa ser valido
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.')
    if(!this.body.email && !this.body.telefone) {
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.')
    }
}

Contato.prototype.cleanUp = function() {
    //garantir que tudo que tiver dentro do body seja uma string
    for(const key in this.body){
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
        aniversario: this.body.aniversario,
    }
}

module.exports = Contato;