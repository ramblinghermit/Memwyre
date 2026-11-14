import asyncio
import os
import sys
import json
import csv
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

load_dotenv()

from surfsky import AsyncSurfsky, BrowserSettings, Surfsky

TARGETS = [
    "Ozacle23"
]

async def scrape_target(browser, handle, max_tweets=200):
    print(f"\n" + "="*60)
    print(f"[SCRAPING] Starting @{handle} (Target: {max_tweets} tweets)...")
    print("="*60)
    sys.stdout.flush()
    
    url = f"https://x.com/{handle}"
    await browser.goto(url, wait_until="commit")
    await asyncio.sleep(5)
    
    tweets = []
    seen_keys = set()
    stall_count = 0
    scroll_round = 0
    
    while len(tweets) < max_tweets and stall_count < 14:
        scroll_round += 1
        
        # Extract tweets currently rendered in the DOM
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
        
        new_count = 0
        for t in batch:
            key = t['url'] or t['text'][:80]
            if key not in seen_keys:
                seen_keys.add(key)
                t['author'] = handle
                tweets.append(t)
                new_count += 1
                if len(tweets) >= max_tweets:
                    break
                    
        print(f"[@{handle}] Round {scroll_round:02d}: +{new_count} new tweets | Progress: {len(tweets)}/{max_tweets}")
        sys.stdout.flush()
        
        if new_count == 0:
            stall_count += 1
        else:
            stall_count = 0
            
        await browser.evaluate("window.scrollBy(0, 2200);")
        await asyncio.sleep(2.0)
        
    print(f"[DONE] Finished @{handle}: Extracted {len(tweets)} tweets.")
    
    os.makedirs("scraped_tweets", exist_ok=True)
    json_path = f"scraped_tweets/{handle}_tweets.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(tweets, f, indent=2, ensure_ascii=False)
        
    csv_path = f"scraped_tweets/{handle}_tweets.csv"
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["author", "datetime", "url", "text", "replies", "retweets", "likes"])
        for t in tweets:
            m = t.get("metrics", {})
            writer.writerow([
                t.get("author", handle),
                t.get("datetime", ""),
                t.get("url", ""),
                t.get("text", "").replace("\n", " "),
                m.get("reply", "0"),
                m.get("retweet", "0"),
                m.get("like", "0")
            ])
            
    print(f"[SAVED] Exported to:\n  - {json_path}\n  - {csv_path}")
    sys.stdout.flush()
    return tweets

async def main():
    sync_client = Surfsky()
    
    # Clean up existing active sessions first
    for s in sync_client.profiles.list_active():
        if s.internal_uuid:
            try:
                sync_client.profiles.stop(s.internal_uuid)
            except Exception:
                pass

    # Build cookie list from .env
    cookies = []
    auth_token = os.getenv("X_AUTH_TOKEN")
    ct0 = os.getenv("X_CT0")
    
    if auth_token:
        cookies.extend([
            {"name": "auth_token", "value": auth_token.strip(), "domain": ".x.com", "path": "/"},
            {"name": "auth_token", "value": auth_token.strip(), "domain": ".twitter.com", "path": "/"}
        ])
        if ct0:
            cookies.extend([
                {"name": "ct0", "value": ct0.strip(), "domain": ".x.com", "path": "/"},
                {"name": "ct0", "value": ct0.strip(), "domain": ".twitter.com", "path": "/"}
            ])

    if not cookies:
        print("[ERROR] No cookies found in .env")
        return

    print("[INFO] Starting cloud browser session with cookies...")
    sys.stdout.flush()
    
    async with AsyncSurfsky() as client:
        session_opts = {
            "browser_settings": BrowserSettings(inactive_kill_timeout=600),
            "cookies": cookies
        }
            
        async with client.browser(**session_opts) as browser:
            await browser.set_cookies(cookies)
            
            print("[INFO] Navigating to X.com to verify login session...")
            sys.stdout.flush()
            await browser.goto("https://x.com/home", wait_until="commit")
            await asyncio.sleep(4)
            
            title = await browser.title()
            print(f"[INFO] Page loaded: title='{title}'")
            sys.stdout.flush()
            
            for handle in TARGETS:
                await scrape_target(browser, handle, max_tweets=200)
                
            print("\n" + "="*60)
            print("[COMPLETE] @Ozacle23 SCRAPED SUCCESSFULLY!")
            print("="*60)
            sys.stdout.flush()

if __name__ == "__main__":
    asyncio.run(main())
