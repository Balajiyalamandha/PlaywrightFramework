import indexing = require("@langchain/core/indexing");
import {test,expect,Locator} from "@playwright/test"

test('Actions', async({page})=>{

await page.goto("http://testautomationpractice.blogspot.com/");
const textbox:Locator = page.locator("#name");
await expect(textbox).toBeVisible();
await expect(textbox).toBeEnabled();


const maxLength: string | null   =await textbox.getAttribute("maxlength");//Returns value of maxlength attribute of the element
expect(maxLength).toBe('15');

    await textbox.fill("Balaji");
console.log("text content of FirstName:",await textbox.textContent());//return empty

const enteredValue:string=await textbox.inputValue();
console.log("Input value of the firstname:",enteredValue);//return the input value of textbox
expect(enteredValue).toBe("Balaji");
await page.waitForTimeout(3000);


});

//Radio buttons

test('Radio button Actions',async({page})=>{

await page.goto("http://testautomationpractice.blogspot.com/");
const MaleRadio:Locator = page.locator("#male");
await expect(MaleRadio).toBeVisible();
await expect(MaleRadio).toBeEnabled();

expect(await MaleRadio.isChecked()).toBe(false);


await MaleRadio.check();
expect(await MaleRadio.isChecked()).toBe(true);
await expect(MaleRadio).toBeChecked();

await page.waitForTimeout(3000);

});


//checkbox  Actions

test.only('checkbox  Actions',async({page})=>{

await page.goto("http://testautomationpractice.blogspot.com/");
const checkbox:Locator = page.getByLabel('Sunday');
//await checkbox.check();
//await expect(checkbox).toBeChecked();

//Select all checkboxes
const days:string[]= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const checkboxes:Locator[]=days.map(index => page.getByLabel(index));
expect(checkboxes.length).toBe(7);

for(const checkbox of checkboxes)
{
await checkbox.check();
}





});