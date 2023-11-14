const asyncHandler = require('express-async-handler');

const Ticket = require('../models/ticketModel');

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
};
