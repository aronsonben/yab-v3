from flask import jsonify
from flask import request
from flask import Blueprint

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
