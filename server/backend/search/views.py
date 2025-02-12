import requests
from django.shortcuts import render
from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .github_client import github_search

@api_view(['POST'])
def search_view(request):
    """
    Search for GitHub entities based on the provided query.

    **Request Body:**
    - `query`: str (required) - The search term (minimum 3 characters).
    - `entity`: str (required) - The type of entity to search (e.g., 'repository').
    - `per_page`: int (optional) - Number of results per page (default is 15).
    - `page`: int (optional) - The page number to retrieve (default is 1).

    **Responses:**
    - 200: Returns a list of search results.
    - 400: Invalid query (less than 3 characters).
    - 500: Error when calling the GitHub API.

    **Example Request:**
    ```json
    {
        "query": "test",
        "entity": "repository",
        "per_page": 10,
        "page": 1
    }
    ```

    **Example Response:**
    ```json
    {
        "results": [
            {
                "id": 123456,
                "name": "test-repo",
                "url": "https://github.com/user/test-repo"
            }
        ]
    }
    ```

    """
    query = request.data.get('query')
    entity = request.data.get('entity')
    per_page = int(request.data.get('per_page', 15))
    page = int(request.data.get('page', 1))

    if not query or len(query) < 3:
        return Response({"error": "Query must be at least 3 characters long."}, status=status.HTTP_400_BAD_REQUEST)

    cache_key = f"{entity}_{query}_page_{page}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)

    try:
        data = github_search(entity, query, per_page=per_page, page=page)
        cache.set(cache_key, data, timeout=7200)  # Cache for 2 hours
        return Response(data)
    except requests.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def clear_cache_view(request):
    """
    Clear the Redis cache.

    **Responses:**
    - 200: Cache cleared successfully.
    
    **Example Response:**
    ```json
    {
        "message": "Cache cleared successfully"
    }
    ```
    """
    cache.clear()
    return Response({"message": "Cache cleared successfully"}, status=status.HTTP_200_OK)
