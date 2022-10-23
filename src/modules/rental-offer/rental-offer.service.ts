import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import { RentalOfferServiceInterface } from './rental-offer.interface.js';
import { RentalOfferEntity } from './rental-offer.entity.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import CreateRentalOfferDto from './dto/create-rental-offer.dto.js';

injectable()
export default class RentalOfferService implements RentalOfferServiceInterface {
    constructor(
        @inject(Component.LoggerInterface) private logger: LoggerInterface,
        @inject(Component.RentalOfferModel) private readonly rentalOfferModel: types.ModelType<RentalOfferEntity>
    ) {}

    public async create(dto: CreateRentalOfferDto): Promise<DocumentType<RentalOfferEntity>> {
        const result = await this.rentalOfferModel.create(dto);
        this.logger.info(`New rental offer: ${result.name}`);

        return result;
    }

    public async findById(rentalOfferId: string): Promise<DocumentType<RentalOfferEntity> | null> {
        return this.rentalOfferModel.findById(rentalOfferId).exec();
    }
}