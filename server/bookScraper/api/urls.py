from django.urls import path
from .views import search_books_view, download_book_view, signup_view, login_view, logout_view, get_user_view

urlpatterns = [
    path('search/', search_books_view, name='search_books'),
    path('download/', download_book_view, name='download_book'),
    
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('user/', get_user_view, name='get_user'),
    
    # path('login/', login_view, name='login'),
    # path('logout/', logout_view, name='logout'),
    # path('register/', register_view, name='register'),
    # path('user-profile/', user_profile_view, name='user-profile'),
    
    
]
