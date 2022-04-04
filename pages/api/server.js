// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async (req, res) => {
  let mainChoice = req.query.mainchoice;
  let secondaryChoice = req.query.secondarychoice;
  let date = req.query.date;
  let url = "";

  if (mainChoice === "everything") {
    url = `https://newsapi.org/v2/${mainChoice}?q=${secondaryChoice}&sortBy=relevency&language=en&from=${date}&apiKey=${process.env.NEWS_KEY}`; // process.env.REACT_APP_NEWS_API_KEY2
  } else {
    url = `https://newsapi.org/v2/${mainChoice}?language=en&from=${date}&apiKey=${process.env.NEWS_KEY}`; // process.env.REACT_APP_NEWS_API_KEY2
  }

  await axios.get(url).then(({ data }) => {
    res.status(200).json({ data });
  });
};
