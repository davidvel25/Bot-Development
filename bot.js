//constant variable named puppeteer: puppeteer is installed
const puppeteer = require('puppeteer');

//the url of the product that will the code will redirect page to
const product_url = "https://www.walmart.com/ip/Sony-Alpha-a7S-III-Mirrorless-Digital-Camera-Body-with-2X-Sony-256GB-SF-M-T2-UHS-II-SDXC-Memory-Cards/158183972";
const selectItem = "button[class='button spin-button prod-ProductCTA--primary button--primary']";
const chkt = "button[class='button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary']";
const account = "button[data-automation-id='new-guest-continue-button']";
const shipping = "button[data-automation-id='fulfillment-continue']";
const delivery = "button[data-automation-id='address-book-action-buttons-on-continue']";
const confirmAddress = "button[class='button-wrapper']";
const account2 = 'button m-margin-top width-full button--primary';
const shipping2 = 'button cxo-continue-btn button--primary';
const firstNameField = "input[id='firstName']";
const firstName = 'Jack';
const lastNameField = "input[id='lastName']";
const lastName = 'Johnson';
const addressField = "input[id='addressLineOne']";
const address = "50 West 4th Street";
const phoneField = '#phone';
const phone = '4253948608';
const emailField = '#email';
const email = 'jackjohnson@gmail.com';
const cityField = "input[id='city']";
const city = "New York";
const zipField = "input[id='postalCode']";
const zip = '10012';
const stateField = "select[id='state']";
const state = 'New York';
const creditCardField = '#creditCard';
const creditCardNum = '4024007103939509';
const cvvField = '#cvv';
const cvv = '221';
const monthField = '#month-chooser';
const month = '02';
const yearField = '#year-chooser';
const year = '2024';
const completeBilling = "button[class='button spin-button button--primary']";
const placeOrder = 'button auto-submit-place-order no-margin set-full-width-button pull-right-m place-order-btn btn-block-s button--primary';

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
    await page.waitForSelector(selectItem);

    //the bot will click this element on the product url page
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
    await page.evaluate(() => document.getElementsByClassName('button m-margin-top width-full button--primary')[0].click());

    //waits for the page to load: EXTRA safety
    await page.waitForNavigation();

    //a quick one second delay for the page to fully load: EXTRA safety
    await page.waitFor(1000);

    //waits for the page to LOAD COMPLETELY and then clicks the first button on the page: shipping2
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
    await page.waitFor(200);    //wait 200 milliseconds for the page to fully load

    const input3 = await page.$(stateField); //locates the state field on the current page
    await input3.click();   //clicks the stateField button
    await input3.type(state);   //types out the state's name
    await input3.type('\n');    //uses the 'new line'/enter key to select state from dropdown
    const deliveryButton = await page.$(delivery); //identifies the "continue" button on the address page 
    await deliveryButton.click(); //ready for item to be delivered
    await page.waitFor(1500); //wait 200 milliseconds for page to load
    // await page.$eval(confirmAddress, elem => elem.click());
    const button = await page.$(confirmAddress);

    //sam's console.log suggestions
    // console.log(document.getElementsByClassName('button-wrapper'))
    // console.log(document.getElementsByClassName('button-wrapper')[0])
}

async function fillPayment(page){
    await page.waitFor(2000); //wait 2 seconds for the page to fully load up
    await page.type(creditCardField, creditCardNum); //inputs the credit card num into the field
    await page.waitFor(100); //wait 100 milliseconds for the page to fully load up
    await page.type(cvvField, cvv); //inputs the cvv into the cvv field
    await page.waitFor(100); //wait 100 milliseconds for the page to fully load up
    await page.select(monthField, month); //inputs the month into the month field
    await page.waitFor(100); //wait 100 milliseconds for the page to fully load up
    await page.select(yearField, year); //inputs the year into the year field
    await page.waitFor(100); //wait 100 milliseconds for the page to fully load up
    await page.click(completeBilling, elem => elem.click()); //clicks the "complete billing" btn
}

async function submitOrder(page){
    await page.waitFor(2000); //wait 2 seconds for the page to fully load up
    await page.evaluate(() => document.getElementsByClassName('button auto-submit-place-order no-margin set-full-width-button pull-right-m place-order-btn btn-block-s button--primary')[0].click()); //clicks the only button on the page with the class name, 'placeOrder'
}

async function checkout(){ //master method that runs all methods and successfully purchases item
    
    //create a page object to be used as a parameter for purchasing item
    var page = await givePage();
    
    //runs the addToCart method to add the item to the digital shopping cart
    await addToCart(page);

    //completes the shipping and delivery information for the item(s) in the shopping cart
    await fillBilling(page);

    //completes the Payment info using the credit card info provided.
    await fillPayment(page);

    //submits the order to the site (FINAL STEP)
    await submitOrder(page);
}

checkout();