//constant variable named puppeteer: puppeteer is installed
const puppeteer = require('puppeteer');

//the url of the product that will the code will redirect page to
//best buy product: "https://www.bestbuy.com/site/sony-alpha-7s-iii-full-frame-mirrorless-camera-body-only/6423589.p?skuId=6423589";
//best buy selectItem: "button[class='btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button']";
//best buy checkout: "button[class='btn btn-lg btn-block btn-primary']";
const product_url = "https://www.walmart.com/ip/Sony-Alpha-a7S-III-Mirrorless-Digital-Camera-Body-with-2X-Sony-256GB-SF-M-T2-UHS-II-SDXC-Memory-Cards/158183972";
const selectItem = "button[class='button spin-button prod-ProductCTA--primary button--primary']";
const chkt = "button[class='button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary']";
const account = "button[data-automation-id='new-guest-continue-button']";
const shipping = "button[data-automation-id='fulfillment-continue']";
const account2 = 'button m-margin-top width-full button--primary';
const shipping2 = 'button cxo-continue-btn button--primary';
const firstNameField = "input[id='firstName']";
const firstName = 'Jack';
const lastNameField = "input[id='lastName']";
const lastName = 'Johnson';
const addressField = "input[id='addressLineOne']";
const address = "123 Main Street";
const phoneField = '#phone';
const phone = '4253948608';
const emailField = '#email';
const email = 'jackjohnson@gmail.com';
const cityField = "input[id='city']";
const city = "New York City";
const zipField = "input[id='postalCode']";
const zip = '10307';

async function givePage(){ //function givePage: user can interact with
    //headlessTrue means you won't see browser popup aka quicker + you see the BTS
    //headlessFalse means you see the browser popup: used when testing the browser
    const browser = await puppeteer.launch({headless: false});

    //creates a new variable called page which makes new page in browser
    const page = await browser.newPage();

    //opens Chromium Chrome and opens the website specified at product_url
    await page.goto(product_url);

    //check step when setting headless to true on line 11
    console.log('done');

    //return the page once it goes to the url
    return page; 
}

//addToCart is option1 from viewing an item all the way to adding it to cart: MORE RELIABLE BECAUSE BRINGS MINIMAL WALMART ERRORS
async function addToCart(page){
    await page.goto(product_url); //redirects to the product url

    //reduces bugs by waiting for your code to fully render
    // EXTRANEOUS: await page.waitForSelector("button[class='button spin-button prod-ProductCTA--primary button--primary']", elem => elem.click());
    await page.waitForSelector(selectItem);

    //the bot will click this element on the product url page
    // EXTRANEOUS: await page.click("button[class='button spin-button prod-ProductCTA--primary button--primary']", elem => elem.click());
    await page.click(selectItem, elem => elem.click());

    //waits for the page to load: EXTRA safety
    await page.waitForNavigation();

    //waits for page to load (slower than page.waitForNavigation)
    // EXTRANEOUS: await page.waitforSelector(chkt);

    //the bot will click this element on the checkout page
    await page.click(chkt, elem => elem.click());

    //waits for the page to load: EXTRA safety
    await page.waitForNavigation();

    //a quick 1 second delay for the page to fully load: EXTRA safety
    await page.waitFor(1000);

    //the bot will click this element on the "continue without account" page
    await page.click(account, elem => elem.click());

    //waits for the page to load: EXTRA safety
    await page.waitForNavigation();

    //a quick 1 second delay for the page to fully load: EXTRA safety
    await page.waitFor(1000);

    //the bot will click this element on the shipping page
    await page.click(shipping, elem => elem.click());
}

//addToCart2 is option2 from viewing an item all the way to adding it to cart: LESS RELIABLE BECAUSE BRINGS WALMART ERRORS
async function addToCart2(page){
    await page.goto(product_url); //redirects to the product url

    //reduces bugs by waiting for your code to fully render
    await page.waitForSelector(selectItem);

    //the bot will click this element on the product url page
    await page.click(selectItem, elem => elem.click());

    //waits for the page to load: EXTRA safety
    await page.waitForNavigation();

    //the bot will click this element on the checkout page --> ($eval is the same thing as page.click)
    await page.$eval(chkt, elem => elem.click());

    //waits for the page to load: EXTRA safety
    await page.waitForNavigation();

    //a quick 1 second delay for the page to fully load: EXTRA safety
    await page.waitFor(2000);

    //waits for the page to LOAD COMPLETELY and then clicks the first button on the page: account2
    //EXTRANEOUS: await page.evaluate(() => document.getElementsByClassName(account2)[0].click());
    await page.evaluate(() => document.getElementsByClassName('button m-margin-top width-full button--primary')[0].click());

    //waits for the page to load: EXTRA safety
    await page.waitForNavigation();

    //a quick one second delay for the page to fully load: EXTRA safety
    await page.waitFor(1000);

    //waits for the page to LOAD COMPLETELY and then clicks the first button on the page: shipping2
    // EXTRANEOUS: await page.evaluate(() => document.getElementsByClassName(shipping2)[0].click());
    await page.evaluate(() => document.getElementsByClassName('button cxo-continue-btn button--primary')[0].click());
}

async function fillBilling(page){
    
    await page.waitFor(1000);     //wait 1 second for the page to fully load
    await page.type(firstNameField, firstName);    //First Name Field
    await page.waitFor(200);     //wait 200 milliseconds for the page to fully load
    await page.type(lastNameField, lastName);    //Last Name Field
    await page.waitFor(200);     //wait 200 milliseconds for the page to fully load
    await page.type(addressField, address);    //Address Field
    await page.waitFor(200);     //wait 200 milliseconds for the page to fully load
    await page.type(phoneField, phone);    //Phone Number Field
    await page.waitFor(200);     //wait 200 milliseconds for the page to fully load
    await page.type(emailField, email);    //Email Field
    await page.waitFor(200);     //wait 200 milliseconds for the page to fully load
    const input = await page.$(cityField); //indentifies the city Field
    await input.click({clickCount:3}); //clicks the field 3 times to select autofilled city based on geolocation
    await input.type(city);     //deletes autofilled city and replaces with defined city
    await page.waitFor(200);     //wait 200 milliseconds for the page to fully load
    const input2 = await page.$(zipField); //indentifies the zip code Field
    await input2.click({clickCount:3}); //clicks the field 3 times to select autofilled zip code based on geolocation
    await input2.type(zip);     //deletes autofilled zip code and replaces with defined zip code
    await page.waitFor(200);
    // await page.type("input[id='state']", 'NY');

    // await input3.click({clickCount:1});
    await page.waitForNavigation();
    // const input3 = await page.$("button[class='field-input field-input--primary']", elem => elem.click());
    const input3 = await page.$("button [data-automation-id='address-form-state']", elem => elem.click());
    // await page.click("button [data-automation-id='address-form-state']");
    // await page.waitForSelector("button[class='field-input field-input--primary']");
    // await page.click("button[class='field-input field-input--primary']", elem => elem.click());
    await input3.type('NY');
}

async function checkout(){ //master method that calls everything else
    
    //create a page object
    var page = await givePage();
    
    //add the 'page' object into a function called addToCart as a parameter
    await addToCart(page);

    //add the 'page' object into a function called fillBilling as a parameter
    await fillBilling(page);
}

checkout();