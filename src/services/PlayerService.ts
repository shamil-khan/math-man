import { db, Player } from '../database/db';
import { injectable } from 'inversify';
import logger from './LoggingService';

interface IPlayerService {
  all(): Promise<Player[]>;
  single(id: number): Promise<Player | undefined>;
  add(player: Player): Promise<void>;
  update(id: number, player: Player): Promise<void>;
  delete(id: number): Promise<void>;
}

@injectable()
class PlayerService implements IPlayerService {
  name = 'player-service';

  public async all(): Promise<Player[]> {
    logger.debug('iplayer-service all');
    return await db.players.toArray();
  }

  public async single(id: number): Promise<Player | undefined> {
    return await db.players.get(id);
  }

  public async add(player: Player) {
    await db.players.add(player);
  }

  public async update(id: number, player: Player) {
    await db.players.update(id, player);
  }

  public async delete(id: number) {
    await db.players.delete(id);
  }
}

export { PlayerService };
export default IPlayerService;
