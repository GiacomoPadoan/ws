//connessione al batabase 
const {Sequelize}=require ("Sequelize")
const sequalize =new Sequelize(
    "db_acl", "root", "",{host:"localhost", port:3306, dialect:"mysql"}
)
sequalize.authenticate().then(()=>{
    console.log("SeSe")
}).catch((error)=>{
    console.log("si è verificato un errore")
})

module.exports ={
    sequalize:sequalize,
    Sequelize:Sequelize
}