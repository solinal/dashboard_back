require('dotenv').config();

const productToPriceID = {
    EMPRENDEDOR: process.env.PRODUCT_PLAN_EMPRENDEDOR,
    MICROEMPRESARIO: process.env.PRODUCT_PLAN_MICROEMPRESARIO,
    EMPRESA: process.env.PRODUCT_PLAN_EMPRESA
}

const productToPriceIDAnnually = {
    EMPRENDEDOR: process.env.A_PRODUCT_PLAN_EMPRENDEDOR,
    MICROEMPRESARIO: process.env.A_PRODUCT_PLAN_MICROEMPRESARIO,
    EMPRESA: process.env.A_PRODUCT_PLAN_EMPRESA 
}

module.exports = {
    productToPriceID,
    productToPriceIDAnnually
}