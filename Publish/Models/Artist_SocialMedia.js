var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto.db')
 
const schemaArtist_SocialMedia = require('../Schemas/Schema-Artist_SocialMedia.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Artist_SocialMedia {
 constructor (id,id_artist,id_social_media,link) {
     
    this.id_artist = id_artist;
    this.id_social_media = id_social_media;
    this.link = link;
    this.id = id;

        Object.defineProperty(this,"id_artist", { enumerable: false });
        Object.defineProperty(this,"id_social_media", { enumerable: false });
        Object.defineProperty(this,"link", { enumerable: false });
        Object.defineProperty(this,"id", { enumerable: false });

}
static create() {
 return Object.assign(new Artist_SocialMedia(), jsf.generate(schemaArtist_SocialMedia));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Artist_SocialMedia", [], Artist_SocialMedia, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Artist_SocialMedia WHERE id = ?", [id], Artist_SocialMedia, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Aluno WHERE id = ?", [id], callback)
}

save(callback){
    console.log("QWERT")
    console.log("ID"+this.id)
    if(this.id){
        console.log("IF")
        sqlitewrapper.run("UPDATE Artist_SocialMedia SET  id_artist =? ,  id_social_media =? ,  link =?   WHERE id = ?", [ this.id_artist, this.id_social_media, this.link, this.id], callback)
    }else{
                console.log("else")

        sqlitewrapper.run("INSERT INTO Artist_SocialMedia ( id_artist,  id_social_media,  link ) values (?,?,?)", [ this.id_artist ,  this.id_social_media ,  this.link  ]) 
    }
} 

}

module.exports = Artist_SocialMedia