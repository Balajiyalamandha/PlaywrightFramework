import {test,expect}from "@playwright/test";

//fixture - global variable: page,browser
test("Verifypage title",({page})=>{
    page.goto("https://www.google.com");
    expect(page).toHaveTitle("Google");
    

})

