import {HouseType} from './house-type.enum.js';
import {Facilities} from './facilities.enum.js';
import {User} from './user.type.js';
import {City} from './city.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImagePath: string;
  imagePaths: string[];
  premium: boolean;
  rating: number;
  houseType: HouseType;
  roomAmount: number;
  guestAmount: number;
  price: number;
  facilities: Facilities[];
  author: User;
  commentsAmount: number;
  coordinate: {
    latitude: number;
    longitude: number;
  }
}
