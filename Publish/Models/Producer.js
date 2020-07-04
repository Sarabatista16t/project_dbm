var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto')
 
const schemaProducer = require('../Schemas/Schema-Producer.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Producer {
 constructor (id,name) {
     
    this.name = name;

    Object.defineProperty(this, "Album_id", { enumerable: false, writable: true });
    Object.defineProperty(this,"id", { enumerable: false, writable: true });

}
static create() {
 return Object.assign(new Producer(), jsf.generate(schemaProducer));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Producer", [], Producer, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Producer WHERE id = ?", [id], Producer, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Producer WHERE id = ?", [id], callback)
}
static many(model,id, callback){
    let tablename = ('Producer' < model) ? 'Producer'+ "_" + model : model + "_" +'Producer' ;
    sqlitewrapper.where("SELECT * FROM Producer INNER JOIN  "+tablename+" ON "+tablename+".Producer_id = Producer.id WHERE  "+tablename+"."+model+"_id = ?", [id],Producer, callback);
}

static top(property,order,limit,callback){
    sqlitewrapper.where("SELECT * FROM Producer ORDER BY "+property+" "+order+" LIMIT "+limit, [], Producer, callback);
}

save(callback){
    if(this.id){
        let attr = [];
       attr.push('name =  ?');
        let values = '?,'
        let params =  [ this.name  ];
        let manymany = [];
        if(this.Album_id)  {
            if('1-M' == '1-M'){
            attr.push('Album_id =  ?');
            values += '?,';
            params.push(this.Album_id)
            }else if('1-M' == 'M-M'){
                if(Array.isArray(this.Album_id)){
                    manymany.push({stmt:"INSERT INTO Album_Producer (Producer_id, Album_id) values "+ Array(this.Album_id.length).fill("(?,?)").join(","), params: repeatValues(this.Album_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_Producer (Producer_id, Album_id) values (?,?)",  params: [this.id, this.Album_id]}); 
                }
            }
        }
        params.push(this.id);
        values = values.slice(0, -1);
        var l = "UPDATE Producer SET "+attr.join(',')+" WHERE id = ?";
        sqlitewrapper.run(l,params,()=>{
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
    }else{
        let attr = [];
 attr.push( 'name');
        let values = '?,'
        let params =  [ this.name  ];
        let manymany = [];
        if(this.Album_id)  {
            if('1-M' == '1-M'){
            attr.push('Album_id');
            values += '?,';
            params.push(this.Album_id)
            }
        }
        values = values.slice(0, -1);
        var l = "INSERT INTO Producer ("+attr.join(',')+") values ("+values+")";
   
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
        if(obj.Album_id)  {
           if('1-M' == 'M-M'){
                if(Array.isArray(obj.Album_id)){
                    manymany.push({stmt:"INSERT INTO Album_Producer (Producer_id, Album_id) values "+ Array(obj.Album_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Album_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Album_Producer (Producer_id, Album_id) values (?,?)",  params: [id, obj.Album_id]}); 
                }
                manymany.push({stmt:"DELETE FROM Album_Producer WHERE Producer_id= ?", params: id })

            }
        }
        return manymany
    }
}
    
} 
 
module.exports = Producer