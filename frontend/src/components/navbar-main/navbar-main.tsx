import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const navbarTitle = "Valemus Assessment";
const nb_headerColor = "#264653";

export default function NavbarMain() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: nb_headerColor }}>
      <Toolbar>
        <Typography variant="h6" sx={{ mr: 6 }}>
          {navbarTitle}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" sx={{fontSize:16, fontWeight:600}}  onClick={() => navigate("/finance")}>
            Finance
          </Button>
          <Button color="inherit" sx={{fontSize:16, fontWeight:600}} onClick={() => navigate("/task-planning")}>
            Task Planning
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
