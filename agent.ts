import { chromium, Browser, Page } from "playwright";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

async function main() {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  const navigateTool = new DynamicTool({
    name: "navigate_to_url",
    description: "Navigates the browser to a specific URL. Input must be a full URL.",
    func: async (url: string) => {
      try {
        await page.goto(url, { waitUntil: "domcontentloaded" });
        return `Navigated to ${url}`;
      } catch (e) {
        return `Navigation failed: ${(e as Error).message}`;
      }
    },
  });

  const clickTool = new DynamicTool({
    name: "click_element",
    description:
      "Click an element. Input is a Playwright selector like 'text=Login' or '#submit'.",
    func: async (selector: string) => {
      try {
        await page.click(selector, { timeout: 5000 });
        await page.waitForLoadState("domcontentloaded");
        return `Clicked: ${selector}`;
      } catch (e) {
        return `Click failed: ${(e as Error).message}`;
      }
    },
  });

  const typeTool = new DynamicTool({
    name: "type_text",
    description:
      "Fill an input. Input format: 'selector||text'. Example: 'input[name=search]||Artificial Intelligence'.",
    func: async (input: string) => {
      try {
        const [selector, ...rest] = input.split("||");
        await page.fill(selector, rest.join("||"));
        return `Typed into ${selector}`;
      } catch (e) {
        return `Type failed: ${(e as Error).message}`;
      }
    },
  });

  const getPageInfoTool = new DynamicTool({
    name: "get_page_content",
    description: "Return the visible text of the current page.",
    func: async () => {
      const text = await page.evaluate(() => document.body.innerText);
      return text.slice(0, 2000);
    },
  });

  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0,
  });

  const agent = createReactAgent({
    llm: model,
    tools: [navigateTool, clickTool, typeTool, getPageInfoTool],
  });

  const task =
    "Go to wikipedia.org, use the search box to search for 'Artificial Intelligence', " +
    "then click the link in the search results whose text is exactly 'Artificial intelligence', " +
    "and finally report the title of the resulting page (the <h1> text).";

  const response = await agent.invoke({
    messages: [{ role: "user", content: task }],
  });

  const last = response.messages.at(-1);
  console.log("\n--- Final Answer ---");
  console.log(typeof last?.content === "string" ? last.content : JSON.stringify(last?.content, null, 2));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});