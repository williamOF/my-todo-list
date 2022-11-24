require('dotenv').config();
const filePath = '../database/usuarios.json';
const usuarios = require(filePath);

const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
let path = require('path');

function save(){
    fs.writeFileSync(path.resolve(__dirname + `/${filePath}`), JSON.stringify(usuarios, null, 4));
}

const AuthController = {
    registrar: (req, res) => {
        const {nome, email, senha, confirmacao} = req.body;
        
        // Verificar se existe um usuario com este email
        let usuarioExiste = fs.existsSync(__dirname + `/../database/${email}-tarefas.json`);
        if(usuarioExiste){
            return res.status(409).json({erro:"Usuário já cadastrado"});
        }
        
        // Confirmar se senha foi preenchida
        if(senha == ''){
            return res.status(422).json({erro:"Senha não foi preenchida"});
        }
        
        // Criptografar a senha digitada
        let senhaCriptografada = bcrypt.hashSync(senha, 10);
        

        // Determinar o novo id para o usuário
        let novoId = usuarios.length == 0 ? 1 : usuarios[usuarios.length - 1].id + 1;

        // Criar o novo usuário
        let usuario = {
            id: novoId,
            nome,
            email,
            senha: senhaCriptografada
        }
        usuarios.push(usuario);
        save();

        // Criar o arquivo de tarefas do usuário
        let nomeDoArquivo = `${email}-tarefas.json`;
        fs.writeFileSync(path.resolve(__dirname + `/../database/${nomeDoArquivo}`),'[]');

        // Gerar um TOKEN (jwt - JSON Web Token) para o usuário
        delete usuario.senha;
        let token = jwt.sign(usuario, process.env.JWT_KEY);

        // E retornar o token e as informações deste usuário
        return res.status(201).json({usuario, token});

    },
    login: (req, res) => {

    }
}

module.exports = AuthController;