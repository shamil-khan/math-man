import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import TableIcon from '@mui/icons-material/TableRowsRounded';
import SquareRootIcon from './IconComponents/SquareRootIcon';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Branding, type Navigation } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internal';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import MathManIcon from './assets/images/math-man-icon.png';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'addition-page',
    title: 'Addition',
    icon: <span>+</span>,
  },
  {
    segment: 'subtraction-page',
    title: 'Subtraction',
    icon: <span>−</span>,
  },
  {
    segment: 'multiplication-page',
    title: 'Multiplication',
    icon: <span>×</span>,
  },
  {
    segment: 'division-page',
    title: 'Division',
    icon: <span>÷</span>,
  },
  {
    segment: 'table-page',
    title: 'Table',
    icon: <TableIcon />,
  },
  {
    segment: 'square-value-page',
    title: 'Square Value',
    icon: (
      <span>
        X<sup>2</sup>
      </span>
    ),
  },
  {
    segment: 'cubic-value-page',
    title: 'Cubic Value',
    icon: (
      <span>
        X<sup>3</sup>
      </span>
    ),
  },
  {
    segment: 'square-root-page',
    title: 'Square Root',
    icon: <SquareRootIcon />,
  },
  {
    segment: 'cubic-root-page',
    title: 'Cubic Root',
    icon: (
      <span>
        <sup>3</sup>
        <SquareRootIcon />
      </span>
    ),
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
    children: [
      {
        segment: 'local-players',
        title: 'Local Players',
        icon: <PersonAddAlt1Icon />,
      },
      {
        segment: 'game-settings',
        title: 'Game Settings',
        icon: <PersonAddAlt1Icon />,
      },
    ],
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
  const branding: Branding = {
    title: 'Math Man',
    logo: <img src={MathManIcon} alt="Math Man" />,
  };

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={branding}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}
