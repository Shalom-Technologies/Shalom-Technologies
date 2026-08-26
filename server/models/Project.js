const mongoose = require('mongoose');

// A single turn in the AI tweak conversation
const conversationEntrySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    _id: false,
  }
);

// A snapshot of the mockup code at a point in time, so tweaks can be reviewed/rolled back
const mockupVersionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    _id: false,
  }
);

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mockupCode: {
      type: String,
      default: '',
    },
    mockupHistory: {
      type: [mockupVersionSchema],
      default: [],
    },
    conversation: {
      type: [conversationEntrySchema],
      default: [],
    },
    tweaksUsed: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    status: {
      type: String,
      enum: [
        'generating',       // initial AI mockup generation in progress
        'reviewing',        // client is viewing/tweaking the mockup
        'pending_build',    // finalized, waiting for a human developer to pick it up
        'in_development',   // a human is actively building the real site
        'live',             // site has been deployed
      ],
      default: 'generating',
    },
    finalBrief: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // set when an admin/developer picks up the project
    },
  },
  {
    timestamps: true,
  }
);

// Convenience helper used by route handlers before allowing another tweak
projectSchema.methods.canTweak = function () {
  return this.tweaksUsed < 5 && this.status === 'reviewing';
};

module.exports = mongoose.model('Project', projectSchema);