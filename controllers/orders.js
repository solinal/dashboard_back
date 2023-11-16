const { generateBilling, getOrderByUserId } = require("../services/billing.js");

const {
    createNewCustomer,
    createCheckoutSubscription,
    getCustomerByID,
    getInvoiceBySubscriptionUser,
} = require("../services/stripe");
const { getUserByEmail } = require("../services/users.js");

const checkoutPaymentSubscription = async (req, res) => {
    const { typePlan, email, typeSub, paymentMethod } = req.body;
    // try {
        const user = await getUserByEmail(email);
        if (!user.id_stripe_customer) {
            const customer = await createNewCustomer(`${user.nombres} ${user.apellidos}`,email, paymentMethod);
            user.id_stripe_customer = customer.id;
            await user.save();
        }
        const currentCustomer = await getCustomerByID(user.id_stripe_customer);
        const data = await createCheckoutSubscription(
            currentCustomer,
            typePlan,
            typeSub,
            paymentMethod
        );
        await generateBilling(user, typePlan, typeSub, data.subscriptionId);
        return res.status(200).json({
            data,
            message: "Subscription successfully initiated",
            status: "success",
        });
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({ message: error.message });
    // }
};

const cancelSubscription = async (req, res) => {
    try {
        const { id_subscription } = req.body;
        const data = await cancelSubscription(id_subscription);
        if (!data) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json({
            message: "Subscription cancelled",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getInvoicesByCustomerUser = async (req, res) => {
    // try {
        let { correo } = req.body;
        
        const user = await getUserByEmail(correo);
        // console.log(user);
        let id_usuario = user.id_usuario;
        const user_orden = await getOrderByUserId(id_usuario);
        if(!user_orden) {
            return res.status(404).json({ message: "You not have any Order and Sub active." });
        }
        if (!user_orden.id_stripe_subscription) {
            return res.status(404).json({ message: "You not have any Subscription active." });
        }
        const invoice = await getInvoiceBySubscriptionUser(user_orden);
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        return res.status(200).json({
            factura: invoice,
        });
    // } catch (error) {
    //     return res.status(500).json({
    //         message: "Internal server error",
    //     });
    // }
};

module.exports = {
    checkoutPaymentSubscription,
    cancelSubscription,
    getInvoicesByCustomerUser,
};
