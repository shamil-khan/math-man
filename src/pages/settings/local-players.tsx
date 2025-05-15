import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Player } from '../../database/db';
import { Collection } from 'dexie';

interface LocalPlayersState {
  players: Collection<Player>;
  selectedPlayer: Player;
}

class LocalPlayersPage extends React.Component<any, LocalPlayersState> {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MyData[] = await response.json();
      this.setState({ data, loading: false, error: null });
    } catch (error) {
      this.setState({
        data: null,
        loading: false,
        error: (error as Error).message,
      });
    }
  }

  render(): React.ReactNode {
    return (
      <Card variant="outlined">
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="text.secondary"
            >
              Problem:
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="secondary"
            >
              Score:
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            This game generate two random numbers, you have to add them and give
            the answer.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant="h3">=</Typography>
            <TextField required id="outlined-required" label="Answer" />
          </Stack>
          <Button variant="outlined">End</Button>
        </Box>
      </Card>
    );
  }
}

export default LocalPlayersPage;
