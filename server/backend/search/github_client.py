import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch the GITHUB_API_URL from the environment variable
GITHUB_API_URL = os.getenv("GITHUB_API_URL", "https://api.github.com/search")

def github_search(entity, query, per_page=15, page=1):
    url = f"{GITHUB_API_URL}/{entity}"
    params = {
        "q": query,
        "per_page": per_page,
        "page": page
    }
    response = requests.get(url, params=params)
    response.raise_for_status()  # Raise an error if the request failed
    data = response.json()

    # Fetch detailed user data if entity is 'users'
    if entity == "users":
        detailed_items = []
        for user in data.get('items', []):
            user_details = requests.get(user['url'])
            if user_details.status_code == 200:
                detailed_items.append(user_details.json())
            else:
                detailed_items.append(user)  # Fallback if detailed data fetch fails

        data['items'] = detailed_items  # Replace items with detailed data

    return data
