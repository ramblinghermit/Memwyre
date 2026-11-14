import json
import os
import glob
import sys
from collections import Counter
import re

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

def parse_num(v):
    if not v:
        return 0
    v = str(v).strip().upper()
    if 'K' in v:
        try:
            return int(float(v.replace('K', '')) * 1000)
        except:
            return 0
    if 'M' in v:
        try:
            return int(float(v.replace('M', '')) * 1000000)
        except:
            return 0
    try:
        return int(v.replace(',', ''))
    except:
        return 0

def analyze():
    files = glob.glob('scraped_tweets/*.json')
    summary = {}
    
    for fpath in files:
        fname = os.path.basename(fpath)
        handle = fname.replace('_tweets.json', '')
        with open(fpath, 'r', encoding='utf-8') as fp:
            try:
                tweets = json.load(fp)
            except Exception as e:
                print(f"Error loading {fpath}: {e}")
                continue
                
        print(f"\n=======================================================")
        print(f"ANALYSIS FOR: @{handle} (File: {fname})")
        print(f"Total entries: {len(tweets)}")
        print(f"=======================================================")
        
        if not tweets:
            print("No tweets found.")
            continue
            
        # Completeness & Field presence
        dates = [t.get('datetime', '') for t in tweets if t.get('datetime')]
        urls = [t.get('url', '') for t in tweets if t.get('url')]
        texts = [t.get('text', '') for t in tweets if t.get('text')]
        metrics = [t.get('metrics', {}) for t in tweets]
        
        # Duplicates check
        unique_urls = set(urls)
        unique_texts = set(texts)
        print(f"Unique URLs: {len(unique_urls)} / {len(urls)}")
        print(f"Unique Texts: {len(unique_texts)} / {len(texts)}")
        
        if dates:
            print(f"Earliest Tweet: {min(dates)}")
            print(f"Latest Tweet:   {max(dates)}")
            
        # Metrics stats
        likes = [parse_num(m.get('like', 0)) for m in metrics]
        retweets = [parse_num(m.get('retweet', 0)) for m in metrics]
        replies = [parse_num(m.get('reply', 0)) for m in metrics]
        
        print(f"Total Likes: {sum(likes)} | Max Likes: {max(likes) if likes else 0} | Avg Likes: {sum(likes)/len(likes):.1f}")
        print(f"Total Retweets: {sum(retweets)} | Max RTs: {max(retweets) if retweets else 0}")
        print(f"Total Replies: {sum(replies)} | Max Replies: {max(replies) if replies else 0}")
        
        # Sort by engagement (likes + replies*2 + retweets*2)
        scored_tweets = []
        for t in tweets:
            m = t.get('metrics', {})
            l = parse_num(m.get('like', 0))
            r = parse_num(m.get('reply', 0))
            rt = parse_num(m.get('retweet', 0))
            score = l + (r * 2) + (rt * 2)
            scored_tweets.append((score, l, r, rt, t))
            
        scored_tweets.sort(key=lambda x: x[0], reverse=True)
        
        print("\n--- TOP 5 HIGHEST ENGAGEMENT TWEETS ---")
        for i, (score, l, r, rt, t) in enumerate(scored_tweets[:5]):
            dt = t.get('datetime', '')[:10]
            txt = t.get('text', '').replace('\n', ' ')
            print(f"[{i+1}] ({dt}) [Likes: {l}, RTs: {rt}, Replies: {r}] (Score: {score})")
            print(f"    URL: {t.get('url', '')}")
            print(f"    Text: {txt[:200]}...")
            
        # Common keywords / hashtags / mentions
        all_words = []
        mentions = []
        hashtags = []
        for t in texts:
            words = re.findall(r'\b[a-zA-Z0-9_\-\.\#\@]+\b', t)
            for w in words:
                if w.startswith('@'):
                    mentions.append(w.lower())
                elif w.startswith('#'):
                    hashtags.append(w.lower())
                elif len(w) > 3 and not w.startswith('http'):
                    all_words.append(w.lower())
                    
        word_counts = Counter(all_words)
        mention_counts = Counter(mentions)
        hashtag_counts = Counter(hashtags)
        
        print("\n--- TOP MENTIONS ---")
        print(mention_counts.most_common(10))
        print("\n--- TOP HASHTAGS ---")
        print(hashtag_counts.most_common(5))
        
        # Content patterns (questions, announcements, technical, personal)
        questions = [t for t in texts if '?' in t]
        github_links = [t for t in texts if 'github.com' in t.lower()]
        demos_videos = [t for t in texts if any(k in t.lower() for k in ['demo', 'launch', 'built', 'introducing', 'released'])]
        mcp_mentions = [t for t in texts if 'mcp' in t.lower()]
        memory_mentions = [t for t in texts if any(k in t.lower() for k in ['memory', 'context', 'rag', 'recall', 'vector'])]
        agent_mentions = [t for t in texts if any(k in t.lower() for k in ['agent', 'agents', 'workflow', 'cursor', 'claude'])]
        
        print("\n--- TOPIC / FORMAT FREQUENCIES ---")
        print(f"Questions asked: {len(questions)} ({len(questions)/len(texts)*100:.1f}%)")
        print(f"GitHub links: {len(github_links)} ({len(github_links)/len(texts)*100:.1f}%)")
        print(f"Demo/Launch/Build posts: {len(demos_videos)} ({len(demos_videos)/len(texts)*100:.1f}%)")
        print(f"MCP mentions: {len(mcp_mentions)} ({len(mcp_mentions)/len(texts)*100:.1f}%)")
        print(f"Memory/Context/RAG mentions: {len(memory_mentions)} ({len(memory_mentions)/len(texts)*100:.1f}%)")
        print(f"Agent/Cursor/Claude mentions: {len(agent_mentions)} ({len(agent_mentions)/len(texts)*100:.1f}%)")

if __name__ == '__main__':
    analyze()
