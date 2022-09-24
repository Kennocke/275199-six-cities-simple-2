import {readFileSync} from 'fs';
import {FileReaderInterface} from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf8'});
  }

  public toArray(): { name: string; description: string }[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([name, description, postDate, city, previewImage, images,
        premium, rating, houseType, roomAmount, guestAmount, price,
        facilities, author, commentsAmount, coordinate]) => ({
        name,
        description,
        postDate: new Date(postDate),
        city,
        previewImage,
        images: images.split(','),
        premium,
        rating,
        houseType,
        roomAmount,
        guestAmount,
        price,
        facilities: facilities.split(','),
        author,
        commentsAmount,
        coordinate: JSON.parse(coordinate)
      }));
  }
}
