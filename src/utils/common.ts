import crypto from 'crypto';
import {HouseType} from '../types/house-type.enum.js';
import {Offer} from '../types/offer.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [name, description, postDate, city, previewImage, images,
    premium, rating, houseType, roomAmount, guestAmount, price,
    facilities, commentsAmount, userName, email,
    avatar, password, userType, coordinate] = tokens;

  return {
    name,
    description,
    postDate: new Date(postDate),
    city: JSON.parse(city),
    previewImage,
    images: images.split(';'),
    premium: Boolean(premium),
    rating: parseInt(rating, 10),
    houseType: HouseType[houseType as 'apartment' | 'house' | 'room' | 'hotel'],
    roomAmount: parseInt(roomAmount, 10),
    guestAmount: parseInt(guestAmount, 10),
    price: parseInt(price, 10),
    facilities: facilities.split(';'),
    author: {
      name: userName,
      email,
      avatar,
      password,
      type: userType as 'Common' | 'Pro'
    },
    commentsAmount: parseInt(commentsAmount, 10),
    coordinate: JSON.parse(coordinate)
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string) => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
}
