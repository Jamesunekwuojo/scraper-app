# Testing books url
import requests
from bs4 import BeautifulSoup

def scrape_gutenberg(query):
    url = f"https://www.gutenberg.org/ebooks/search/?query={query}&submit_search=Go%21"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    books = []
    for item in soup.find_all("li", class_="booklink"):
        title = item.find("span", class_="title").text
        author = item.find("span", class_="subtitle").text if item.find("span", class_="subtitle") else "Unknown"
        link = "https://www.gutenberg.org" + item.find("a")["href"]
        books.append({"title": title, "author": author, "link": link})

    return books

# Example usage
books = scrape_gutenberg("operating system")
for book in books:
    print(f"Title: {book['title']}, Author: {book['author']}, Link: {book['link']}")
