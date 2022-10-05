import dayjs from 'dayjs';
import {OfferGeneratorInterface} from './offer-generator.interface.js';
import {MockData} from '../../types/mock-data.type.js';
import {
  getRandomItems,
  getRandomItem,
  generateRandomFlag,
  generateRandomValue
} from '../../utils/random.js';
import {City} from '../../types/city.type.js';
import {Coordinate} from '../../types/coordinate.type.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY),'day').toISOString();
    const city = JSON.stringify(getRandomItem<City>(this.mockData.cities));
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const premium = generateRandomFlag();
    const rating = generateRandomValue(1, 5);
    const houseType = getRandomItem<string>(this.mockData.houseTypes);
    const roomAmount = generateRandomValue(1, 8);
    const guestAmount = generateRandomValue(1, 10);
    const price = generateRandomValue(100, 100000);
    const facilities = getRandomItems<string>(this.mockData.facilities).join(';');
    const commentsAmount = generateRandomValue(1, 25);
    const userName = getRandomItem<string>(this.mockData.userNames);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const coordinate = JSON.stringify(getRandomItem<Coordinate>(this.mockData.coordinates));

    return [
      name, description, postDate, city, previewImage, images,
      premium, rating, houseType, roomAmount, guestAmount,
      price, facilities, commentsAmount, userName, email, avatar,
      password, userType, coordinate
    ].join('\t');
  }
}
