import pytest
import json
from server.db import get_db


def test_categories(client):
  response = client.get('/')
  assert response is not None
  print(json.loads(response.data))
  assert len(response.data.categories) > 0
  # assert response.data.categories[0]['alias'] is b'afghani'