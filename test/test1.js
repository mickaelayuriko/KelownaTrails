const { By, Key, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function test_case() {

    //Set Chrome option
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('disable-gpu')
    options.setChromeBinaryPath('/usr/bin/google-chrome');

    // Create a Driver
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try {
        //Send driver to website
        await driver.get("https://devops-proj-testing.web.app/");

        //Grab an element from the page
        await driver.findElement(By.id('generate')).click();

        //Check the result
        let resultText = await driver.findElement(By.id('result')).getText();

        if (resultText !== "CLICK GENERATE") {
            console.log('Test Success');
        } else {
            console.log('Test Failed');
        }
    } catch (error) {
        console.log('An error accurred:', error);
    } finally {
        await driver.quit();
    }

}
test_case();