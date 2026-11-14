import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

accounts = ['DhravyaShah', 'kalashvasaniya', 'mem0ai', 'Ozacle23']

print("=== DEEP TEXT ANALYSIS FOR STRATEGY MAPPING ===")

for acc in accounts:
    with open(f'scraped_tweets/{acc}_tweets.json', 'r', encoding='utf-8') as f:
        tweets = json.load(f)
        
    print(f"\n{'='*70}\nACCOUNT: @{acc} ({len(tweets)} tweets)\n{'='*70}")
    
    # 1. Analyze top 10 tweets by likes
    sorted_by_likes = sorted(tweets, key=lambda x: int(str(x.get('metrics', {}).get('like', 0)).replace('K','000').replace(',','').split('.')[0]) if x.get('metrics', {}).get('like') else 0, reverse=True)
    
    print("--- TOP 10 PERFORMING POSTS ---")
    for i, t in enumerate(sorted_by_likes[:10]):
        m = t.get('metrics', {})
        txt = t.get('text', '').replace('\n', ' ')
        dt = t.get('datetime', '')[:10]
        url = t.get('url', '')
        print(f"[{i+1}] {dt} | Likes: {m.get('like',0)} | RT: {m.get('retweet',0)} | Rep: {m.get('reply',0)}")
        print(f"     URL: {url}")
        print(f"     Text: {txt}\n")
        
    # 2. Extract technical themes & mentions
    tech_keywords = ['memory', 'context', 'rag', 'mcp', 'cursor', 'claude', 'agent', 'benchmark', 'locomo', 'database', 'graph', 'vector', 'search', 'prompt', 'vibe code', 'token', 'latency']
    print("--- KEYWORD HITS IN TWEETS ---")
    kw_hits = {}
    for kw in tech_keywords:
        matching = [t for t in tweets if kw in t.get('text', '').lower()]
        kw_hits[kw] = len(matching)
    print(kw_hits)
    
    # 3. Look for pain points, questions, debates
    pain_patterns = ['issue', 'problem', 'hard', 'sucks', 'annoying', 'broken', 'struggle', 'limit', 'expensive', 'fail', 'why is', 'how do']
    pains = [t for t in tweets if any(p in t.get('text', '').lower() for p in pain_patterns)]
    print(f"\n--- PAIN POINT / PROBLEM POSTS ({len(pains)} found) ---")
    for p in pains[:5]:
        print(f"  * {p.get('datetime','')[:10]}: {p.get('text','').replace(chr(10), ' ')[:160]}...")
