
let mongoose=require('mongoose');

let Person =require("./module.js")
mongoose.connect("mongodb://localhost:27017/db",{useNewUrlParser: true ,useUnifiedTopology: true},(er)=>{
    if (er){
        console.log(er);
    }
    else 
    console.log('connected')
})

//create document
const create =()=>{
    let newperson= new Person({
        name : 'wissam',
        age : 25,
        favoriteFoods :['pizza']
    });
    newperson.save()
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
//create();
// create manyperonnes at the same time
let personnes=[
    {
    name : 'ali',
    age : 25,
    favoriteFoods :["makloub"]
} ,
{
    name : 'alious',
    age : 25,
    favoriteFoods :["mlawi"]
} 
,
{
    name : 'ahmed',
    age : 25,
    favoriteFoods :["mlawi"]
} 
];
const createmany=()=>{
    Person.create(personnes,(err,res)=> {
        if (err) console.log(err)
        else console.log(res)
    });

};
//createmany();
// find all personnes have a name
const findper=(personName)=>{
    Person.find({name:personName},(err,res)=> {
        if (err) console.log(err)
        else console.log(res)
    })
} 
//findper('wissam');
//find one
const finder=(namee)=>{
    Person.findOne({name: namee},(err,res)=> {
        if (err) console.log(err)
        else console.log(res)
    })
} 
//finder('wissam');


//find by id
const findid=(id)=>{
    Person.findById({_id : id},(err,res)=>{
        if (err) console.log(err)
        else console.log(res)
    });
}
//findid('5fd9e133856ff237741148ac')

//mises à jour classiques en exécutant Rechercher
const update =(personid)=>{
    let ham="humburger";
Person.findById({_id : personid}, (err,res)=>{
    if(err) console.log(err);
    else {
        res.favoriteFoods.push(ham) ;
    res.save();
    console.log(res.favoriteFoods)  ;
}
}
)}
//update("5fd9f03f9f4a4a370c52c88b");

// findOne and update
const updateone = (personName) => {
    let newAge = 20;
    Person.findOneAndUpdate({name:personName},{$set:{age:newAge}},(err,res) => {
        if (err) console.log(err);
        else {console.log(res)}
    })
}
//updateone("alious");


// find and delete byid
const deletee =(idpersonne)=>{
Person.findByIdAndRemove(_id=idpersonne, (err , res)=>{
    if (err) console.log(err)
    else console.log(res)
})
}
//deletee("5fd9f02e20baf0304c490b21");


//supprimer plusieurs document au mm temps
const suppplusieur = () => {
    let a = "alious";
    Person.find({name:a},(err,res)=> console.log(res))
    Person.remove({name:a},(err,res) => {
        if (err) console.log(err);
        else console.log(res)
    })
    
    
}
//suppplusieur()

//Chaîne d'aide aux requêtes de recherche pour affiner les résultats de recherche
const chaineaide = () => {
    let food = "mlawi"
    Person.find({favouriteFoods:food})
    .sort({name:1}).limit(2).select({name:1,favouriteFoods:1}).exec((err,res) => {
        if (err) console.log(err);
        else console.log(res)
    })
}
chaineaide();