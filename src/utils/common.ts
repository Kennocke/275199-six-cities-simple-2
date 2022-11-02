import crypto from 'crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import {HouseType} from '../types/house-type.enum.js';
import {Offer} from '../types/offer.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, city, previewImagePath, imagePaths,
    premium, rating, houseType, roomAmount, guestAmount, price,
    facilities, commentsAmount, userName, email,
    avatarPath, password, userType, coordinate] = tokens;

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: JSON.parse(city),
    previewImagePath,
    imagePaths: imagePaths.split(';'),
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
      avatarPath,
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
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message
});
