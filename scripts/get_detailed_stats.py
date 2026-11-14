import json
from collections import defaultdict

def run_stats():
    accounts = ['DhravyaShah', 'kalashvasaniya', 'mem0ai', 'Ozacle23']
    for acc in accounts:
        with open(f'scraped_tweets/{acc}_tweets.json', 'r', encoding='utf-8') as f:
            tweets = json.load(f)
        print(f"\n*** DETAILED STATS FOR @{acc} ***")
        # Text length
        lengths = [len(t.get('text', '')) for t in tweets]
        avg_len = sum(lengths)/len(lengths)
        print(f"Avg tweet length: {avg_len:.1f} chars | Min: {min(lengths)} | Max: {max(lengths)}")
        
        # Thread indicators
        threads = [t for t in tweets if any(k in t.get('text', '').lower() for k in ['1/', '1.', 'thread', 'below', 'here is what', 'read on'])]
        print(f"Thread starters / structured posts: {len(threads)}")
        
        # Media / Link indicators
        links = [t for t in tweets if 'http' in t.get('text', '')]
        print(f"Posts with links: {len(links)} ({len(links)/len(tweets)*100:.1f}%)")
        
        # Distribution of likes
        likes = [int(str(t.get('metrics', {}).get('like', 0)).replace('K','000').replace(',','').split('.')[0]) if t.get('metrics', {}).get('like') else 0 for t in tweets]
        over_100 = sum(1 for l in likes if l >= 100)
        over_500 = sum(1 for l in likes if l >= 500)
        over_1k = sum(1 for l in likes if l >= 1000)
        print(f"Likes breakdown: >=100: {over_100}, >=500: {over_500}, >=1000: {over_1k}")

run_stats()
