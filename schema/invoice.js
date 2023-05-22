const { sequelize, Sequelize } = require("../lib/db-conection");
const Invoice = sequelize.define("fatture", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    utente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    indirizzata: {
        type: Sequelize.STRING,
        allowNull: false
    },
    motivazioni: {
        type: Sequelize.STRING,
        allowNull: false
    },
    somma: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "fatture",
});

module.exports = {
    Invoice: Invoice,
}