import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MultiplicationIcon from '@mui/icons-material/Clear';
import getRandomValue from '../utils/math';

export default function MultiplicationPage() {
  const value1 = getRandomValue(2, 9);
  const value2 = getRandomValue(2, 9);

  return (
    <Card variant="outlined">
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography gutterBottom variant="h3" component="div">
            Multiplication Game
          </Typography>
          <Typography gutterBottom variant="h3" component="div">
            Score: 0
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This game generate two random numbers, you have to give the answer.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography gutterBottom variant="h4">
            {value1}
          </Typography>
          <MultiplicationIcon sx={{ alignItems: 'center' }} />
          <Typography gutterBottom variant="h4">
            {value2}
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={5} sx={{ alignItems: 'center' }}>
          <TextField
            required
            id="outlined-required"
            label="Answer"
            defaultValue=""
          />

          <Button variant="outlined">Next</Button>
        </Stack>
      </Box>
    </Card>
  );
}
