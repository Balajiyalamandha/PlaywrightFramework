import {test, expect, Locator} from "@playwright/test";

test("Xpath demo in palywright", async ({page})=>{


    await page.goto("https://demowebshop.tricentis.com/");

// 1. Absolute Xpath
    const logo:Locator = page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[3]/form[1]/input[1]");
    await expect(logo).toBeVisible();


//2. Relative Xpath
    const Relativelogo:Locator =page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(Relativelogo).toBeVisible();
    const Rproducts:Locator =page.locator("//h2/a[@href='/build-your-own-expensive-computer-2']")

// 3. contains
   const products:Locator =page.locator("//h2/a[contains(@href,'computer')]");
   const productsCount:number=await products.count();
   console.log("No of Computer related products:",productsCount);
    expect(productsCount).toBeGreaterThan(0);


//4.textContent
    //console.log(await products.textContent()); //Error: strict mode voilation
    console.log("First computer related product:",  await products.first().textContent());
    console.log("Last computer related product:",  await products.last().textContent());
    console.log("Nth computer related product:",  await products.nth(1).textContent()); //Index starts from zero

//5. allTextContents()
let productTitles:string[]=await products.allTextContents() //geting all the matched products in array
for(let pt of productTitles)
{
    console.log(pt);
}

//6.starts-with()
 const buildingproducts:Locator =page.locator("//h2/a[starts-with(@href,'/build')]"); //return multiple elements
const count:number = await buildingproducts.count();
expect(count).toBeGreaterThan(0);

// 7.Text()
 const registerlink:Locator =page.locator("//a[text()='Register']");
await expect(registerlink).toBeVisible();


//8.last
const lastitem:Locator =page.locator("//div[@class='column follow-us']//li[last()]");
await expect(lastitem).toBeVisible();
console.log("TextContent of last item:", await lastitem.textContent());

//9.position

const positionitem:Locator =page.locator("//div[@class='column follow-us']//li[position()=3]");
await expect(positionitem).toBeVisible();
console.log("positionitem:", await positionitem.textContent());














})



