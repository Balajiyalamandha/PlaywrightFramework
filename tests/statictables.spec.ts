import {test, expect,Locator}from "@playwright/test";

test("Static Tables demo", async({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/")
    const table:Locator =page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1. Count the number of rows in the table
    const rows:Locator = table.locator("tr"); // returns all the rows in the table
    await expect(rows).toHaveCount(7);//approach 1 to verify the number of rows in the table

    const rowCount:number= await rows.count();
    console.log("Number of rows in the table: ", rowCount);
    expect(rowCount).toBe(7);//approach 2 to verify the number of rows in the table

//2. Count the number of columns in the table
const columns:Locator =  rows.locator("th");
await expect(columns).toHaveCount(4)//approach 1 to verify the number of columns in the table

const columnCount:number= await columns.count();
console.log("Number of columns in the table: ", columnCount);
expect(columnCount).toBe(4);//approach 2 to verify the number of columns in the table

//3. Get the text of a specific cell in the table
const thirdrowcell:Locator = rows.nth(3).locator("td");
const thirdrowtext:string[] = await thirdrowcell.allInnerTexts();
console.log("3rd row data:", thirdrowtext);
await expect (thirdrowcell).toHaveText([ 'Learn JS', 'Animesh', 'Javascript', '300' ]);

//4. Get the text of all cells in the table
console.log("All table data");
const allRowdata:Locator = table.locator("tr td");
const allRowText:string[] = await allRowdata.allInnerTexts();
console.log("All table data:", allRowText);

console.log("Print All table data");
const allRowsdata =await rows.all();
console.log("Book Name | Author | Subject | Price");
for (const row of allRowsdata.slice(1)) // Skip the header row
{
const cols = await row.locator('td').allInnerTexts();
    console.log(cols.join('\n'));


}


});