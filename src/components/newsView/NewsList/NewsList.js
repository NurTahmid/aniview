import { Box, Typography } from "@mui/material";
import { mainTheme } from "../../Theme/mainTheme";
import { useContext } from "react";
import { NewsContext } from "../../../pages/HomePage";
import React from "react";
import Button from "@mui/material/Button";

function NewsList() {
  const { data, set } = useContext(NewsContext);
  const index1 = 12345;

  return (
    

    <Box
      height="70vh"
      width="20%"
      marginRight="1.5vw"
      display="flex"
      flexDirection="column"
    >
      <Box
        id={index1}
        borderRadius="0.6rem"
        maxHeight="100%"
        overflow="auto"
        backgroundColor={mainTheme.palette.primary.light}
        onMouseLeave={() => {
          var wow = document.getElementById(index1);
          wow.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            var clickedItem = e.target.id;
            var k = document.getElementById(clickedItem);
            console.log(k);
            var c = document.getElementById(index1).childNodes;
            for (var i = 0; i < c.length; i++) {
              if (c[i] !== k) c[i].style.color = "white";
            }
            k.style.color = "pink";
          }
        }}
      >
        {(data || []).map((item, index) => (
          <Typography
            sx={{
              borderBottom: 1,
              borderWidth: "3px",
              borderColor: "#9B59B6",
            }}
            component={Button}
            fontSize="15px"
            id={index}
            key={index}
            onClick={() => {
              set(data[index]);
            }}
            width="100%"
            color="white"
            padding="0.6rem"
          >
            {item.title}
          </Typography>
        ))}
      </Box>
    </Box>
    
  );
}
export default NewsList;
