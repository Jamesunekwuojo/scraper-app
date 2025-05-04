import os
import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes

from rest_framework.permissions import IsAuthenticated, AllowAny

from django.contrib.auth.models import User

from django.contrib.auth import authenticate, login, logout

from django.views.decorators.csrf import csrf_exempt

import json



def create_folder(folder_name):
    """
    Create a folder in the user's Documents directory if it doesn't exist.
    """
    documents_folder = os.path.expanduser('~/Documents')
    folder_path = os.path.join(documents_folder, folder_name)
    os.makedirs(folder_path, exist_ok=True)
    return folder_path

def search_books(book_title):
    """
    Search for books on PDFDrive using the provided book title.
    """
    search_url = f"https://www.pdfdrive.com/search?q={book_title.replace(' ', '+')}&pagecount=&pubyear=&searchin=&em="
    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    books = []

    # Extract the first 10 books
    for item in soup.select('li'):
        link_tag = item.find('a', href=True)
        link = "https://www.pdfdrive.com" + link_tag['href'] if link_tag else None
        
        # Use the updated logic to fetch the title
        title_tag = item.select_one('h2')  # Adjust selector if 'h1' is not accurate
        title = title_tag.text.strip() if title_tag else "Unknown Title"
        
        if link:
            books.append({"title": title, "link": link})
    return books


@csrf_exempt
@api_view(['GET'])
def search_books_view(request):
    """
    API endpoint to search for books by title.
    """
    book_title = request.GET.get('q', '')
    if not book_title:
        return JsonResponse({'error': 'No book title provided'}, status=400)

    books = search_books(book_title)
    print(f"books: {books}")
    return JsonResponse({'books': books})

@csrf_exempt
@api_view(['POST'])
def download_book_view(request):
    """
    API endpoint to download a book from a given URL.
    """
    book_url = request.data.get('url')
    folder_name = request.data.get('folder', 'Downloads')

    if not book_url:
        return JsonResponse({'error': 'No book URL provided'}, status=400)

    folder_path = create_folder(folder_name)

    # Fetch the book page to extract download link and metadata
    book_page = requests.get(book_url)
    if book_page.status_code != 200:
        return JsonResponse({'error': 'Failed to fetch book page'}, status=400)

    soup = BeautifulSoup(book_page.text, 'html.parser')
    title_tag = soup.select_one('h1')
    title = title_tag.text.strip() if title_tag else "Unknown Title"
    author_tag = soup.select_one('.file-info span')
    author = author_tag.text.strip() if author_tag else "Unknown Author"
    year_tag = soup.select_one('.fi-year')
    year = year_tag.text.strip() if year_tag else "Unknown Year"

    # Find the actual download link
    download_button = soup.select_one('#download-button .btn-primary')
    download_link = "https://www.pdfdrive.com" + download_button['href'] if download_button else None

    if not download_link:
        return JsonResponse({'error': 'Download link not found for the requested book'}, status=400)

    # Download the file from the download link
    download_response = requests.get(download_link, stream=True)
    if download_response.status_code != 200:
        return JsonResponse({'error': 'Failed to download the book file'}, status=400)

    # Define the file name and path
    file_name = f"{title} - {author} ({year}).pdf"
    file_path = os.path.join(folder_path, file_name)

    try:
        # Write the downloaded content to a file
        with open(file_path, 'wb') as file:
            for chunk in download_response.iter_content(chunk_size=8192):
                if chunk:
                    file.write(chunk)

        return JsonResponse({'message': f'Book downloaded successfully as {file_name}', 'file_path': file_path})
    except Exception as e:
        return JsonResponse({'error': f'Failed to save the book file: {str(e)}'}, status=500)




@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            # Validate input
            if not username or not email or not password:
                return JsonResponse({'error': 'All fields are required'}, status=400)

            # Check if the username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already taken'}, status=400)

            # Create the user
            user = User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse({'message': 'User created successfully', 'username': user.username})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'username': user.username})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful'})
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def get_user_view(request):
    if request.user.is_authenticated:
        return JsonResponse({ 'username': request.user.username, 'email': request.user.email})
    return JsonResponse({'error': 'User not authenticated'}, status=401)
