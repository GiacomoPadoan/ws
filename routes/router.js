const express = require("express");
const router = express.Router();
const Invoice = require("../schema/invoice")
/**
 * @swagger
 * /invoice:
 *   get:
 *     description: Get all invoices
 *     responses:
 *       200:
 *         description: Successful operation
 *   post:
 *     description: Create a new invoice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 * /invoice/{id}:
 *   delete:
 *     description: Delete an invoice
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Invoice deleted successfully
 *   put:
 *     description: Update an invoice
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 */

module.exports = router;

router.get("/", async (req, res) => {
  const { getInvoice } = require("../db/invoice");
  const resultato = await getInvoice();
  res.send({ r: resultato });
});

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

router.delete("/:id", async (req, res, next) => {
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
