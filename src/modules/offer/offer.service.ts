import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';

const MAX_COMMENTS = 60;

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
        @inject(Component.LoggerInterface) private logger: LoggerInterface,
        @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New rental offer: ${result.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .exec();
  }

  public async find(limit: number = MAX_COMMENTS):Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: {offerId: '$_id'},
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$offerId', '$$offerId']
                  }
                }
              },
              {
                $project: {
                  _id: 1
                }
              }
            ],
            as: 'comments'
          }
        },
        {
          $addFields: {
            commentCount: {
              $size: '$comments'
            }
          }
        },
        {
          $limit: limit
        },
        {
          $sort: {
            postDate: SortType.Down
          }
        },
      ])
      .exec();
  }

  //Список возвращаемых полей предложения: стоимость аренды, название, тип жилья, дата публикации, город, превью изображения, флаг «Премиум», рейтинг, количество комментариев.

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async findDetail(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }
}
