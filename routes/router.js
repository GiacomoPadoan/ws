const express = require("express")
const router = express.Router()

module.exports = router

router.get("/",async (req, res) => {
    const {getInvoice}= require("../db/invoice")
    const resultato=await getInvoice()
    res.send({r:resultato})
  })
router.post("/create", async (req, res, next) => {
  try {
    const { data, utente, indirizzata, motivazioni, somma } = req.body;

    const newInvoice = await Invoice.create({
      data,
      utente,
      indirizzata,
      motivazioni,
      somma,
    });

    return res.status(201).json(newInvoice);
  } catch (err) {
    next(err);
  }
});
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedInvoice = await Invoice.destroy({
      where: { id },
    });

    if (!deletedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
});
router.put("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, utente, indirizzata, motivazioni, somma } = req.body;

    const [numRowsUpdated, [updatedInvoice]] = await Invoice.update(
      { data, utente, indirizzata, motivazioni, somma },
      { where: { id }, returning: true }
    );

    if (numRowsUpdated === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    return res.status(200).json(updatedInvoice);
  } catch (err) {
    next(err);
  }
});
