const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    Balance: {
        type: Number,
        default: 0
    },
    Transactions: [
        {
            TransactionID: {
                type: String,
                required: true
            },
            Type: {
                type: String,
                required: true
            },
            Amount: {
                type: Number,
                required: true
            },
            Status: {
                type: String,
                enum: ['pending', 'completed', 'failed'],
                default: 'pending'
            }
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);
