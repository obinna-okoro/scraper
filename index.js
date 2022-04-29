import puppeteer from "puppeteer";

(async () => {
  const browser = puppeteer.launch({ headless: false });
  const page = await (await browser).newPage();
  await page.goto(
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
  );
  const grabBoldText = await page.evaluate(() => {
    const strongTag = document.querySelectorAll("strong");
    let text = [];
    strongTag.forEach((word) => text.push(word.innerText));
    return text;
  });

  console.log(grabBoldText);
  await (await browser).close();
})();
