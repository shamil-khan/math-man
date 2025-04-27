import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AdditionIcon from '@mui/icons-material/AddCircle';
import SubtractionIcon from '@mui/icons-material/DoNotDisturbOn';
import MultiplicationIcon from '@mui/icons-material/Cancel';
import DivisionIcon from '@mui/icons-material/PercentRounded';
import TableIcon from '@mui/icons-material/TableRowsRounded';
import SquareIcon from '@mui/icons-material/SuperscriptRounded';
import CubeIcon from '@mui/icons-material/Timer3Rounded';
import SquareRootIcon from '@mui/icons-material/LooksTwoRounded';
import CubicRootIcon from '@mui/icons-material/Looks3Rounded';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'addition',
    title: 'Addition',
    icon: <AdditionIcon />,
  },
  {
    segment: 'subtraction',
    title: 'Subtraction',
    icon: <SubtractionIcon />,
  },
  {
    segment: 'multiplication',
    title: 'Multiplication',
    icon: <MultiplicationIcon />,
  },
  {
    segment: 'division',
    title: 'Division',
    icon: <DivisionIcon />,
  },
  {
    segment: 'table',
    title: 'Table',
    icon: <TableIcon />,
  },
  {
    segment: 'square',
    title: 'Square',
    icon: <SquareIcon />,
  },
  {
    segment: 'cube',
    title: 'Cube',
    icon: <CubeIcon />,
  },
  {
    segment: 'square-root',
    title: 'Square Root',
    icon: <SquareRootIcon />,
  },
  {
    segment: 'cubic-root',
    title: 'Cubic Root',
    icon: <CubicRootIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

export default function DashboardLayoutBasic() {
  
  const router = useDemoRouter('/dashboard');

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
