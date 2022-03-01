import {
  Typography,
  CardMedia,
  createTheme,
  ThemeProvider,
  Box,
  Stack,
} from "@mui/material";
import { mainTheme } from "../Theme/mainTheme";
import GenresChip from "../Chip/GenresChip";
import classes from "./Scroll.module.css";
let theme = createTheme({
  components: {
    MuiCardMedia: {
      styleOverrides: {
        root: {
          width: "10vw",
        },
      },
    },
  },
});

function CardView(props) {
  return (
    <ThemeProvider theme={theme}>
      {(props.items || []).map((item) => (
        <Box
          position="relative"
          key={item.id}
          sx={{
            display: "flex",
            margin: "2vw",
          }}
        >
          <Box
            sx={{
              float: "left",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                image={item.coverImage.large}
                height="260vh"
                width="10vw"
                display="flex"
                sx={{ borderTopLeftRadius: "20%" }}
              />
            </Box>
            <Box
              width="10vw"
              height="10vh"
              position="absolute"
              top="19.2vh"
              backgroundColor="rgba(0, 0, 0, 0.7) "
            >
              <Typography
                color={"white"}
                paddingTop="2px"
                paddingLeft="4px"
                paddingRight="2px"
                variant="body1"
              >
                {item.title.romaji}
              </Typography>
            </Box>
          </Box>
          <Box
            backgroundColor={mainTheme.palette.primary.light}
            width="10vw"
            sx={{
              borderBottomRightRadius: "16px",
              borderTopRightRadius: "10px",
            }}
          >
            <Box
              className={classes.scroll}
              float="left"
              width="10vw"
              sx={{
                flexGrow: 1,
                flexDirection: "column",
                height: "22vh",
                maxHeight: "250vh",
                display: "flex",
                marginBottom: "1vh",
              }}
            >
              <Typography
                color={"white"}
                fontSize="12px"
                variant="body2"
                dangerouslySetInnerHTML={{ __html: item.description }}
                padding="1vh"
              ></Typography>
            </Box>
            <Stack
              className={classes.scroll}
              alignItems={"center"}
              spacing={1}
              padding={1}
              sx={{
                borderBottomRightRadius: "10px",
                flexGrow: 1,
                flexDirection: "column",
                height: "5vh",
                justifyItems: "flex-start",
              }}
              width={"100%"}
              backgroundColor={mainTheme.palette.primary.light}
            >
              <GenresChip items={item.genres} />
            </Stack>
          </Box>
        </Box>
      ))}
    </ThemeProvider>
  );
}
export default CardView;
