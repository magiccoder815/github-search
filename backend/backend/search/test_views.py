import json
import requests
from django.urls import reverse
from django.core.cache import cache
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch

class SearchViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('search')

    @patch('django.core.cache.cache.get')
    @patch('django.core.cache.cache.set')
    def test_search_valid_query(self, mock_cache_set, mock_cache_get):
        # Mock cache.get to return None (indicating a cache miss)
        mock_cache_get.return_value = None
        mock_response = {"items": [{"name": "example", "url": "http://example.com"}]}
        
        # Assuming github_search is patched to return a mock response
        with patch('search.views.github_search', return_value=mock_response):
            response = self.client.post(self.url, data=json.dumps({
                'query': 'example',
                'entity': 'repository',
                'per_page': 10,
                'page': 1
            }), content_type='application/json')
            
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data, mock_response)
            # Verify that cache.set was called with the correct arguments
            mock_cache_set.assert_called_once()

    @patch('django.core.cache.cache.get')
    @patch('django.core.cache.cache.set')
    def test_search_caching(self, mock_cache_set, mock_cache_get):
        # Mock the first call to return an empty list, simulating a cache miss
        mock_cache_get.side_effect = [None, {"items": []}]
        
        with patch('search.github_client.github_search', return_value={"items": []}):
            # First call should hit the github_search
            self.client.post(self.url, data=json.dumps({
                'query': 'test',
                'entity': 'repository'
            }), content_type='application/json')
        
        # Second call should return cached response
        response = self.client.post(self.url, data=json.dumps({
            'query': 'test',
            'entity': 'repository'
        }), content_type='application/json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"items": []})

    @patch('search.views.github_search')
    def test_search_github_request_exception(self, mock_github_search):
        with patch('django.core.cache.cache.get', return_value=None):
            mock_github_search.side_effect = requests.RequestException("Error occurred")
            response = self.client.post(self.url, data=json.dumps({
                'query': 'example',
                'entity': 'repository'
            }), content_type='application/json')
            
            self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
            self.assertEqual(response.data, {"error": "Error occurred"})

class ClearCacheViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('clear-cache')

    @patch('django.core.cache.cache.clear')
    def test_clear_cache(self, mock_cache_clear):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"message": "Cache cleared successfully"})
        # Verify that cache.clear was called
        mock_cache_clear.assert_called_once()
