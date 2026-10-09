import {test,expect,Locator} from "@playwright/test";
test("Xpath Axes demo", async({page})=>{

    await page.goto("https://www.w3schools.com/html/html_tables.asp");


    //1.self axis - select <td>element that contains Germany
    const germanycell:Locator = page.locator("//td[text()='Germany']/self::td");
    await expect(germanycell).toHaveText("Germany");

//2.parent axis - select <tr>element that contains the <td> with Germany
    const germanyparent:Locator = page.locator("//td[text()='Germany']/parent::tr");
    await expect(germanyparent).toContainText("Maria Anders");

    //3.child axis - select all <td> elements that are children of the <tr> element containing Germany
    const germanychildren:Locator = page.locator("//td[text()='Germany']/parent::tr/child::td");
    await expect(germanychildren).toHaveCount(3);
// 4. ancestor axis - select the <table> element that is an ancestor of the <td> element containing Germany

expect(await page.locator("//td[text()='Germany']/ancestor::table").count()).toBe(1);

//5. descendant axis - select all <td> elements that are descendants of the <table> element containing Germany
const germanydescendants:Locator = page.locator("//td[text()='Germany']/ancestor::table/descendant::td");
await expect(germanydescendants).toHaveCount(18);
//6. following axis - select all <td> elements that are following the <td> element containing Germany
const germanyfollowing:Locator = page.locator("//td[text()='Germany']/following::td");

await expect(germanyfollowing).toHaveCount(35);


//7. following-sibling axis - select all <td> elements that are following siblings of the <td> element containing Germany
const germanyfollowingSiblings:Locator = page.locator("//td[text()='Germany']/following-sibling::td");
await expect(germanyfollowingSiblings).toHaveCount(0);

//8. preceding axis - select all <td> elements that are preceding the <td> element containing Germany
const germanypreceding:Locator = page.locator("//td[text()='Germany']/preceding::td");
await expect(germanypreceding).toHaveCount(2);
//9. preceding-sibling axis - select all <td> elements that are preceding siblings of the <td> element containing Germany
const germanyprecedingSiblings:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");

await expect(germanyprecedingSiblings).toHaveCount(2);
expect(await germanyprecedingSiblings.nth(0).textContent()).toBe("Alfreds Futterkiste");

})