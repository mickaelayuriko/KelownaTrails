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
        await driver.get("https://testing-replica-65bc2.web.app/");

        //Grab an element from the page
        await driver.findElement(By.id("lastname")).click()
        // 4 | type | id=lastname | valencia
        await driver.findElement(By.id("lastname")).sendKeys("Pulcherio")
        // 5 | click | id=firstname | 
        await driver.findElement(By.id("firstname")).click()
        // 6 | type | id=firstname | washington
        await driver.findElement(By.id("firstname")).sendKeys("Mickaela")
        // 7 | click | css=td > p:nth-child(4) | 
        await driver.findElement(By.css("td > p:nth-child(4)")).click()
        // 8 | type | id=GroupSize | 10
        await driver.findElement(By.id("GroupSize")).sendKeys("5")
        // 9 | click | id=addMemberBtn | 
        await driver.findElement(By.id("addMemberBtn")).click()

        //Check the result

        // Wait for the members to be added and get the member names from the table
        let memberOptions = await driver.wait(until.elementsLocated(By.xpath("//select[@id='members']//option")), 20000);
        let memberNames = [];
        for (let option of memberOptions) {
            memberNames.push(await option.getText());
        }

        // Check if the member names contain the exact name you entered
        assert(memberNames.includes("Pulcherio Mickaela"), "Test Successd");

        console.log('Test Failed');
    } catch (error) {
        console.log('An error accurred:', error);
    } finally {
        await driver.quit();
    }

}
test_case();