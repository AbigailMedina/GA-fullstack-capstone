const selenium = require('selenium-webdriver');

jest.setTimeout(30000); // Set timeout to 30 seconds

describe('Expenses Tests', function () {

    let driver;

    beforeAll(async function () {
        driver = await new selenium.Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('http://localhost:3000/expenses');
    });

    afterAll(async function () {
        await driver.quit();
    })

    test('should verify h1 text', async function () {
        const addHeader = await driver.findElement(selenium.By.xpath("//h1[text()='Add an expense']"));
        const tableHeader = await driver.findElement(selenium.By.xpath("//h1[text()='Expenses Table']"));
        
        // Use WebDriver's `isDisplayed` method to check if elements are visible
        const isAddHeaderDisplayed = await addHeader.isDisplayed();
        const isTableHeaderDisplayed = await tableHeader.isDisplayed();
        
        // Use Jest assertions to verify visibility
        expect(isAddHeaderDisplayed).toBe(true);
        expect(isTableHeaderDisplayed).toBe(true);
    })

    test('add expense', async () => {
        // Find elements using xpath
        const descriptionInputElement = await driver.findElement(selenium.By.xpath("//label[text()='Description']/following-sibling::div/input"));
        const amountInputElement = await driver.findElement(selenium.By.xpath("//label[text()='Amount']/following-sibling::div/input"));
        const categoryInputElement = await driver.findElement(selenium.By.xpath("//label[text()='Category']/following-sibling::div/input"));
        const dateInputElement = await driver.findElement(selenium.By.xpath("//*[@data-testid='dateinput']//input"));
        const submitButton = await driver.findElement(selenium.By.xpath("//*[@data-testid='add-expense']"));

        // Fetch initial length of list
        // const beginningList = await driver.findElements(selenium.By.xpath("//tbody/tr"));
        // const beginningListLength = beginningList.length;
        // Fill out the form and submit
        await descriptionInputElement.sendKeys("AA test description");
        await amountInputElement.sendKeys("100.00");
        await categoryInputElement.sendKeys("AA test category");
        await dateInputElement.sendKeys("08/15/2024");
        await submitButton.click();

        // Wait for the list to update (optional, depending on your application)
        await driver.sleep(2000); // Adjust the sleep time based on your application’s needs

        // Fetch length of list again
        // const endingList = await driver.findElements(selenium.By.xpath("//tbody/tr"));
        // const endingListLength = endingList.length;
        const firstListItem = await driver.findElement(selenium.By.xpath("//tbody/tr/td")).getText();
        expect(firstListItem).toBe("AA test description");
        // // Assert that the number of items has increased by 1
        // expect(endingListLength).toBe(beginningListLength + 1);

    });

});