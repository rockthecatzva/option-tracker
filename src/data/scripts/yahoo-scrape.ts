const axios = require("axios");
import * as cheerio from "cheerio";
const fs = require("fs");

const url = `https://finance.yahoo.com/quote/SPY/options?p=SPY&date=1642723200`;

const urls = [url];
// //couldve just required the json infile
// const infile = "src/data/scripts/scraped-movie-data.json"; //"src/data/scripts/temp.json";
// const outfile = "src/data/scripts/appended-dat.json";
// const jsonData = fs.readFileSync(infile);
// const scrapedData = JSON.parse(jsonData);

// const url = "https://www.boxofficemojo.com/movies/?id=marvel2019.htm";

const scrape = async (u) => {
  const data = await axios
    .get(u)
    .then((response) => {
      const $ = cheerio.load(response.data);
      // const calls =
      //   const thumbnail = $("td a img").attr("src");
      const a = $("table tbody tr");
      console.log(
        " --- a ",
        a.toArray().map((e) => {
          console.log(" --- e ", e.children);
          debugger
        })
      );
    //   debugger;
      const table = $("table tbody tr").map((r: any) => {
        // console.log(" ---- d ", r)
        return r?.children?.map((col) => {
          const t = col?.children;
          console.log(" --- t ", t);
          return col?.children[0]?.children[0].text();
        });
      });
      debugger;
      // .eq(2)
      // .find("b")
      // .text();
      //   console.log("  - ", table);

      return {
        url: u,
        // raw: $.html()
        table,
      };
    })
    .catch((error) => console.log("There was an error", error));

  return data;
};

const writeDataFile = async (outfile, scraper) => {
  const data = await scraper;
  //   console.log(" -- data ", data);
  fs.writeFileSync(outfile, JSON.stringify(data));
};

console.log("***** STARTED");
const scraper = scrape(url);

writeDataFile("data.ts", scraper);
