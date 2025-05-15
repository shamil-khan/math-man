import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { container, TYPES } from '../DIRegistration';
import { Player } from '../database/db';
import type IPlayerService from '../services/PlayerService';
import logger from '../services/LoggingService';

export default class HomePage extends React.Component {
  private readonly playerService: IPlayerService;

  constructor(props: object) {
    super(props);
    this.playerService = container.get<IPlayerService>(TYPES.IPlayerService);
  }

  createPlayer = async () => {
    const player: Player = {
      name: 'Shamikh',
    };
    await this.playerService.add(player);
    logger.debug('added player', player);
  };

  getAllPlayers = async () => {
    const players = await this.playerService.all();
    logger.debug('Players', players);
  };

  updatePlayer = async () => {
    const player: Player = {
      id: 2,
      name: 'Jamail',
    };
    await this.playerService.update(player);
    logger.debug('updated player', player);
  };

  deletePlayer = async () => {
    const playerId = 1;
    await this.playerService.delete(playerId);
    logger.debug('deleted player', playerId);
  };

  singlePlayer = async () => {
    const playerId = 2;
    const player = await this.playerService.single(playerId);
    logger.debug('single player', player);
  };

  render() {
    return (
      <div>
        <Typography>Hello Dashboard</Typography>
        <Button variant="outlined" onClick={this.getAllPlayers}>
          Get All
        </Button>
        <Button variant="outlined" onClick={this.createPlayer}>
          Create
        </Button>
        <Button variant="outlined" onClick={this.updatePlayer}>
          Update
        </Button>
        <Button variant="outlined" onClick={this.deletePlayer}>
          Delete
        </Button>
        <Button variant="outlined" onClick={this.singlePlayer}>
          Single
        </Button>
      </div>
    );
  }
}
