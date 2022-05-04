import puppeteer from "puppeteer";
import xpath from "xpath"
import { DOMParser } from "xmldom";




(async () => {
  const browser = puppeteer.launch({ headless: true });
  
  const page = await (await browser).newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
   );

  await page.goto(
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
  );

  await page.waitForXPath('//section//h3');
 

  const bodyHTML = await page.evaluate(() => document.body.innerHTML);



    const doc = new DOMParser().parseFromString(bodyHTML);


    // Ziel-Xpath
    const nodes = xpath.select('//section//h3', doc);


    // Array erstellung
    const parseStrongText = nodes.map( (node) => {
    
      if (node.lastChild.firstChild !== null)
    return node.lastChild.firstChild.data
    
    });

    console.log(parseStrongText, "\n\n")

 

 


  

  //  Array-Elemente mit Nummer zur Laufzeit zu finden



    if (process.argv[2]) {

      if(!isNaN(process.argv[2])) {

      console.log(`\n Array Element at Number ${process.argv[2]}: ${parseStrongText[process.argv[2]]} \n`);  

    } else {
     
      const arrayEl = parseStrongText.filter(element => element.toLowerCase().includes(process.argv[2].toLowerCase()))
      console.log(arrayEl)
      }
    
  }
    

    await (await browser).close();
})();