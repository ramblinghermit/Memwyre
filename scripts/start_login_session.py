import asyncio
import os
import sys
import urllib.parse
from dotenv import load_dotenv

load_dotenv()

from surfsky import AsyncSurfsky, BrowserSettings, Fingerprint, Surfsky

async def main():
    sync_client = Surfsky()
    base_url = os.getenv("SURFSKY_API_BASE_URL", "").rstrip("/")
    
    # 1. Get or create persistent profile
    profiles = list(sync_client.profiles.iter_all())
    x_profile = next((p for p in profiles if p.title == "X-Scraper-Profile"), None)
    
    if not x_profile:
        print("Creating persistent profile 'X-Scraper-Profile'...")
        x_profile = sync_client.profiles.create(
            title="X-Scraper-Profile",
            description="Persistent profile for X (Twitter) scraping",
            fingerprint=Fingerprint(os="win")
        )
        print(f"Created profile with UUID: {x_profile.uuid}")
    else:
        print(f"Using existing profile with UUID: {x_profile.uuid}")
        
    # Check if there are active sessions and clean them up
    active_sessions = sync_client.profiles.list_active()
    for s in active_sessions:
        if s.internal_uuid:
            try:
                sync_client.profiles.stop(s.internal_uuid)
            except Exception:
                pass

    print("Launching cloud browser session (10 min timeout)...")
    async with AsyncSurfsky() as client:
        async with client.browser(
            profile_uuid=x_profile.uuid,
            browser_settings=BrowserSettings(inactive_kill_timeout=600)
        ) as browser:
            session = browser.session
            screencast_ws = session.inspector.screencast if session.inspector else None
            
            if screencast_ws:
                encoded_ws = urllib.parse.quote_plus(screencast_ws)
                viewer_url = f"{base_url}/screencast?ws={encoded_ws}"
            else:
                viewer_url = "Not available"
                
            print("\n" + "="*80)
            print("WATCH & INTERACT LIVE IN YOUR BROWSER:")
            print(viewer_url)
            print("="*80 + "\n")
            sys.stdout.flush()
            
            print("Navigating to https://x.com/i/flow/login...")
            sys.stdout.flush()
            await browser.goto("https://x.com/i/flow/login", wait_until="commit")
            
            print("Browser is open on X login page.")
            print("Waiting for login to be detected or for you to finish...")
            sys.stdout.flush()
            
            # Poll for login success (up to 10 minutes)
            for second in range(120):
                await asyncio.sleep(5)
                try:
                    is_logged_in = await browser.evaluate("""() => {
                        return !!(
                            document.querySelector('[data-testid="SideNav_AccountSwitcher_Button"]') ||
                            document.querySelector('[data-testid="AppTabBar_Home_Link"]') ||
                            document.querySelector('[aria-label="Home"]') ||
                            document.querySelector('[aria-label="Profile"]')
                        );
                    }""")
                    
                    if is_logged_in:
                        print("\n🎉 SUCCESS: Login detected on X.com!")
                        print("Waiting 5 seconds for session cookies to sync...")
                        await asyncio.sleep(5)
                        break
                except Exception:
                    pass
                    
            print("Exiting and permanently saving session to profile...")

if __name__ == "__main__":
    asyncio.run(main())
