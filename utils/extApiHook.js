import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

// This is an SWR hook that can be used in any component when imported
/*------------------------------------------------------------------*/

export default function useNews(params) {
  const { mainChoice, secondaryChoice, date } = params;

  const { data, error } = useSWR(
    `https://api-relay-tommyj.herokuapp.com/api/news?mainchoice=${mainChoice}&secondarychoice=${secondaryChoice}&date=${date}`,
    fetcher
  );

  return {
    news: data,
    isLoading: !error && !data,
    isError: error === undefined ? false : true,
  };
}
