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
    logger.debug('home-page', this.playerService);
  }

  createPlayer = async () => {
    const player: Player = {
      name: 'Shamikh',
    };
    await this.playerService.add(player);
  };

  getAllPlayers = async () => {
    const players = await this.playerService.all();
    logger.debug('Players', players);
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
      </div>
    );
  }
}
