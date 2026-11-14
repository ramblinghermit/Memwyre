import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

from surfsky import AsyncSurfsky

async def main():
    print("Connecting to Surfsky...")
    async with AsyncSurfsky() as client:
        async with client.browser() as browser:
            print("Navigating to https://x.com/DhravyaShah...")
            await browser.goto("https://x.com/DhravyaShah")
            await asyncio.sleep(5) # Give it a few seconds to settle
            
            title = await browser.title()
            print("Current Title:", title)
            
            # Check articles (tweets)
            articles = await browser.evaluate("""() => {
                const tweets = Array.from(document.querySelectorAll('article'));
                return tweets.map(t => {
                    const textEl = t.querySelector('div[data-testid="tweetText"]');
                    const timeEl = t.querySelector('time');
                    return {
                        text: textEl ? textEl.innerText : '',
                        time: timeEl ? timeEl.getAttribute('datetime') : ''
                    };
                }).filter(t => t.text.length > 0);
            }""")
            
            print(f"Found {len(articles)} tweets rendered.")
            if articles:
                print("First tweet preview:", articles[0]['text'][:120])

if __name__ == "__main__":
    asyncio.run(main())
