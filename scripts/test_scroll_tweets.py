import asyncio
import os
import json
from dotenv import load_dotenv

load_dotenv()

from surfsky import AsyncSurfsky

async def main():
    async with AsyncSurfsky() as client:
        async with client.browser() as browser:
            print("Navigating to https://x.com/DhravyaShah...")
            await browser.goto("https://x.com/DhravyaShah", wait_until="commit")
            
            print("Waiting for tweets to render...")
            try:
                await browser.wait_for_selector("article", timeout=20.0)
            except Exception as e:
                print("wait_for_selector exception:", e)
                await asyncio.sleep(5)
                
            seen_texts = set()
            tweets_data = []
            
            for scroll_round in range(1, 20):
                # Extract currently rendered tweets
                batch = await browser.evaluate("""() => {
                    const articles = Array.from(document.querySelectorAll('article'));
                    return articles.map(art => {
                        const textEl = art.querySelector('div[data-testid="tweetText"]');
                        const timeEl = art.querySelector('time');
                        const links = Array.from(art.querySelectorAll('a')).map(a => a.href);
                        const tweetUrl = links.find(l => l.includes('/status/')) || '';
                        
                        const testIds = ['reply', 'retweet', 'like'];
                        const metrics = {};
                        for (const id of testIds) {
                            const btn = art.querySelector(`[data-testid="${id}"]`);
                            metrics[id] = btn ? btn.innerText.trim() : '0';
                        }
                        
                        return {
                            text: textEl ? textEl.innerText.trim() : '',
                            datetime: timeEl ? timeEl.getAttribute('datetime') : '',
                            url: tweetUrl,
                            metrics: metrics
                        };
                    }).filter(t => t.text.length > 0);
                }""")
                
                new_in_batch = 0
                for item in batch:
                    key = item['url'] or item['text'][:80]
                    if key not in seen_texts:
                        seen_texts.add(key)
                        tweets_data.append(item)
                        new_in_batch += 1
                
                print(f"Round {scroll_round}: +{new_in_batch} tweets (Total: {len(tweets_data)})")
                
                # Check for login modal or sheet
                login_barrier = await browser.evaluate("""() => {
                    const el = document.querySelector('[data-testid="sheetDialog"]') || document.querySelector('[role="dialog"]');
                    if (el && (el.innerText.includes("Log in") || el.innerText.includes("Sign in"))) {
                        // Check if close button exists
                        const close = el.querySelector('[aria-label="Close"]');
                        if (close) {
                            close.click();
                            return "closed_modal";
                        }
                        return "blocked_modal";
                    }
                    return "none";
                }""")
                
                if login_barrier == "blocked_modal":
                    print("⚠️ Unclosable login barrier encountered!")
                    break
                    
                # Scroll down
                await browser.evaluate("window.scrollBy(0, 1800);")
                await asyncio.sleep(2.5)
                
            print(f"\nFinal scraped count: {len(tweets_data)}")
            if tweets_data:
                print("Sample tweet:", json.dumps(tweets_data[0], indent=2))

if __name__ == "__main__":
    asyncio.run(main())
