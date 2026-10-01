/*
css- cascading style sheets
html+js+css

2 types of css
1. Absolute css locator
2.Relative css locator

tag with id          - tag#id  or #id
tag with class       - tag.class or .class
tag with any attribute -tag[attribute=value] or [attribute=value]
tag with class and attribute   - tag.class[attribute =value]  or .class[attribute =value]
*/

import{test,expect, Locator} from "@playwright/test"

test ("Verify CSS Locators", async ({page})=>{

await page.goto("https://demowebshop.tricentis.com/");

// tagId

//const Searchbox:Locator = page.locator("#small-searchterms");
//await Searchbox.fill("Shirts");

await expect(page.locator('input#small-searchterms')).toBeVisible();
await page.locator('#small-searchterms').fill("Shirts");
await page.waitForTimeout(5000);

// Class 

await page.locator('input.search-box-text').fill("Shirts");
await page.locator('.search-box-text').fill("Shirts");

// tag[attribute=value]
await page.locator('input[name=q]').fill("Shirts");
await page.locator('[name=q]').fill("Shirts");

//tag.class[attribute=value]
await page.locator('input.search-box-text[value="Search store"]').fill("Shirts");
await page.locator('search-box-text[value="Search store"]').fill("Shirts");








})