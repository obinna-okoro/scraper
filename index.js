import puppeteer from "puppeteer";
import xpath from "xpath"
import { DOMParser } from "xmldom";

(async () => {
  const browser = puppeteer.launch({ headless: true });
  const page = await (await browser).newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
   )

  await page.goto(
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
  );

  await page.waitForXPath("//strong")
 

  const bodyHTML = await page.evaluate(() => document.body.innerHTML);



    const doc = new DOMParser().parseFromString(bodyHTML)
    const nodes = xpath.select("//strong", doc);

  const parseStrongText = nodes.map((node) => {
      if(node.childNodes[0].childNodes) {
            return node.childNodes[0].childNodes[0].data;
        }


        return node.childNodes[0].data;

    })

  const allStrongText = parseStrongText.filter((element) => element !== undefined )

  allStrongText.forEach((data, i) => console.log(`${data} ${i} \n`) )

  console.log(`Length of Array: ${allStrongText.length} \n\n`)

  
  if (process.argv[2]) {
      console.log(`${allStrongText[process.argv[2]]}  ${allStrongText.indexOf(allStrongText[process.argv[2]])}`)  
    }

  await (await browser).close();
})();