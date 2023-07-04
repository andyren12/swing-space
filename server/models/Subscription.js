const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  studentId: {
    type: String,
    required: true,
  },
  coachId: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  current_period_start: {
    type: Date,
    default: Date.now(),
  },
  current_period_end: {
    type: Date,
    default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  message_history: [{
    sender: {
      type: String,
      required: true   
    },
    content: {
      type: String, 
      required: true
    },
    send_date: {
      type: Date,
      default: Date.now()
    }
  }]
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
