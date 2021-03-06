// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import Cors from "cors";
import initMiddleware from "../../utils/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, and OPTIONS
    methods: ["GET", "OPTIONS"],
  })
);

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

  // need to verify the necessity of this
  await cors(req, res);

  await axios.get(url).then(({ data }) => {
    res.status(200).json({ data });
  });
};
