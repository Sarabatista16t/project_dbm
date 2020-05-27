var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/labs/labs.db')
 
const schemaAluno = require('../Schemas/Schema-Aluno.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Aluno {
 constructor (id,numero_estudante,name,email,address,grade) {
     
    this.numero_estudante = numero_estudante;
    this.name = name;
    this.email = email;
    this.address = address;
    this.grade = grade;
    this.id = id;

        Object.defineProperty(this,"numero_estudante", { enumerable: false });
        Object.defineProperty(this,"name", { enumerable: false });
        Object.defineProperty(this,"email", { enumerable: false });
        Object.defineProperty(this,"address", { enumerable: false });
        Object.defineProperty(this,"grade", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}
static create() {
 return Object.assign(new Aluno(), jsf.generate(schemaAluno));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Aluno", [], Aluno, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Aluno WHERE id = ?", [id], Aluno, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        sqlitewrapper.run("UPDATE Aluno SET  numero_estudante =? ,  name =? ,  email =? ,  address =? ,  grade =?   WHERE id = ?", [ this.numero_estudante, this.name, this.email, this.address, this.grade, this.id], callback)
    }else{
                console.log("else")

        sqlitewrapper.run("INSERT INTO Aluno ( numero_estudante,  name,  email,  address,  grade ) values (?,?,?,?,?)", [ this.numero_estudante ,  this.name ,  this.email ,  this.address ,  this.grade  ]) 
    }
} 

}

module.exports = Aluno