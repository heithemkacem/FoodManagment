const mongoose = require("mongoose");

const dishs = new mongoose.Schema((sequelize, DataTypes) => {
    return sequelize.define({
        cat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        tva: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 10,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: "default.png",
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 9999,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        code: {
            type: DataTypes.STRING('40'),
            allowNull: true,
            defaultValue: "changer-code",
        },
    }, { timestamps: true });
});

module.exports = mongoose.model("qr_dishs", dishs);