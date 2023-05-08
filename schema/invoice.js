const { sequelize, Sequelize } = require("../lib/database");

const Invoice = sequelize.define("invoice", {
    id: {
        type: Sequelize.INT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    utente: {
        type: Sequelize.INT,
        allowNull: false
    },
    indirizzata: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    motivazioni: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    somma: {
        type: Sequelize.int,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "invoice",
});

module.exports = {
    Invoice: Invoice,
}