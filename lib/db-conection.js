//connessione al batabase 
const {Sequelize}=require ("sequelize")
const sequelize =new Sequelize(
    "db_acl", "root", "",{host:"localhost", port:3306, dialect:"mysql"}
)
sequelize.authenticate().then(()=>{
    console.log("SeSe")
}).catch((error)=>{
    console.log(`si è verificato un errore ${error}`)
})


module.exports ={
    sequelize:sequelize,
    Sequelize:Sequelize
}