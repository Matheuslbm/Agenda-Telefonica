import validator from "validator";

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const erros = document.querySelectorAll('.erro');
        for (let p of erros) {
            p.remove();
        };

        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const celInput = el.querySelector('input[name="telefone"]');
        let error = false;

        if(!nomeInput.value) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Nome precisa ser preenchido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            nomeInput.after(p);
            error = true;
        }

        if(!validator.isEmail(emailInput.value)) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Email inválido');
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            emailInput.after(p);
            
            error = true;
        }
        if(celInput.value.length < 8 || celInput.value.length > 13) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('O telefone pode ter de 8 a 13 números. ex: 55 21 999999999');
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            celInput.after(p);
            
            error = true;
        }

        if(!error) el.submit();
    }
}