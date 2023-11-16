require('dotenv').config();
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { productToPriceIDAnnually, productToPriceID } = require('../utils/productListId');

const createNewCustomer = async (name, email, paymentMethod) => {
    const customerStripe = await Stripe.customers.create({
        name,
        email,
        payment_method: paymentMethod.id
    })
    return customerStripe
}

const getCustomerByID = async (id) => {
    const customer = await Stripe.customers.retrieve(id)
    return customer
}

const getProductId = (typePlan, typeSub) => {
    if (typeSub === "year") return productToPriceIDAnnually[typePlan] || 'No existing product'
    return productToPriceID[typePlan] || 'No existing product'
}

const createCheckoutSubscription = async (customer, planType, typeSub, payment_method) => {
    const productId = getProductId(planType, typeSub)
    // await Stripe.customers.update(customer.id, {
    //     invoice_settings: { default_payment_method: payment_method.id }
    // });
    const paymentMethod = await Stripe.paymentMethods.attach(
        payment_method.id,
        { customer: customer.id }
    );

    const subscription = await Stripe.subscriptions.create({
        customer: customer.id,
        items: [
            {
                price: productId,
            }
        ],
        trial_period_days: 15,
        default_payment_method: paymentMethod.id,
        payment_settings: {
            payment_method_options: {
                card: {
                    request_three_d_secure: 'any',
                },
            },
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
    });
    return {
        subscriptionId: subscription.id,
    };
};

const cancelSubscription = async (id_subscription) => {
    const deleted = await Stripe.subscriptions.del(
        id_subscription
    );
    return deleted
}

const getInvoiceBySubscriptionUser = async (user) => {
    const subscription = await Stripe.subscriptions.retrieve(
        user.id_stripe_subscription
    );
    console.log("Sub ===========> ", subscription);
    const invoice = await Stripe.invoices.retrieve(subscription.latest_invoice);
    if (!invoice) return null;
    return invoice
}

const updateSubscriptionById = async (id, productId) => {
    const subscription = await Stripe.subscriptions.update(
        id,
        {
            items: [
                {
                    price: productId,
                }
            ],
        }
    );
    return subscription
}

module.exports = {
    createNewCustomer,
    getCustomerByID,
    createCheckoutSubscription,
    cancelSubscription,
    getInvoiceBySubscriptionUser,
    updateSubscriptionById
}