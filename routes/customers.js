const rjwt = require('restify-jwt-community');
const Customer = require('../models/Customer');
const errors = require('restify-errors');
const bodyParser = require('body-parser');
const Config = require('../config');

// create application/json parser
const jsonParser = bodyParser.json();

module.exports = app => {
  // get all customer
  app.get('/customers', async (req, res) => {
    try {
      const customers = await Customer.find({});
      return res.send(customers).status(200);
    } catch (err) {
      return res.send(new errors.InvalidContentError(err));
    }
  });
  // Add new Customer
  app.post(
    '/customers',
    rjwt({ secret: Config.JWT_SECRET }),
    jsonParser,
    async (req, res) => {
      if (!req.is('application/json')) {
        return res.send(
          new errors.InvalidContentError('Expect application/json')
        );
      }
      const { name, email, balance } = req.body;
      try {
        const customer = new Customer({
          name,
          email,
          balance
        });
        const newCustomer = await customer.save();
        return res
          .json({
            success: true
          })
          .status(201);
      } catch (err) {
        return res.status(500).send(new errors.InternalError(err.message));
      }
    }
  );
  // get single user
  app.get('/customers/:id', async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      return res.send(customer).status(200);
    } catch (err) {
      return res.send(
        new errors.ResourceNotFoundError(
          `There is no customer with ${req.params.id}`
        )
      );
    }
  });
  // update of customer
  app.put(
    '/customers/:id',
    rjwt({ secret: Config.JWT_SECRET }),
    jsonParser,
    async (req, res) => {
      if (!req.is('application/json')) {
        return res.send(
          new errors.InvalidContentError('Expect application/json')
        );
      }
      try {
        const customer = await Customer.findOneAndUpdate(
          {
            _id: req.params.id
          },
          req.body
        );
        return res
          .json({
            success: true
          })
          .status(201);
      } catch (err) {
        return res.status(500).send(new errors.InternalError(err.message));
      }
    }
  );
  // delete customer
  app.delete(
    '/customers/:id',
    rjwt({ secret: Config.JWT_SECRET }),
    async (req, res) => {
      try {
        const customer = await Customer.findOneAndRemove({
          _id: req.params.id
        });
        return res
          .json({
            success: true
          })
          .status(201);
      } catch (err) {
        return res.status(500).send(new errors.InternalError(err.message));
      }
    }
  );
};
