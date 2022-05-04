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

  await page.waitForXPath("//strong//code");
 

  const bodyHTML = await page.evaluate(() => document.body.innerHTML);



    const doc = new DOMParser().parseFromString(bodyHTML);


    // Ziel-Xpath
    const nodes = xpath.select("//strong//code", doc);


    //Array erstellung
    const parseStrongText = nodes.map((node) => {
    
         return node.childNodes[0].data;
    
    });

  
    //Array-Elemente mit Nummer zur Laufzeit zu finden

    if (process.argv[2]) {

      console.log(`\n Array Element at Number ${process.argv[2]}: ${parseStrongText[process.argv[2]]} \n`);  

    } else {
      
      console.log(`\n\n Array Length: ${parseStrongText.length} \n`);


      //Zugriff auf ein Array element (mit index)
  
      const first = parseStrongText[0];
  
      const last = parseStrongText[parseStrongText.length - 1];
  
      console.log(`First: ${first} \n`);
      console.log(`Last: ${last} \n`);
  
  
  
      //Über ein Array Iterieren
  
      parseStrongText.forEach((el, i) => console.log(`${el} ${i}`) );
  
    
    }

    await (await browser).close();
})();