# geopolitics_full_scraper.py

import json
import time
import hashlib
from datetime import datetime

import requests
import feedparser
import trafilatura
from bs4 import BeautifulSoup
from newspaper import Article

HEADERS = {"User-Agent": "Mozilla/5.0"}

OUTPUT_JSON = "geopolitics_full_dump.json"

SOURCES = [
    {"name": "Reuters World", "url": "http://feeds.reuters.com/reuters/worldNews"},
    {"name": "BBC World", "url": "http://feeds.bbci.co.uk/news/world/rss.xml"},
    {"name": "CNN World", "url": "http://rss.cnn.com/rss/edition_world.rss"},
    {"name": "Al Jazeera", "url": "https://www.aljazeera.com/xml/rss/all.xml"},
    {"name": "Guardian World", "url": "https://www.theguardian.com/world/rss"},
]

KEYWORDS = ["iran", "tehran", "us", "america", "pentagon"]

def now():
    return datetime.utcnow().isoformat()

def make_hash(x):
    return hashlib.md5(x.encode()).hexdigest()

def relevant(txt):
    t = txt.lower()
    return any(k in t for k in KEYWORDS)

def extract_media(url):
    imgs = []
    vids = []

    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        soup = BeautifulSoup(r.text, "html.parser")

        # Images
        for img in soup.find_all("img"):
            src = img.get("src") or img.get("data-src")
            if src and src.startswith("http"):
                imgs.append(src)

        # Videos
        for v in soup.find_all(["video", "iframe"]):
            src = v.get("src")
            if src:
                vids.append(src)

    except:
        pass

    return list(set(imgs))[:20], list(set(vids))[:10]

def extract_article(url):
    text = ""
    top_image = ""
    authors = []
    publish_date = ""

    try:
        art = Article(url)
        art.download()
        art.parse()

        text = art.text
        top_image = art.top_image
        authors = art.authors
        publish_date = str(art.publish_date)

    except:
        pass

    # fallback if text weak
    if len(text) < 500:
        try:
            downloaded = trafilatura.fetch_url(url)
            text = trafilatura.extract(downloaded) or text
        except:
            pass

    images, videos = extract_media(url)

    if top_image and top_image not in images:
        images.insert(0, top_image)

    return {
        "content": text,
        "authors": authors,
        "published": publish_date,
        "images": images,
        "videos": videos
    }

def run():
    final = []

    for source in SOURCES:
        print("Fetching:", source["name"])
        feed = feedparser.parse(source["url"])

        for entry in feed.entries[:15]:
            title = entry.get("title", "")
            url = entry.get("link", "")

            if not relevant(title):
                continue

            print(" -> Extracting:", title[:80])

            details = extract_article(url)

            final.append({
                "id": make_hash(url),
                "source": source["name"],
                "title": title,
                "url": url,
                "scraped_at": now(),
                **details
            })

            time.sleep(1)

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(final, f, indent=2, ensure_ascii=False)

    print("Saved:", OUTPUT_JSON)
    print("Records:", len(final))

if __name__ == "__main__":
    run()