const express = require("express");
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationById,
  deleteReservationById
} = require("../controllers/reservations");

const { protect } = require("../middleware/authMiddleware");


// Create a new reservation
router.post("/reservations", createReservation);

// Get all reservations
router.get("/reservations", getAllReservations);

// Get a single reservation by ID
router.get("/reservations/:id", getReservationById);

// Update a reservation by ID
router.put("/reservations/:id", updateReservationById);

// Delete a reservation by ID
router.delete("/reservations/:id",protect, deleteReservationById);

module.exports = router;
