import { useState, useEffect } from "react";
import LoadingHome from "../../components/LoadingSpinner/LoadingHome";
import CardContainer from "../../components/cardsContainer/CardContainer";
import SeasonsNavigation from "../../components/NavigationBars/SeasonsNavigation";
import { Box } from "@mui/material";
import { getCurrentSeason } from "../../components/Functions/GetCurrentSeason";
import { QuerySeason, QueryOptions } from "../../components/Functions/Query";

function SpringPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedDataTV, setLoadedDataTV] = useState([]);
  const [loadedDataTV_SHORT, setLoadedDataTV_SHORT] = useState([]);
  const [loadedDataMOVIE, setLoadedDataMOVIE] = useState([]);
  const [loadedDataOVA, setLoadedDataOVA] = useState([]);
  const [loadedDataONA, setLoadedDataONA] = useState([]);

  var season = getCurrentSeason();
  var today = new Date();
  var month = today.getMonth();
  var status = "";
  var movie_status = "";

  if (season === "SPRING" && month <= 4 && month > 2) {
    status = "RELEASING";
    movie_status = "NOT_YET_RELEASED";
  } else if (season === "SPRING" && month <= 4 && month === 3) {
    status = "NOT_YET_RELEASED";
    movie_status = "NOT_YET_RELEASED";
  } else {
    status = "NOT_YET_RELEASED";
    movie_status = "NOT_YET_RELEASED";
  }

  var query = QuerySeason(season, status, movie_status);
  var url = "https://graphql.anilist.co";
  var options = QueryOptions(query);

  useEffect(() => {
    setIsLoading(true);
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const TV_ITEMS = [];
        const TV_SHORT_ITEMS = [];
        const MOVIE_ITEMS = [];
        const OVA_ITEMS = [];
        const ONA_ITEMS = [];

        for (const [key, value] of Object.entries(
          data["data"]["TV_media"]["media"]
        )) {
          const TV_ITEM = {
            id: key,
            ...value,
          };
          TV_ITEMS.push(TV_ITEM);
        }
        setLoadedDataTV(TV_ITEMS);

        for (const [key, value] of Object.entries(
          data["data"]["TV_SHORT_media"]["media"]
        )) {
          const TV_SHORT_ITEM = {
            id: key,
            ...value,
          };
          TV_SHORT_ITEMS.push(TV_SHORT_ITEM);
        }
        setLoadedDataTV_SHORT(TV_SHORT_ITEMS);

        for (const [key, value] of Object.entries(
          data["data"]["MOVIE_media"]["media"]
        )) {
          const MOVIE_ITEM = {
            id: key,
            ...value,
          };
          MOVIE_ITEMS.push(MOVIE_ITEM);
        }
        setLoadedDataMOVIE(MOVIE_ITEMS);

        for (const [key, value] of Object.entries(
          data["data"]["OVA_media"]["media"]
        )) {
          const OVA_ITEM = {
            id: key,
            ...value,
          };
          OVA_ITEMS.push(OVA_ITEM);
        }
        setLoadedDataOVA(OVA_ITEMS);

        for (const [key, value] of Object.entries(
          data["data"]["ONA_media"]["media"]
        )) {
          const ONA_ITEM = {
            id: key,
            ...value,
          };
          ONA_ITEMS.push(ONA_ITEM);
        }
        setLoadedDataONA(ONA_ITEMS);

        setIsLoading(false);
      });
  }, [season]);

  if (
    (loadedDataTV.length &&
      loadedDataTV_SHORT.length &&
      loadedDataMOVIE.length &&
      loadedDataOVA.length &&
      loadedDataONA) === 0
  ) {
    return <LoadingHome />;
  }

  return (
    <Box>
      <SeasonsNavigation />
      <CardContainer title="TV" items={loadedDataTV} />
      <CardContainer title="TV SHORTS" items={loadedDataTV_SHORT} />
      <CardContainer title="MOVIES" items={loadedDataMOVIE} />
      <CardContainer title="OVA" items={loadedDataOVA} />
      <CardContainer title="ONA" items={loadedDataONA} />
    </Box>
  );
}
export default SpringPage;
