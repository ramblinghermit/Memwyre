import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

from surfsky import AsyncSurfsky

async def main():
    print("Connecting to Surfsky...")
    async with AsyncSurfsky() as client:
        async with client.browser() as browser:
            print("Session started. Navigating to example.com...")
            await browser.goto("https://example.com")
            title = await browser.title()
            print("Success! Page title:", title)

if __name__ == "__main__":
    asyncio.run(main())
