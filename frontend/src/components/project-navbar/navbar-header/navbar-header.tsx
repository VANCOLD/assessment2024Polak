import { Box, Typography } from "@mui/material";

export default function NavbarHeader({navbarTitle} : {navbarTitle : string}) {

    return (
        <Box>
            <Typography variant="h6" align="left" sx={{ flexGrow: 1 }}>
                {navbarTitle}
            </Typography>
        </Box>
    )
}