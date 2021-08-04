from flask import jsonify
from flask import request
from flask import Blueprint
import os
import json
import requests

from server.db import get_db, query_db

bp = Blueprint('yab', __name__)

######### Auxilliary Functions ##################


######### Endpoints #############################

@bp.route('/categories')
def categories():
  # NOTE: HARDCODING WHITELIST FOR "US" FOR NOW (6/30)
  category_list = query_db('SELECT * FROM categories WHERE (whitelist IS NULL AND blacklist IS NULL) OR instr(whitelist, "US") > 0 OR instr(blacklist, "US") = 0;')
  categories = []
  for cat in category_list:
    categories.append(dict(cat))
  print('returning categories')
  return jsonify(categories=categories)

@bp.route('/search', methods=["POST"])
def search():
  error = 'Error in /search'
  search_obj = {}
  if request.method == "POST" and request.json:
    search_obj = request.json
    print('New object is: ' + json.dumps(search_obj))
  else:
    return error
  
  # Make Yelp API request
  # TODO: CHAANGE THIS FROM BEING HARDCODED ... should be "search_obj['address']"
  location = '1356 Independence Ave SE, Washington, DC 20003'
  request_params = {
    'location': location,
    'categories': search_obj['category']
  }

  authString = 'Bearer ' + os.environ.get('YELP_KEY')
  yelp_response = requests.get(
    'https://api.yelp.com/v3/businesses/search',
    params=request_params,
    headers={'Authorization': authString}
  )

  response = {}
  if yelp_response.status_code != 200:
    error = 'failed request'
    return jsonify(error=response)
  else: 
    response = yelp_response.json()

  print(response)

  return jsonify(businesses=response['businesses'])
