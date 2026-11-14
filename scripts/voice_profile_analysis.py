import json
import re
import sys
from collections import Counter, defaultdict

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

def parse_num(v):
    if not v: return 0
    v = str(v).strip().upper().replace(',','')
    if 'K' in v:
        try: return int(float(v.replace('K','')) * 1000)
        except: return 0
    if 'M' in v:
        try: return int(float(v.replace('M','')) * 1000000)
        except: return 0
    try: return int(v.split('.')[0])
    except: return 0

def engagement_score(t):
    m = t.get('metrics', {})
    l = parse_num(m.get('like', 0))
    r = parse_num(m.get('reply', 0))
    rt = parse_num(m.get('retweet', 0))
    return l + (r * 2) + (rt * 2)

# Load all tweets
all_tweets = []
accounts = ['DhravyaShah', 'kalashvasaniya', 'mem0ai', 'Ozacle23']
for acc in accounts:
    with open(f'scraped_tweets/{acc}_tweets.json', 'r', encoding='utf-8') as f:
        tweets = json.load(f)
    for t in tweets:
        t['_account'] = acc
        t['_score'] = engagement_score(t)
    all_tweets.extend(tweets)

all_tweets.sort(key=lambda x: x['_score'], reverse=True)

# Split into tiers
top_50 = all_tweets[:50]       # Top performers
top_100 = all_tweets[:100]     # Strong performers
mid = all_tweets[100:400]      # Middle tier
bottom = all_tweets[400:]      # Lower tier

print(f"Total tweets: {len(all_tweets)}")
print(f"Top 50 score range: {top_50[-1]['_score']} - {top_50[0]['_score']}")
print(f"Top 100 score range: {top_100[-1]['_score']} - {top_100[0]['_score']}")

# ============================================
# 1. OPENER / HOOK PATTERNS
# ============================================
print("\n" + "="*80)
print("1. HOOK / OPENER PATTERNS (How high-performing tweets START)")
print("="*80)

def get_opener(text):
    """Get the first line or first sentence"""
    lines = text.strip().split('\n')
    first = lines[0].strip()
    if len(first) > 120:
        first = first[:120] + '...'
    return first

print("\n--- TOP 50 TWEET OPENERS (verbatim first lines) ---")
for i, t in enumerate(top_50[:30]):
    opener = get_opener(t.get('text',''))
    print(f"[{i+1}] (Score:{t['_score']}) @{t['_account']}: \"{opener}\"")

# Classify opener types
def classify_opener(text):
    first = text.strip().split('\n')[0].lower().strip()
    if first.endswith('?'): return 'question'
    if first.startswith(('i ', "i'", 'i\u2019', 'my ', 'we ', "we'", 'we\u2019')): return 'first-person-statement'
    if first.startswith(('this ', 'these ', 'the ', 'here', 'what ')): return 'demonstrative/declarative'
    if any(first.startswith(w) for w in ['introducing', 'announcing', 'meet ', 'new:', 'launch']): return 'announcement'
    if first.startswith(('just ', 'ngl', 'ok ', 'wait', 'bro', 'yo ', 'lol', 'omg', 'damn')): return 'casual-exclamation'
    if any(c in first[:5] for c in '0123456789'): return 'number-lead'
    if first.startswith(('don', "don'", 'stop', 'never', 'no ')): return 'negative-command'
    if len(first) < 30: return 'short-punchy'
    return 'other-declarative'

opener_types_top = Counter(classify_opener(t['text']) for t in top_100)
opener_types_all = Counter(classify_opener(t['text']) for t in all_tweets)

print("\n--- OPENER TYPE DISTRIBUTION ---")
print(f"{'Type':<30} {'Top 100':>10} {'All Tweets':>12} {'Over-index':>12}")
for typ, cnt in opener_types_top.most_common():
    all_pct = (opener_types_all.get(typ, 0) / len(all_tweets)) * 100
    top_pct = (cnt / 100) * 100
    ratio = top_pct / all_pct if all_pct > 0 else 0
    print(f"{typ:<30} {top_pct:>9.1f}% {all_pct:>11.1f}% {ratio:>10.2f}x")

# ============================================
# 2. PUNCTUATION & FORMATTING PATTERNS
# ============================================
print("\n" + "="*80)
print("2. PUNCTUATION, FORMATTING & STRUCTURAL PATTERNS")
print("="*80)

def analyze_structure(text):
    lines = text.split('\n')
    non_empty = [l for l in lines if l.strip()]
    return {
        'char_length': len(text),
        'line_count': len(non_empty),
        'has_linebreaks': len(non_empty) > 1,
        'has_emoji': bool(re.search(r'[\U0001F300-\U0001FAFF\u2600-\u27BF\u2B50]', text)),
        'has_url': 'http' in text.lower(),
        'has_bullet_list': bool(re.search(r'^\s*[-•·>→⚡🔌🖥️🧩🤖]\s', text, re.M)),
        'has_numbered_list': bool(re.search(r'^\s*\d+[\.\)]\s', text, re.M)),
        'ends_question': text.strip().endswith('?'),
        'has_all_lowercase_start': text[0].islower() if text else False,
        'no_period_ending': not text.strip().endswith('.') and not text.strip().endswith('!') and not text.strip().endswith('?'),
        'uses_parenthetical': '(' in text,
        'uses_dash_aside': ' - ' in text or ' — ' in text or ' – ' in text,
        'uses_quotes': '"' in text or '"' in text or '\'' in text,
        'uses_ellipsis': '...' in text or '…' in text,
        'uses_ampersand': '&' in text,
        'uses_greater_than': '>' in text,  # blockquote style
        'all_lowercase': text == text.lower(),
        'has_caps_word': bool(re.search(r'\b[A-Z]{2,}\b', text)),
    }

# Compare top vs bottom
def aggregate_features(tweets):
    features = defaultdict(int)
    lengths = []
    line_counts = []
    for t in tweets:
        s = analyze_structure(t.get('text', ''))
        for k, v in s.items():
            if isinstance(v, bool) and v:
                features[k] += 1
            elif k == 'char_length':
                lengths.append(v)
            elif k == 'line_count':
                line_counts.append(v)
    n = len(tweets)
    result = {k: f"{(v/n)*100:.1f}%" for k, v in features.items()}
    result['avg_char_length'] = f"{sum(lengths)/len(lengths):.0f}"
    result['avg_line_count'] = f"{sum(line_counts)/len(line_counts):.1f}"
    result['median_char_length'] = f"{sorted(lengths)[len(lengths)//2]}"
    return result

top_feats = aggregate_features(top_100)
all_feats = aggregate_features(all_tweets)

print(f"\n{'Feature':<35} {'Top 100':>12} {'All 800':>12}")
print("-"*60)
for k in sorted(top_feats.keys()):
    print(f"{k:<35} {top_feats[k]:>12} {all_feats.get(k,'N/A'):>12}")

# ============================================
# 3. CAPITALIZATION & GRAMMAR CONVENTIONS
# ============================================
print("\n" + "="*80)
print("3. CAPITALIZATION & GRAMMAR CONVENTIONS")
print("="*80)

caps_patterns = {
    'starts_lowercase': 0,
    'starts_uppercase': 0,
    'no_capitals_at_all': 0,
    'sentence_case': 0,
    'mixed_casual': 0,
}

for t in top_100:
    text = t.get('text', '')
    first_char = text[0] if text else ''
    if first_char.islower():
        caps_patterns['starts_lowercase'] += 1
    elif first_char.isupper():
        caps_patterns['starts_uppercase'] += 1
    
    if text == text.lower():
        caps_patterns['no_capitals_at_all'] += 1
    
    # Check if it follows standard sentence casing
    sentences = re.split(r'[.!?]\s+', text)
    proper_caps = sum(1 for s in sentences if s and s[0].isupper())
    if proper_caps == len(sentences) and len(sentences) > 1:
        caps_patterns['sentence_case'] += 1
    else:
        caps_patterns['mixed_casual'] += 1

print("\n--- CAPITALIZATION IN TOP 100 ---")
for k, v in caps_patterns.items():
    print(f"  {k}: {v} ({v}%)")

# ============================================
# 4. VOCABULARY — MOST USED WORDS & PHRASES
# ============================================
print("\n" + "="*80)
print("4. VOCABULARY — POWER WORDS IN TOP PERFORMERS")
print("="*80)

stopwords = {'the','a','an','is','are','was','were','be','been','being','have','has','had',
             'do','does','did','will','would','could','should','shall','may','might','must',
             'to','of','in','for','on','with','at','by','from','as','into','through','during',
             'and','but','or','nor','not','so','yet','both','either','neither','that','this',
             'it','its','i','me','my','we','our','you','your','he','his','she','her','they',
             'their','them','who','which','what','when','where','how','why','if','then','than',
             'just','also','about','can','all','more','some','any','each','up','out','no',
             'very','too','even','only','now','new','one','like','get','got','dont','im',
             'thats','much','really','been','going','here','there','back','over','most'}

def extract_words(text):
    text = re.sub(r'https?://\S+', '', text)
    text = re.sub(r'@\w+', '', text)
    words = re.findall(r"[a-z']+", text.lower())
    return [w for w in words if w not in stopwords and len(w) > 2]

# Top 100 vocabulary
top_words = Counter()
for t in top_100:
    top_words.update(extract_words(t['text']))

all_words = Counter()
for t in all_tweets:
    all_words.update(extract_words(t['text']))

print("\n--- TOP 60 WORDS IN HIGH-PERFORMING TWEETS ---")
for w, c in top_words.most_common(60):
    all_freq = all_words.get(w, 0)
    ratio = (c / 100) / (all_freq / len(all_tweets)) if all_freq > 0 else 0
    marker = " ⭐" if ratio > 1.5 else ""
    print(f"  {w:<20} {c:>4}x in Top100 | {all_freq:>4}x overall | overindex: {ratio:.2f}x{marker}")

# ============================================
# 5. BIGRAMS & PHRASES
# ============================================
print("\n" + "="*80)
print("5. COMMON BIGRAMS / PHRASES IN TOP PERFORMERS")
print("="*80)

def extract_bigrams(text):
    words = extract_words(text)
    return [f"{words[i]} {words[i+1]}" for i in range(len(words)-1)]

top_bigrams = Counter()
for t in top_100:
    top_bigrams.update(extract_bigrams(t['text']))

print("\n--- TOP 40 BIGRAMS ---")
for bg, c in top_bigrams.most_common(40):
    if c >= 3:
        print(f"  \"{bg}\" — {c}x")

# ============================================
# 6. TONE MARKERS & EMOTIONAL REGISTER
# ============================================
print("\n" + "="*80)
print("6. TONE MARKERS & EMOTIONAL REGISTER")
print("="*80)

tone_markers = {
    'vulnerability': ['hard', 'struggle', 'failed', 'mistake', 'fired', 'rejected', 'broke', 'f*ck', 'scared', 'nervous', 'honest', 'truth', 'real talk', 'raw'],
    'hype/excitement': ['excited', 'amazing', 'incredible', 'insane', 'crazy', 'fire', 'awesome', 'love', 'beautiful', 'unreal', 'massive', 'blown away', 'mind-blowing'],
    'casual_slang': ['ngl', 'tbh', 'imo', 'ngl', 'lol', 'lmao', 'bruh', 'bro', 'yo', 'btw', 'fr', 'lowkey', 'highkey', 'idk', 'kinda', 'gonna', 'wanna', 'gotta'],
    'technical_authority': ['architecture', 'benchmark', 'pipeline', 'latency', 'throughput', 'deploy', 'production', 'infra', 'stack', 'server', 'database', 'api', 'sdk', 'framework'],
    'builder_identity': ['built', 'building', 'shipped', 'launch', 'released', 'coded', 'hacked', 'created', 'made', 'developed', 'wrote', 'design'],
    'community_pull': ['hiring', 'join', 'team', 'community', 'contributor', 'open source', 'together', 'collaboration', 'welcome', 'invite'],
    'urgency/scarcity': ['now', 'today', 'just', 'finally', 'breaking', 'first', 'only', 'never before', 'limited'],
    'contrarian_framing': ["isn't", "aren't", "doesn't", "don't", "won't", "can't", "never", "not", "wrong", "overrated", "underrated", "unpopular", "hot take", 'myth', 'lie'],
}

print("\n--- TONE FREQUENCY IN TOP 100 vs ALL ---")
for category, markers in tone_markers.items():
    top_hits = sum(1 for t in top_100 if any(m in t.get('text','').lower() for m in markers))
    all_hits = sum(1 for t in all_tweets if any(m in t.get('text','').lower() for m in markers))
    top_pct = (top_hits / 100) * 100
    all_pct = (all_hits / len(all_tweets)) * 100
    ratio = top_pct / all_pct if all_pct > 0 else 0
    marker_str = " 🔥" if ratio > 1.3 else ""
    print(f"  {category:<25} Top100: {top_pct:>5.1f}%  |  All: {all_pct:>5.1f}%  |  overindex: {ratio:.2f}x{marker_str}")

# ============================================
# 7. SENTENCE LENGTH & RHYTHM PATTERNS
# ============================================
print("\n" + "="*80)
print("7. SENTENCE RHYTHM & CADENCE ANALYSIS")
print("="*80)

def sentence_lengths(text):
    sents = re.split(r'[.!?\n]+', text)
    sents = [s.strip() for s in sents if s.strip() and len(s.strip()) > 3]
    return [len(s.split()) for s in sents]

top_sent_lens = []
all_sent_lens = []
for t in top_100:
    top_sent_lens.extend(sentence_lengths(t['text']))
for t in all_tweets:
    all_sent_lens.extend(sentence_lengths(t['text']))

if top_sent_lens:
    print(f"\n  Top 100 avg sentence length: {sum(top_sent_lens)/len(top_sent_lens):.1f} words")
    print(f"  All tweets avg sentence length: {sum(all_sent_lens)/len(all_sent_lens):.1f} words")
    
    short = sum(1 for l in top_sent_lens if l <= 5)
    med = sum(1 for l in top_sent_lens if 6 <= l <= 15)
    long = sum(1 for l in top_sent_lens if l > 15)
    total = len(top_sent_lens)
    print(f"\n  Top 100 sentence distribution:")
    print(f"    Short (1-5 words):  {short} ({short/total*100:.1f}%)")
    print(f"    Medium (6-15 words): {med} ({med/total*100:.1f}%)")
    print(f"    Long (16+ words):   {long} ({long/total*100:.1f}%)")

# ============================================
# 8. ENDINGS / CLOSERS
# ============================================
print("\n" + "="*80)
print("8. TWEET ENDING PATTERNS (How top tweets CLOSE)")
print("="*80)

def classify_ending(text):
    text = text.strip()
    last_lines = [l.strip() for l in text.split('\n') if l.strip()]
    if not last_lines: return 'empty'
    last = last_lines[-1]
    
    if last.endswith('?'): return 'question-close'
    if 'http' in last: return 'link-close'
    if last.endswith(('👇', '🧵', '↓', 'thread', 'below')): return 'thread-pointer'
    if last.endswith((':)', ':D', '😂', '🔥', '❤️', '💛', '🙏', '😭', '😊')): return 'emoji-close'
    if last.endswith(('...', '…')): return 'ellipsis-trail'
    if last.endswith('!'): return 'exclamation-close'
    if len(last.split()) <= 4: return 'short-punchy-close'
    return 'statement-close'

end_types_top = Counter(classify_ending(t['text']) for t in top_100)
end_types_all = Counter(classify_ending(t['text']) for t in all_tweets)

print(f"\n{'Ending Type':<25} {'Top 100':>10} {'All':>10}")
print("-"*50)
for typ, cnt in end_types_top.most_common():
    top_pct = (cnt/100)*100
    all_pct = (end_types_all.get(typ,0)/len(all_tweets))*100
    print(f"{typ:<25} {top_pct:>9.1f}% {all_pct:>9.1f}%")

# ============================================
# 9. VERBATIM PHRASES THAT RECUR IN TOP TWEETS
# ============================================
print("\n" + "="*80)
print("9. RECURRING EXACT PHRASES IN TOP 50 (3+ word spans)")
print("="*80)

def extract_trigrams(text):
    text = re.sub(r'https?://\S+', '', text).lower()
    words = re.findall(r"[a-z']+", text)
    return [f"{words[i]} {words[i+1]} {words[i+2]}" for i in range(len(words)-2)]

top_trigrams = Counter()
for t in top_50:
    top_trigrams.update(extract_trigrams(t['text']))

print("\n--- RECURRING TRIGRAMS (3+ occurrences) ---")
for tg, c in top_trigrams.most_common(30):
    if c >= 2:
        print(f"  \"{tg}\" — {c}x")

# ============================================
# 10. PER-ACCOUNT VOICE FINGERPRINT
# ============================================
print("\n" + "="*80)
print("10. PER-ACCOUNT VOICE FINGERPRINT")
print("="*80)

for acc in accounts:
    acc_tweets = [t for t in all_tweets if t['_account'] == acc]
    acc_top = sorted(acc_tweets, key=lambda x: x['_score'], reverse=True)[:30]
    
    texts = [t['text'] for t in acc_top]
    
    # Avg length
    avg_len = sum(len(t) for t in texts) / len(texts)
    
    # Lowercase start rate
    lc_start = sum(1 for t in texts if t and t[0].islower()) / len(texts) * 100
    
    # Question rate
    q_rate = sum(1 for t in texts if t.strip().endswith('?')) / len(texts) * 100
    
    # Linebreak rate
    lb_rate = sum(1 for t in texts if '\n' in t) / len(texts) * 100
    
    # Emoji rate
    emoji_rate = sum(1 for t in texts if re.search(r'[\U0001F300-\U0001FAFF\u2600-\u27BF]', t)) / len(texts) * 100
    
    # Link rate
    link_rate = sum(1 for t in texts if 'http' in t) / len(texts) * 100
    
    # Casual slang rate
    slang = ['ngl', 'tbh', 'imo', 'lol', 'bruh', 'bro', 'btw', 'fr', 'lowkey', 'kinda', 'gonna', 'wanna']
    slang_rate = sum(1 for t in texts if any(s in t.lower().split() for s in slang)) / len(texts) * 100
    
    print(f"\n  @{acc} (top 30 posts):")
    print(f"    Avg length:        {avg_len:.0f} chars")
    print(f"    Lowercase start:   {lc_start:.0f}%")
    print(f"    Ends with ?:       {q_rate:.0f}%")
    print(f"    Has linebreaks:    {lb_rate:.0f}%")
    print(f"    Has emoji:         {emoji_rate:.0f}%")
    print(f"    Has links:         {link_rate:.0f}%")
    print(f"    Uses slang:        {slang_rate:.0f}%")

print("\n\nDONE.")
