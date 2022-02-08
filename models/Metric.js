import mongoose, {Schema} from 'mongoose'

const MetricSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  apr: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  }
}, { collection: 'metric' })

export default mongoose.models.Metric || mongoose.model('Metric', MetricSchema)
