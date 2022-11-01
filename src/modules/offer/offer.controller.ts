import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import OfferResponse from './response/offer.response.js';
import { fillDTO } from '../../utils/common.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import DetailOfferResponse from './response/detail-offer.response.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

@injectable()
export default class OfferController extends Controller {
    constructor(
        @inject(Component.LoggerInterface) logger: LoggerInterface,
        @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface
    ) {
        super(logger);

        this.logger.info('Register routes for CategoryController...');

        this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
        this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
        this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.find});
        this.addRoute({path: '/:offerId', method: HttpMethod.Put, handler: this.update});
        this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete});
    }

    public async index(_req: Request, res: Response): Promise<void> {
        const offers = await this.offerService.find();
        const offerResponse = fillDTO(OfferResponse, offers);
        this.send(res, StatusCodes.OK, offerResponse);
    }

    public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
        const result = await this.offerService.create(body);
        this.send(
            res,
            StatusCodes.CREATED,
            fillDTO(DetailOfferResponse, result)
        )
    }

    public async find(_req: Request, _res: Response): Promise<void> {
        // const result = await this.offerService.findDetail(req.query.offerId);

        // this.send(
        //     res,
        //     StatusCodes.OK,
        //     fillDTO(OfferResponse, result)
        // );
    }

    public async update({body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>, res: Response): Promise<void> {
        const result = await this.offerService.updateById(body.offerId, body);
        this.send(
            res,
            StatusCodes.OK,
            fillDTO(OfferResponse, result)
        );
    }

    public async delete({body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>, res: Response): Promise<void> {
        const result = await this.offerService.deleteById(body.offerId);
        this.send(
            res,
            StatusCodes.OK,
            fillDTO(OfferResponse, result)
        );
    }
}