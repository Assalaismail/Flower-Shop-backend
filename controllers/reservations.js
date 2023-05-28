const Reservation = require("../models/reservations");

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving reservations." });
  }
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the reservation." });
  }
};

// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { userId, name, email, phone_nb, date, address, message, tools } = req.body;

    const reservation = new Reservation({
      userId,
      name,
      email,
      phone_nb,
      date,
      address,
      message,
      tools,
    });

    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the reservation." });
  }
};

// Update a reservation by ID
const updateReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, name, email, phone_nb, date, address, message } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      {
        userId,
        name,
        email,
        phone_nb,
        date,
        address,
        message,
        tools,
      },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the reservation." });
  }
};

// Delete a reservation by ID
const deleteReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndRemove(id);

    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the reservation." });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationById,
  deleteReservationById,
};
