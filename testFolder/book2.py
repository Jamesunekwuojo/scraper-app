# from bs4 import BeautifulSoup
# import requests

# def scrape_open_textbook_library(query):
#     url = f"https://open.umn.edu/opentextbooks/textbooks?term={query}"
#     response = requests.get(url)
    
#     print(f"Status Code: {response.status_code}")
#     if response.status_code != 200:
#         print("Failed to retrieve the webpage")
#         return []
    
#     soup = BeautifulSoup(response.content, "lxml-xml")
#     books = soup.find_all("div", class_="book")
    
#     print(f"Found {len(books)} books")
#     if not books:
#         print("No books found, the page structure might have changed.")
    
#     book_list = []
#     for item in books:
#         title = item.find("h4").text.strip()
#         author = item.find("div", class_="author").text.strip() if item.find("div", class_="author") else "Unknown"
#         link = item.find("a", class_="button")["href"]
#         book_list.append({"title": title, "author": author, "link": link})

#     return book_list

# # Example usage
# books = scrape_open_textbook_library("biology")
# for book in books:
#     print(f"Title: {book['title']}, Author: {book['author']}, Link: {book['link']}")

import os
import requests
from bs4 import BeautifulSoup

def create_folder(folder_name):
    documents_folder = os.path.expanduser('~/Documents')
    folder_path = os.path.join(documents_folder, folder_name)
    os.makedirs(folder_path, exist_ok=True)
    return folder_path

def search_books(book_title):
    search_url = f"https://www.pdfdrive.com/search?q={book_title.replace(' ', '+')}&pagecount=&pubyear=&searchin=&em="
    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    books = []
    for item in soup.select('li')[:10]:
        link_tag = item.find('a', href=True)
        link = "https://www.pdfdrive.com" + link_tag['href'] if link_tag else None
        if link:
            books.append(link)
    return books

def download_book(book_url, folder_path):
    book_page = requests.get(book_url)
    soup = BeautifulSoup(book_page.text, 'html.parser')
    title_tag = soup.select_one('h1')
    title = title_tag.text.strip() if title_tag else "Unknown Title"
    author_tag = soup.select_one('.file-info span')
    author = author_tag.text.strip() if author_tag else "Unknown Author"
    year_tag = soup.select_one('.fi-year')
    year = year_tag.text.strip() if year_tag else "Unknown Year"
    download_button = soup.select_one('#download-button .btn-primary')
    print(download_button)
    download_link = "https://www.pdfdrive.com" + download_button['href'] if download_button else None
    
    if download_link:
        response = requests.get(download_link)
        file_name = f"{title} - {author} ({year}).pdf"
        file_path = os.path.join(folder_path, file_name)
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded: {file_name}")
    else:
        print(f"Download link not found for: {title}")

def main():
    book_title = input("Enter the book title: ")
    folder_name = input("Enter the folder name: ")
    folder_path = create_folder(folder_name)
    book_urls = search_books(book_title)
    for url in book_urls:
        download_book(url, folder_path)
    print(f"Downloaded books to {folder_path}")

if __name__ == "__main__":
    main()
