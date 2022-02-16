import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SignInDialog from './signin-dialog';
import RegisterDialog from './register-dialog';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export interface LoginProps {
  onLogIn: () => void;
}

export default function LoginMenu({ onLogIn }: LoginProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="inherit">
        Войти
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Вход" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
            <Tab label="Регистрация" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <SignInDialog onCloseCallback={handleClose} onLoginCallback={onLogIn} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <RegisterDialog onCloseCallback={handleClose} onLoginCallback={onLogIn} />
        </TabPanel>
      </Dialog>
    </div>
  );
}
