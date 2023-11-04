import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import {options} from "../helper/util/logger";
const fs = require("fs-extra");

let page: Page;
let browser:Browser;
let context:BrowserContext;

// BeforeAll(async function () {
//   browser = await chromium.launch({headless: false});  
// });
BeforeAll(async function () {
  getEnv();
  browser= await invokeBrowser();  
})

Before(async function({pickle}){
    const scenarioName=pickle.name + pickle.id;
    context=await browser.newContext({
      recordVideo:{
        dir:"test-results/videos",
      },
    });  
    page = await context.newPage();
    pageFixture.page = page;
    pageFixture.logger=createLogger(options(scenarioName))

  });
 
// AfterStep(async function (pickle) {
//   const img =await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`});
//     this.attach(img,"image/png");
// })  

After(async function({pickle, result}){
  let videoPath: string;
  let img: Buffer;
  //attach screenshot
  console.log(result?.duration);
  console.log(result?.status);
   if(result?.status==Status.FAILED){
    img =await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`});
    videoPath=await pageFixture.page.video().path();
    
   }
    await pageFixture.page.close();
    await context.close();
    if(result?.status==Status.FAILED){
      this.attach(img,"image/png");

      this.attach(
        fs.readFileSync(videoPath),
        'video/webm'
        );

     }
    

});

AfterAll(async function() {
   await browser.close();
   
});