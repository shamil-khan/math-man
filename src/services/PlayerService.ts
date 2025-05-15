import { db, Player } from '../database/db';
import { injectable } from 'inversify';
import logger from './LoggingService';

interface IPlayerService {
  all(): Promise<Player[]>;
  single(playerId: number): Promise<Player | undefined>;
  add(player: Player): Promise<void>;
  update(player: Player): Promise<void>;
  delete(playerId: number): Promise<void>;
}

@injectable()
class PlayerService implements IPlayerService {
  name = 'player-service';

  public async all(): Promise<Player[]> {
    logger.debug('iplayer-service all');
    return await db.players.toArray();
  }

  public single = async (playerId: number): Promise<Player | undefined> => {
    return await db.players.get(playerId);
  };

  public add = async (player: Player) => {
    const found = await db.players
      .where('name')
      .equalsIgnoreCase(player.name)
      .first();
    if (found) {
      logger.debug('found', found);
      throw new Error(`Player cannot be created because player ${player.name} is already exists.`);
    }
    await db.players.add(player);
  };

  public update = async (player: Player) => {
    const id = await db.players.update(player.id, player);
    if (id === 0) {
      throw new Error(`Player cannot be updated because player-id: ${player.id} does not exists.`);
    }
    logger.debug('updated', id);
  };

  public delete = async (playerId: number) => {
    const player = await this.single(playerId);

    if (player === undefined) {
      throw new Error(`Player cannot be deleted because player-id: ${playerId} does not exists.`);
    }
    await db.players.delete(playerId);
  };
}

export { PlayerService };
export default IPlayerService;
