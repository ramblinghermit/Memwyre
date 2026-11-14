import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

from surfsky import AsyncSurfsky

async def main():
    async with AsyncSurfsky() as client:
        async with client.browser() as browser:
            print("Navigating to https://x.com/DhravyaShah...")
            await browser.goto("https://x.com/DhravyaShah", wait_until="domcontentloaded")
            await asyncio.sleep(6)
            
            url = await browser.url()
            print("Current URL:", url)
            
            # Let's see what is inside the page
            page_text = await browser.evaluate("() => document.body.innerText")
            print("=== PAGE TEXT PREVIEW ===")
            print(page_text[:1500])

if __name__ == "__main__":
    asyncio.run(main())
