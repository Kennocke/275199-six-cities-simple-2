import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
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
import HttpError from '../../common/errors/http-error.js';
import { RequestQuery } from '../../types/request-query.type.js';
import CommentService from '../comment/comment.service.js';
import CommentResponse from '../comment/response/comment.response.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js'
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { OfferExistsMiddleware } from '../../common/middlewares/offer-exists.middleware.js'

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
        @inject(Component.LoggerInterface) logger: LoggerInterface,
        @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
        @inject(Component.CommentServiceInterface) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new OfferExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new OfferExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new OfferExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new OfferExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index({query}: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, RequestQuery>, res: Response): Promise<void> {
    const limit = query.limit && Number(query.limit);
    const offers = await this.offerService.find(limit);
    this.ok(res, fillDTO(OfferResponse, offers));
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
    const offer = await this.offerService.create(body);
    console.log(offer);
    this.ok(res, fillDTO(DetailOfferResponse, offer));
  }

  public async show({params}: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(DetailOfferResponse, offer));
  }

  public async update({params, body}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>, res: Response): Promise<void> {
    
    const updateOffer = await this.offerService.updateById(params.offerId, body);

    if(!updateOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferResponse, updateOffer));
  }

  public async delete({params}: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.deleteById(offerId);

    this.noContent(res, offer);
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, Record<string, unknown>>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const comments = await this.commentService.findByOfferId(offerId);
    
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
