import { useState } from "react";
import Axios from "axios";
import Loader from "react-loader-spinner";
import { FaQuoteRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import mainStyles from "../styles/Home.module.scss";

export default function Home() {
  const [anime, setAnime] = useState({
    anime: "",
    character: "",
    quote: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const generateQuote = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("https://animechan.vercel.app/api/random");
      // console.log(res.data);
      setAnime(res.data);
      setLoading(false);
      setError("");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={mainStyles["main-wrapper"]}>
      <div className={mainStyles["main-content"]}>
        <h1 className={mainStyles["main-title"]}>Aniquote</h1>
        <h2 className={mainStyles["main-subtitle"]}>
          Quotes by different anime characters from different anime
        </h2>
        {loading ? (
          <div className={mainStyles["loading-wrapper"]}>
            <Loader type="ThreeDots" color="#2196fe" height={30} width={80} />
            <h2 className={mainStyles["loading-content"]}>
              Preparing your quotes. Please wait warmly and have some tea. 🍵
            </h2>
          </div>
        ) : error ? (
          <div className={mainStyles["error"]}>
            <h1>{error}</h1>
          </div>
        ) : (
          <>
            <div className={mainStyles["main-button"]}>
              <button onClick={generateQuote}>Get Quotes</button>
            </div>
            {anime.quote === "" ? (
              ""
            ) : (
              <IconContext.Provider
                value={{ className: mainStyles["quote-icon"] }}
              >
                <FaQuoteRight />
              </IconContext.Provider>
            )}
            <p className={mainStyles["anime-quote"]}>{anime.quote}</p>
            <h2 className={mainStyles["anime-character"]}>{anime.character}</h2>
            <p className={mainStyles["anime-name"]}>{anime.anime}</p>
          </>
        )}
      </div>
    </div>
  );
}
