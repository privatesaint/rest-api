const Customer = require("../models/Customer");
const errors = require("restify-errors");
// const bodyParser = require("body-parser");
// create application/json parser
// const jsonParser = bodyParser.json();

module.exports = app => {
    app.get('/customers', async (req, res) => {
        return res.send('hello');
        try {
            const customers = await Customer.find({});
            return res.send(customers).status(200);
        } catch (err) {
            return res.send(new errors.InvalidContentError(err));
        }

    })
    // app.post('/customers', async (req, res) => {
    //     const {
    //         name,
    //         email,
    //         balance
    //     } = req.body;

    //     try {
    //         const customer = new customer({
    //             name,
    //             email,
    //             balance
    //         })
    //         const newCusomer = await customer.save();
    //         return res.send
    //     } catch (err) {
    //         return res.send(new errors.BadRequestError(err));
    //     }
    // })
}