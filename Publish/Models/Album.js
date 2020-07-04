var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto')
 
const schemaAlbum = require('../Schemas/Schema-Album.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Album {
 constructor (id,title,description,releaseDate) {
     
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;

    Object.defineProperty(this,"description", { enumerable: false });
    Object.defineProperty(this, "Song_id", { enumerable: false, writable: true });
    Object.defineProperty(this,"id", { enumerable: false, writable: true });

}
static create() {
 return Object.assign(new Album(), jsf.generate(schemaAlbum));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Album", [], Album, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Album WHERE id = ?", [id], Album, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Album WHERE id = ?", [id], callback)
}
static many(model,id, callback){
    let tablename = ('Album' < model) ? 'Album'+ "_" + model : model + "_" +'Album' ;
    sqlitewrapper.where("SELECT * FROM Album INNER JOIN  "+tablename+" ON "+tablename+".Album_id = Album.id WHERE  "+tablename+"."+model+"_id = ?", [id],Album, callback);
}

static top(property,order,limit,callback){
    sqlitewrapper.where("SELECT * FROM Album ORDER BY "+property+" "+order+" LIMIT "+limit, [], Album, callback);
}

save(callback){
    if(this.id){
        let attr = [];
       attr.push('title =  ?'); attr.push('description =  ?'); attr.push('releaseDate =  ?');
        let values = '?,?,?,'
        let params =  [ this.title ,  this.description ,  this.releaseDate  ];
        let manymany = [];
        if(this.Song_id)  {
            if('M-M' == '1-M'){
            attr.push('Song_id =  ?');
            values += '?,';
            params.push(this.Song_id)
            }else if('M-M' == 'M-M'){
                if(Array.isArray(this.Song_id)){
                    manymany.push({stmt:"INSERT INTO Album_Song (Album_id, Song_id) values "+ Array(this.Song_id.length).fill("(?,?)").join(","), params: repeatValues(this.Song_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_Song (Album_id, Song_id) values (?,?)",  params: [this.id, this.Song_id]}); 
                }
            }
        }
        params.push(this.id);
        values = values.slice(0, -1);
        var l = "UPDATE Album SET "+attr.join(',')+" WHERE id = ?";
        sqlitewrapper.run(l,params,()=>{
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
    }else{
        let attr = [];
 attr.push( 'title'); attr.push( 'description'); attr.push( 'releaseDate');
        let values = '?,?,?,'
        let params =  [ this.title ,  this.description ,  this.releaseDate  ];
        let manymany = [];
        if(this.Song_id)  {
            if('M-M' == '1-M'){
            attr.push('Song_id');
            values += '?,';
            params.push(this.Song_id)
            }
        }
        values = values.slice(0, -1);
        var l = "INSERT INTO Album ("+attr.join(',')+") values ("+values+")";
   
        sqlitewrapper.run(l,params,(res)=>{
            manymany = manyTo(this, attr, values, params , res.lastId);
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
  
     
   } 
   function aux(statements, callback){
        var call = callback;
        var elem = statements.pop()
        console.log(elem)
        if(statements.length>0) call =  aux(statements,callback)
        sqlitewrapper.run(elem['stmt'],elem['params'] , call)
    
   }
     function repeatValues(arr, stat){
        var arrFinal = []
       arr.forEach((elem)=>{
            arrFinal.push(stat);
            arrFinal.push(elem)
        })
        return arrFinal;
    }    
    
function manyTo(obj,attr, values, params , id){
    var manymany = []
        if(obj.Song_id)  {
           if('M-M' == 'M-M'){
                if(Array.isArray(obj.Song_id)){
                    manymany.push({stmt:"INSERT INTO Album_Song (Album_id, Song_id) values "+ Array(obj.Song_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Song_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_Song (Album_id, Song_id) values (?,?)",  params: [id, obj.Song_id]}); 
                }
            }
        }
        return manymany
    }
}
    
} 
 
module.exports = Album