import 'reflect-metadata';
import {Container} from 'inversify';
import { types } from '@typegoose/typegoose';
import {LoggerInterface} from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import {Component} from './types/component.types.js';
import {ConfigInterface} from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import Application from './app/application.js';
import DatabaseService from './common/database-client/database.service.js';
import { DatabaseIntreface } from './common/database-client/database.interface.js';
import UserService from './modules/user/user.service.js';
import { UserServiceInterface } from './modules/user/user-service.interface.js';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { RentalOfferServiceInterface } from './modules/rental-offer/rental-offer.interface.js';
import { RentalOfferEntity, RentalOfferModel } from './modules/rental-offer/rental-offer.entity.js';
import RentalOfferService from './modules/rental-offer/rental-offer.service.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseIntreface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<RentalOfferServiceInterface>(Component.RentalOfferServiceInterface).to(RentalOfferService);
applicationContainer.bind<types.ModelType<RentalOfferEntity>>(Component.RentalOfferModel).toConstantValue(RentalOfferModel);


const application = applicationContainer.get<Application>(Component.Application);
await application.init();