import {City} from './city.type.js';
import {Facilities} from './facilities.enum.js';
import {Coordinate} from './coordinate.type.js';

export type MockData = {
  names: string[];
  descriptions: string[];
  cities: City[];
  previewImages: string[];
  images: string[];
  houseTypes: string[];
  facilities: Facilities[];
  userNames: string[];
  emails: string[];
  avatars: string[];
  passwords: string[];
  userTypes: string[];
  coordinates: Coordinate[];
}
