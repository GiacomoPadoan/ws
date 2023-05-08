const {Invoice}=require("../schema/invoice")
async function getInvoice(){
    const result=await Invoice.findAll({
        attributes:["id","data","utente","indirizzata","motivazioni","somma"]
    })
    return result
}
module.exports={
    getInvoice:getInvoice,
}