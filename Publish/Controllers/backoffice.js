var express = require('express');
var router = express.Router();
const path = require('path');

var menu = []
var Album = require("../Models/Album.js");
var schemaAlbum = require('../Schemas/Schema-Album.json');

var data = {
    href: '/backoffice/Album',
    name: 'Album'
}
menu.push(data)

router.get('/Album', function (req, res) {  
    var mAlbum = Album.create()
     mAlbum.save((rowsAffected)=>{
    Album.all(
        (rows)=>{      
            var view = {
                title: 'Album',
                menu:menu,
                columns:["title","releaseDate"],
                 rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => obj[key]),
                        actions: [{
                                    link: './Album/Details/' + obj.id,
                                    tooltip: 'Details'
                                }, {
                                    link: './Album/Edit/' + obj.id,
                                    tooltip: 'Edit'
                                }, {
                                    link: '#',
                                    tooltip: 'Delete',
                                    events: [{
                                        name: "onclick",
                                        function: "remove",
                                        args: obj.id
                                }]
                            }]
                    }
                   
                })
            }
                res.render('list.mustache', view)
            }
    );
    });
 
})


router.get('/Album/Insert', function (req, res) {  
    let prop = [];
    let aux = Album.create();
    Object.getOwnPropertyNames(aux).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(aux).includes(val),
             "restrictions": getSchemaRestrictions(schemaAlbum['properties'][val])
             })
    })
    prop = removeNoSchemaProperties(schemaAlbum, prop);
    let view = {
        title:'Album',
        properties: prop,
        name: function(){return this},
        value: function(){return this},
        restrictions: function(){return this},
        menu:menu,
        references: function () {
            var allRefs = [];
            if (schemaAlbum.references) {
                schemaAlbum.references.forEach(function (ref) {
                allRefs.push({
                    label: ref.label,
                    model: ref.model,
                    isManyToMany: ref.relation == "M-M" ? true :false,
                });
            });
            }  
            return allRefs;
        },
        get hasReferences() {
            return this.references().length > 0;
        }
    }
    
    res.render('insert.mustache', view)
    
})

router.get('/Album/Edit/:id', function (req, res) {  
  var id = req.params.id;
    Album.get(id, (obj)=>{
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(obj).includes(val),
             "value": obj[val],
             "restrictions": getSchemaRestrictions(schemaAlbum['properties'][val])
             }
            )
        })
        prop = removeNoSchemaProperties(schemaAlbum, prop);

        let view = {
            title:'Album',
            id:id,
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            restrictions: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaAlbum.references) {
                    schemaAlbum.references.forEach(function (ref) {
                    allRefs.push({
                        label: ref.label,
                        model: ref.model,
                        isManyToMany: ref.relation == "M-M" ? true :false,
                        values: ref.relation === "M-M" ? '/Album/' + req.params.id : "/"+obj[(ref.model + "_id")]

                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

    res.render('edit.mustache', view)
    })
})

router.get('/Album/Details/:id', function (req, res) {
    Album.get(req.params.id, function (obj) {
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "value": obj[val],
             })
        })
        let view = {
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaAlbum.references) {
                    schemaAlbum.references.forEach(function (ref) {
                    allRefs.push({
                        labelRef: ref.label,
                        model: ref.model,
                        values: ref.relation === "M-M" ? '/Album/' + req.params.id : obj[(ref.model + "_id")]
                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

        res.render('details', view )
    });
});


var Artist = require("../Models/Artist.js");
var schemaArtist = require('../Schemas/Schema-Artist.json');

var data = {
    href: '/backoffice/Artist',
    name: 'Artist'
}
menu.push(data)

router.get('/Artist', function (req, res) {  
    var mArtist = Artist.create()
     mArtist.save((rowsAffected)=>{
    Artist.all(
        (rows)=>{      
            var view = {
                title: 'Artist',
                menu:menu,
                columns:["name"],
                 rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => obj[key]),
                        actions: [{
                                    link: './Artist/Details/' + obj.id,
                                    tooltip: 'Details'
                                }, {
                                    link: './Artist/Edit/' + obj.id,
                                    tooltip: 'Edit'
                                }, {
                                    link: '#',
                                    tooltip: 'Delete',
                                    events: [{
                                        name: "onclick",
                                        function: "remove",
                                        args: obj.id
                                }]
                            }]
                    }
                   
                })
            }
                res.render('list.mustache', view)
            }
    );
    });
 
})


router.get('/Artist/Insert', function (req, res) {  
    let prop = [];
    let aux = Artist.create();
    Object.getOwnPropertyNames(aux).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(aux).includes(val),
             "restrictions": getSchemaRestrictions(schemaArtist['properties'][val])
             })
    })
    prop = removeNoSchemaProperties(schemaArtist, prop);
    let view = {
        title:'Artist',
        properties: prop,
        name: function(){return this},
        value: function(){return this},
        restrictions: function(){return this},
        menu:menu,
        references: function () {
            var allRefs = [];
            if (schemaArtist.references) {
                schemaArtist.references.forEach(function (ref) {
                allRefs.push({
                    label: ref.label,
                    model: ref.model,
                    isManyToMany: ref.relation == "M-M" ? true :false,
                });
            });
            }  
            return allRefs;
        },
        get hasReferences() {
            return this.references().length > 0;
        }
    }
    
    res.render('insert.mustache', view)
    
})

router.get('/Artist/Edit/:id', function (req, res) {  
  var id = req.params.id;
    Artist.get(id, (obj)=>{
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(obj).includes(val),
             "value": obj[val],
             "restrictions": getSchemaRestrictions(schemaArtist['properties'][val])
             }
            )
        })
        prop = removeNoSchemaProperties(schemaArtist, prop);

        let view = {
            title:'Artist',
            id:id,
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            restrictions: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaArtist.references) {
                    schemaArtist.references.forEach(function (ref) {
                    allRefs.push({
                        label: ref.label,
                        model: ref.model,
                        isManyToMany: ref.relation == "M-M" ? true :false,
                        values: ref.relation === "M-M" ? '/Artist/' + req.params.id : "/"+obj[(ref.model + "_id")]

                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

    res.render('edit.mustache', view)
    })
})

router.get('/Artist/Details/:id', function (req, res) {
    Artist.get(req.params.id, function (obj) {
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "value": obj[val],
             })
        })
        let view = {
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaArtist.references) {
                    schemaArtist.references.forEach(function (ref) {
                    allRefs.push({
                        labelRef: ref.label,
                        model: ref.model,
                        values: ref.relation === "M-M" ? '/Artist/' + req.params.id : obj[(ref.model + "_id")]
                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

        res.render('details', view )
    });
});


var Genre = require("../Models/Genre.js");
var schemaGenre = require('../Schemas/Schema-Genre.json');

var data = {
    href: '/backoffice/Genre',
    name: 'Genre'
}
menu.push(data)

router.get('/Genre', function (req, res) {  
    var mGenre = Genre.create()
     mGenre.save((rowsAffected)=>{
    Genre.all(
        (rows)=>{      
            var view = {
                title: 'Genre',
                menu:menu,
                columns:["name"],
                 rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => obj[key]),
                        actions: [{
                                    link: './Genre/Details/' + obj.id,
                                    tooltip: 'Details'
                                }, {
                                    link: './Genre/Edit/' + obj.id,
                                    tooltip: 'Edit'
                                }, {
                                    link: '#',
                                    tooltip: 'Delete',
                                    events: [{
                                        name: "onclick",
                                        function: "remove",
                                        args: obj.id
                                }]
                            }]
                    }
                   
                })
            }
                res.render('list.mustache', view)
            }
    );
    });
 
})


router.get('/Genre/Insert', function (req, res) {  
    let prop = [];
    let aux = Genre.create();
    Object.getOwnPropertyNames(aux).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(aux).includes(val),
             "restrictions": getSchemaRestrictions(schemaGenre['properties'][val])
             })
    })
    prop = removeNoSchemaProperties(schemaGenre, prop);
    let view = {
        title:'Genre',
        properties: prop,
        name: function(){return this},
        value: function(){return this},
        restrictions: function(){return this},
        menu:menu,
        references: function () {
            var allRefs = [];
            if (schemaGenre.references) {
                schemaGenre.references.forEach(function (ref) {
                allRefs.push({
                    label: ref.label,
                    model: ref.model,
                    isManyToMany: ref.relation == "M-M" ? true :false,
                });
            });
            }  
            return allRefs;
        },
        get hasReferences() {
            return this.references().length > 0;
        }
    }
    
    res.render('insert.mustache', view)
    
})

router.get('/Genre/Edit/:id', function (req, res) {  
  var id = req.params.id;
    Genre.get(id, (obj)=>{
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(obj).includes(val),
             "value": obj[val],
             "restrictions": getSchemaRestrictions(schemaGenre['properties'][val])
             }
            )
        })
        prop = removeNoSchemaProperties(schemaGenre, prop);

        let view = {
            title:'Genre',
            id:id,
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            restrictions: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaGenre.references) {
                    schemaGenre.references.forEach(function (ref) {
                    allRefs.push({
                        label: ref.label,
                        model: ref.model,
                        isManyToMany: ref.relation == "M-M" ? true :false,
                        values: ref.relation === "M-M" ? '/Genre/' + req.params.id : "/"+obj[(ref.model + "_id")]

                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

    res.render('edit.mustache', view)
    })
})

router.get('/Genre/Details/:id', function (req, res) {
    Genre.get(req.params.id, function (obj) {
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "value": obj[val],
             })
        })
        let view = {
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaGenre.references) {
                    schemaGenre.references.forEach(function (ref) {
                    allRefs.push({
                        labelRef: ref.label,
                        model: ref.model,
                        values: ref.relation === "M-M" ? '/Genre/' + req.params.id : obj[(ref.model + "_id")]
                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

        res.render('details', view )
    });
});


var Producer = require("../Models/Producer.js");
var schemaProducer = require('../Schemas/Schema-Producer.json');

var data = {
    href: '/backoffice/Producer',
    name: 'Producer'
}
menu.push(data)

router.get('/Producer', function (req, res) {  
    var mProducer = Producer.create()
     mProducer.save((rowsAffected)=>{
    Producer.all(
        (rows)=>{      
            var view = {
                title: 'Producer',
                menu:menu,
                columns:["name"],
                 rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => obj[key]),
                        actions: [{
                                    link: './Producer/Details/' + obj.id,
                                    tooltip: 'Details'
                                }, {
                                    link: './Producer/Edit/' + obj.id,
                                    tooltip: 'Edit'
                                }, {
                                    link: '#',
                                    tooltip: 'Delete',
                                    events: [{
                                        name: "onclick",
                                        function: "remove",
                                        args: obj.id
                                }]
                            }]
                    }
                   
                })
            }
                res.render('list.mustache', view)
            }
    );
    });
 
})


router.get('/Producer/Insert', function (req, res) {  
    let prop = [];
    let aux = Producer.create();
    Object.getOwnPropertyNames(aux).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(aux).includes(val),
             "restrictions": getSchemaRestrictions(schemaProducer['properties'][val])
             })
    })
    prop = removeNoSchemaProperties(schemaProducer, prop);
    let view = {
        title:'Producer',
        properties: prop,
        name: function(){return this},
        value: function(){return this},
        restrictions: function(){return this},
        menu:menu,
        references: function () {
            var allRefs = [];
            if (schemaProducer.references) {
                schemaProducer.references.forEach(function (ref) {
                allRefs.push({
                    label: ref.label,
                    model: ref.model,
                    isManyToMany: ref.relation == "M-M" ? true :false,
                });
            });
            }  
            return allRefs;
        },
        get hasReferences() {
            return this.references().length > 0;
        }
    }
    
    res.render('insert.mustache', view)
    
})

router.get('/Producer/Edit/:id', function (req, res) {  
  var id = req.params.id;
    Producer.get(id, (obj)=>{
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(obj).includes(val),
             "value": obj[val],
             "restrictions": getSchemaRestrictions(schemaProducer['properties'][val])
             }
            )
        })
        prop = removeNoSchemaProperties(schemaProducer, prop);

        let view = {
            title:'Producer',
            id:id,
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            restrictions: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaProducer.references) {
                    schemaProducer.references.forEach(function (ref) {
                    allRefs.push({
                        label: ref.label,
                        model: ref.model,
                        isManyToMany: ref.relation == "M-M" ? true :false,
                        values: ref.relation === "M-M" ? '/Producer/' + req.params.id : "/"+obj[(ref.model + "_id")]

                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

    res.render('edit.mustache', view)
    })
})

router.get('/Producer/Details/:id', function (req, res) {
    Producer.get(req.params.id, function (obj) {
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "value": obj[val],
             })
        })
        let view = {
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaProducer.references) {
                    schemaProducer.references.forEach(function (ref) {
                    allRefs.push({
                        labelRef: ref.label,
                        model: ref.model,
                        values: ref.relation === "M-M" ? '/Producer/' + req.params.id : obj[(ref.model + "_id")]
                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

        res.render('details', view )
    });
});


var RecordLabel = require("../Models/RecordLabel.js");
var schemaRecordLabel = require('../Schemas/Schema-RecordLabel.json');

var data = {
    href: '/backoffice/RecordLabel',
    name: 'RecordLabel'
}
menu.push(data)

router.get('/RecordLabel', function (req, res) {  
    var mRecordLabel = RecordLabel.create()
     mRecordLabel.save((rowsAffected)=>{
    RecordLabel.all(
        (rows)=>{      
            var view = {
                title: 'RecordLabel',
                menu:menu,
                columns:["name"],
                 rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => obj[key]),
                        actions: [{
                                    link: './RecordLabel/Details/' + obj.id,
                                    tooltip: 'Details'
                                }, {
                                    link: './RecordLabel/Edit/' + obj.id,
                                    tooltip: 'Edit'
                                }, {
                                    link: '#',
                                    tooltip: 'Delete',
                                    events: [{
                                        name: "onclick",
                                        function: "remove",
                                        args: obj.id
                                }]
                            }]
                    }
                   
                })
            }
                res.render('list.mustache', view)
            }
    );
    });
 
})


router.get('/RecordLabel/Insert', function (req, res) {  
    let prop = [];
    let aux = RecordLabel.create();
    Object.getOwnPropertyNames(aux).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(aux).includes(val),
             "restrictions": getSchemaRestrictions(schemaRecordLabel['properties'][val])
             })
    })
    prop = removeNoSchemaProperties(schemaRecordLabel, prop);
    let view = {
        title:'RecordLabel',
        properties: prop,
        name: function(){return this},
        value: function(){return this},
        restrictions: function(){return this},
        menu:menu,
        references: function () {
            var allRefs = [];
            if (schemaRecordLabel.references) {
                schemaRecordLabel.references.forEach(function (ref) {
                allRefs.push({
                    label: ref.label,
                    model: ref.model,
                    isManyToMany: ref.relation == "M-M" ? true :false,
                });
            });
            }  
            return allRefs;
        },
        get hasReferences() {
            return this.references().length > 0;
        }
    }
    
    res.render('insert.mustache', view)
    
})

router.get('/RecordLabel/Edit/:id', function (req, res) {  
  var id = req.params.id;
    RecordLabel.get(id, (obj)=>{
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(obj).includes(val),
             "value": obj[val],
             "restrictions": getSchemaRestrictions(schemaRecordLabel['properties'][val])
             }
            )
        })
        prop = removeNoSchemaProperties(schemaRecordLabel, prop);

        let view = {
            title:'RecordLabel',
            id:id,
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            restrictions: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaRecordLabel.references) {
                    schemaRecordLabel.references.forEach(function (ref) {
                    allRefs.push({
                        label: ref.label,
                        model: ref.model,
                        isManyToMany: ref.relation == "M-M" ? true :false,
                        values: ref.relation === "M-M" ? '/RecordLabel/' + req.params.id : "/"+obj[(ref.model + "_id")]

                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

    res.render('edit.mustache', view)
    })
})

router.get('/RecordLabel/Details/:id', function (req, res) {
    RecordLabel.get(req.params.id, function (obj) {
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "value": obj[val],
             })
        })
        let view = {
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaRecordLabel.references) {
                    schemaRecordLabel.references.forEach(function (ref) {
                    allRefs.push({
                        labelRef: ref.label,
                        model: ref.model,
                        values: ref.relation === "M-M" ? '/RecordLabel/' + req.params.id : obj[(ref.model + "_id")]
                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

        res.render('details', view )
    });
});


var SocialMedia = require("../Models/SocialMedia.js");
var schemaSocialMedia = require('../Schemas/Schema-SocialMedia.json');

var data = {
    href: '/backoffice/SocialMedia',
    name: 'SocialMedia'
}
menu.push(data)

router.get('/SocialMedia', function (req, res) {  
    var mSocialMedia = SocialMedia.create()
     mSocialMedia.save((rowsAffected)=>{
    SocialMedia.all(
        (rows)=>{      
            var view = {
                title: 'SocialMedia',
                menu:menu,
                columns:["name","link"],
                 rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => obj[key]),
                        actions: [{
                                    link: './SocialMedia/Details/' + obj.id,
                                    tooltip: 'Details'
                                }, {
                                    link: './SocialMedia/Edit/' + obj.id,
                                    tooltip: 'Edit'
                                }, {
                                    link: '#',
                                    tooltip: 'Delete',
                                    events: [{
                                        name: "onclick",
                                        function: "remove",
                                        args: obj.id
                                }]
                            }]
                    }
                   
                })
            }
                res.render('list.mustache', view)
            }
    );
    });
 
})


router.get('/SocialMedia/Insert', function (req, res) {  
    let prop = [];
    let aux = SocialMedia.create();
    Object.getOwnPropertyNames(aux).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(aux).includes(val),
             "restrictions": getSchemaRestrictions(schemaSocialMedia['properties'][val])
             })
    })
    prop = removeNoSchemaProperties(schemaSocialMedia, prop);
    let view = {
        title:'SocialMedia',
        properties: prop,
        name: function(){return this},
        value: function(){return this},
        restrictions: function(){return this},
        menu:menu,
        references: function () {
            var allRefs = [];
            if (schemaSocialMedia.references) {
                schemaSocialMedia.references.forEach(function (ref) {
                allRefs.push({
                    label: ref.label,
                    model: ref.model,
                    isManyToMany: ref.relation == "M-M" ? true :false,
                });
            });
            }  
            return allRefs;
        },
        get hasReferences() {
            return this.references().length > 0;
        }
    }
    
    res.render('insert.mustache', view)
    
})

router.get('/SocialMedia/Edit/:id', function (req, res) {  
  var id = req.params.id;
    SocialMedia.get(id, (obj)=>{
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(obj).includes(val),
             "value": obj[val],
             "restrictions": getSchemaRestrictions(schemaSocialMedia['properties'][val])
             }
            )
        })
        prop = removeNoSchemaProperties(schemaSocialMedia, prop);

        let view = {
            title:'SocialMedia',
            id:id,
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            restrictions: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaSocialMedia.references) {
                    schemaSocialMedia.references.forEach(function (ref) {
                    allRefs.push({
                        label: ref.label,
                        model: ref.model,
                        isManyToMany: ref.relation == "M-M" ? true :false,
                        values: ref.relation === "M-M" ? '/SocialMedia/' + req.params.id : "/"+obj[(ref.model + "_id")]

                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

    res.render('edit.mustache', view)
    })
})

router.get('/SocialMedia/Details/:id', function (req, res) {
    SocialMedia.get(req.params.id, function (obj) {
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "value": obj[val],
             })
        })
        let view = {
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaSocialMedia.references) {
                    schemaSocialMedia.references.forEach(function (ref) {
                    allRefs.push({
                        labelRef: ref.label,
                        model: ref.model,
                        values: ref.relation === "M-M" ? '/SocialMedia/' + req.params.id : obj[(ref.model + "_id")]
                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

        res.render('details', view )
    });
});


var Song = require("../Models/Song.js");
var schemaSong = require('../Schemas/Schema-Song.json');

var data = {
    href: '/backoffice/Song',
    name: 'Song'
}
menu.push(data)

router.get('/Song', function (req, res) {  
    var mSong = Song.create()
     mSong.save((rowsAffected)=>{
    Song.all(
        (rows)=>{      
            var view = {
                title: 'Song',
                menu:menu,
                columns:["title","duration"],
                 rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => obj[key]),
                        actions: [{
                                    link: './Song/Details/' + obj.id,
                                    tooltip: 'Details'
                                }, {
                                    link: './Song/Edit/' + obj.id,
                                    tooltip: 'Edit'
                                }, {
                                    link: '#',
                                    tooltip: 'Delete',
                                    events: [{
                                        name: "onclick",
                                        function: "remove",
                                        args: obj.id
                                }]
                            }]
                    }
                   
                })
            }
                res.render('list.mustache', view)
            }
    );
    });
 
})


router.get('/Song/Insert', function (req, res) {  
    let prop = [];
    let aux = Song.create();
    Object.getOwnPropertyNames(aux).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(aux).includes(val),
             "restrictions": getSchemaRestrictions(schemaSong['properties'][val])
             })
    })
    prop = removeNoSchemaProperties(schemaSong, prop);
    let view = {
        title:'Song',
        properties: prop,
        name: function(){return this},
        value: function(){return this},
        restrictions: function(){return this},
        menu:menu,
        references: function () {
            var allRefs = [];
            if (schemaSong.references) {
                schemaSong.references.forEach(function (ref) {
                allRefs.push({
                    label: ref.label,
                    model: ref.model,
                    isManyToMany: ref.relation == "M-M" ? true :false,
                });
            });
            }  
            return allRefs;
        },
        get hasReferences() {
            return this.references().length > 0;
        }
    }
    
    res.render('insert.mustache', view)
    
})

router.get('/Song/Edit/:id', function (req, res) {  
  var id = req.params.id;
    Song.get(id, (obj)=>{
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "required": !Object.keys(obj).includes(val),
             "value": obj[val],
             "restrictions": getSchemaRestrictions(schemaSong['properties'][val])
             }
            )
        })
        prop = removeNoSchemaProperties(schemaSong, prop);

        let view = {
            title:'Song',
            id:id,
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            restrictions: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaSong.references) {
                    schemaSong.references.forEach(function (ref) {
                    allRefs.push({
                        label: ref.label,
                        model: ref.model,
                        isManyToMany: ref.relation == "M-M" ? true :false,
                        values: ref.relation === "M-M" ? '/Song/' + req.params.id : "/"+obj[(ref.model + "_id")]

                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

    res.render('edit.mustache', view)
    })
})

router.get('/Song/Details/:id', function (req, res) {
    Song.get(req.params.id, function (obj) {
        let prop = [];
        obj = obj[0]
        Object.getOwnPropertyNames(obj).forEach((val,index,arr)=>{
        prop.push(
            {"name": val,
             "value": obj[val],
             })
        })
        let view = {
            properties: prop,
            name: function(){return this},
            value: function(){return this},
            menu:menu,
            references: function () {
                var allRefs = [];
                if (schemaSong.references) {
                    schemaSong.references.forEach(function (ref) {
                    allRefs.push({
                        labelRef: ref.label,
                        model: ref.model,
                        values: ref.relation === "M-M" ? '/Song/' + req.params.id : obj[(ref.model + "_id")]
                    });
                });
                }  
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        }

        res.render('details', view )
    });
});




function removeNoSchemaProperties(schemaProp, propArr){
    return propArr.filter(elem=> Object.keys(schemaProp.properties).includes(elem.name))
}

function getSchemaRestrictions(properties){
    var aux = [];
    if(properties){
        if(properties['type'])  aux.push(getInputType(properties['type']))
        if(properties['maximum'])  aux.push(getMax(properties['maximum']))
        if(properties['minimum:'])  aux.push(getMin(properties['minimum']))
        if(properties['maxLength'])  aux.push(getMaxLength(properties['maximum']))
    }
    return aux
}

function getInputType(jstype){
    if(jstype == 'number' || jstype == 'integer'){
    return {'restriction': 'type', 'val': 'number'}
    }else{
          return {'restriction': 'type', 'val': 'text'}

    }
}

function getMax(val){
    return {'restriction': 'max', 'val': val}
}

function getMin(val){
    return {'restriction': 'min', 'val': val}
}

function getMaxLength(val){
    return {'restriction': 'maxLength', 'val': val}
}



module.exports = router;