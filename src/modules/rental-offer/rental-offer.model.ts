import mongoose from 'mongoose';
import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.type.js';

export interface RentalOfferDocument extends Offer, mongoose.Document {
    createdAt: Date,
    updatedAt: Date
}

const rentalOfferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    previewImage: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    premium: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    houseType: {
        type: String,
        required: true
    },
    roomAmount: {
        type: Number,
        required: true
    },
    guestAmount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    facilities: {
        type: Array,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    commentsAmount: {
        type: Number,
        required: true
    },
    coordinate: {
        type: {
            latitude: Number,
            longitude: Number
        },
        required: true
    }
}, {
    timestamps: true
});

export const RentalOfferModel = mongoose.model<RentalOfferDocument>('RentalOffer', rentalOfferSchema);