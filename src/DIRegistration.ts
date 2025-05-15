import 'reflect-metadata';
import { Container } from 'inversify';
import IPlayerService, { PlayerService } from './services/PlayerService';
import logger from './services/LoggingService';

const TYPES = {
  IPlayerService: Symbol.for('IPlayerService'),
};

const container = new Container();

// component bindings
container.bind<IPlayerService>(TYPES.IPlayerService).to(PlayerService);
// container.bind<IProvidr<string>>("nameProvider").to(NameProvider);

logger.info('registrations done', container);

export { container, TYPES };
