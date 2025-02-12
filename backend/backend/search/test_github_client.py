import requests
import unittest
from unittest.mock import patch, MagicMock
from search.github_client import github_search

class TestGitHubSearch(unittest.TestCase):

    @patch('search.github_client.requests.get')
    def test_github_search_repositories(self, mock_get):
        # Mock the response data for repositories
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "total_count": 1,
            "items": [{"id": 1, "name": "test-repo", "url": "https://api.github.com/repos/test/test-repo"}]
        }
        mock_response.status_code = 200
        mock_get.return_value = mock_response
        
        # Call the function
        result = github_search(entity='repositories', query='test')

        # Assertions
        self.assertEqual(result["total_count"], 1)
        self.assertEqual(len(result["items"]), 1)
        self.assertEqual(result["items"][0]["name"], "test-repo")

    @patch('search.github_client.requests.get')
    def test_github_search_users(self, mock_get):
        # Mock the response data for users
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "total_count": 1,
            "items": [{"id": 1, "login": "test-user", "url": "https://api.github.com/users/test-user"}]
        }
        mock_response.status_code = 200
        mock_get.return_value = mock_response
        
        # Mock detailed user data fetch
        detailed_user_response = MagicMock()
        detailed_user_response.json.return_value = {"id": 1, "login": "test-user"}
        detailed_user_response.status_code = 200
        mock_get.side_effect = [mock_response, detailed_user_response]  # First call is for user search, second for user details

        # Call the function
        result = github_search(entity='users', query='test')

        # Assertions
        self.assertEqual(result["total_count"], 1)
        self.assertEqual(len(result["items"]), 1)
        self.assertEqual(result["items"][0]["login"], "test-user")

    @patch('search.github_client.requests.get')
    def test_github_search_request_exception(self, mock_get):
        mock_get.side_effect = requests.RequestException("Test exception")

        with self.assertRaises(requests.RequestException):
            github_search(entity='repositories', query='test')

if __name__ == '__main__':
    unittest.main()
