import asyncio
import os
import json
from dotenv import load_dotenv

load_dotenv()

from surfsky import AsyncSurfsky

async def main():
    async with AsyncSurfsky() as client:
        async with client.browser() as browser:
            # Capture any graphql or tweet API responses
            await browser.capture_responses("graphql", "UserTweets", "Timeline")
            
            print("Navigating to https://x.com/DhravyaShah...")
            await browser.goto("https://x.com/DhravyaShah", wait_until="domcontentloaded")
            await asyncio.sleep(8)
            
            print(f"Captured {len(browser.responses)} responses:")
            for r in browser.responses:
                print("URL:", r.url[:120])
                try:
                    data = r.json()
                    print("Keys in JSON:", list(data.keys()))
                except Exception:
                    print("Non-json or error")

if __name__ == "__main__":
    asyncio.run(main())
