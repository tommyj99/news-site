import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

// This is an SWR hook that can be used in any component when imported
/*------------------------------------------------------------------*/

export default function useNews(params) {
  const { mainChoice, secondaryChoice, date } = params;

  let url = "";

  if (mainChoice === "everything") {
    url = `https://newsapi.org/v2/${mainChoice}?q=${secondaryChoice}&sortBy=relevency&language=en&from=${date}&apiKey=${process.env.NEWS_KEY}`; // process.env.REACT_APP_NEWS_API_KEY2
  } else {
    url = `https://newsapi.org/v2/${mainChoice}?language=en&from=${date}&apiKey=${process.env.NEWS_KEY}`; // process.env.REACT_APP_NEWS_API_KEY2
  }

  const { data, error } = useSWR(
    url,
    //`api/server?mainchoice=${mainChoice}&secondarychoice=${secondaryChoice}&date=${date}`,
    fetcher
  );

  return {
    news: data,
    isLoading: !error && !data,
    isError: error === undefined ? false : true,
  };
}
