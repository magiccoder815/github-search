from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_view, name="search"),
    path('clear-cache/', views.clear_cache_view, name="clear-cache"),
]
