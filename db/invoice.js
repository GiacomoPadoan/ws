const {Invoice}=require("../schema/invoice")

async function getInvoice(){
    const result=await Invoice.findAll({
        attributes:["id","data","utente","indirizzata","motivazioni","somma"]
    })
    return result
}
const deleteInvoice = async (id) => {
    try {
      const deletedInvoice = await Invoice.destroy({ where: { id } });
      if (!deletedInvoice) {
        throw new Error("Invoice not found");
      }
  
      return true;
    } catch (err) {
      throw err;
    }
  };
  const createInvoice = async (data, utente, indirizzata, motivazioni, somma) => {
    try {
      const newInvoice = await Invoice.create({
        data,
        utente,
        indirizzata,
        motivazioni,
        somma,
      });
  
      return newInvoice;
    } catch (err) {
      throw err;
    }
  };
  const updateInvoice = async (id, data, utente, indirizzata, motivazioni, somma) => {
    try {
      const [numRowsUpdated, [updatedInvoice]] = await Invoice.update(
        { data, utente, indirizzata, motivazioni, somma },
        { where: { id }, returning: true }
      );
  
      if (numRowsUpdated === 0) {
        throw new Error("Invoice not found");
      }
  
      return updatedInvoice;
    } catch (err) {
      throw err;
    }
  };
module.exports={
    getInvoice:getInvoice,
    deleteInvoice:deleteInvoice,
    createInvoice:createInvoice,
    updateInvoice:updateInvoice,
}