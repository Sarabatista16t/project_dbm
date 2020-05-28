var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaSocial_Media = require('../Schemas/Schema-Social-Media.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Social_Media {
 constructor (id,name,base_link,icon) {
     
    this.name = name;
    this.base_link = base_link;
    this.icon = icon;
    this.id = id;

        Object.defineProperty(this,"name", { enumerable: false });
        Object.defineProperty(this,"base_link", { enumerable: false });
        Object.defineProperty(this,"icon", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}
static create() {
 return Object.assign(new Social_Media(), jsf.generate(schemaSocial_Media));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Social_Media", [], Social_Media, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Social_Media WHERE id = ?", [id], Social_Media, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        sqlitewrapper.run("UPDATE Social_Media SET  name =? ,  base_link =? ,  icon =?   WHERE id = ?", [ this.name, this.base_link, this.icon, this.id], callback)
    }else{
                console.log("else")

        sqlitewrapper.run("INSERT INTO Social_Media ( name,  base_link,  icon ) values (?,?,?)", [ this.name ,  this.base_link ,  this.icon  ]) 
    }
} 

}

module.exports = Social_Media