import json
import sqlite3

# Define function for creating "INSERT" statements. Accepts JSON obj.
def create_statement(obj):
  alias = obj['alias']
  title = obj['title']
  parent = obj['parents'][0]

  if 'country_whitelist' in obj.keys():
    whitelist = ','.join(obj['country_whitelist'])
  else:
    whitelist = None
  
  if 'country_blacklist' in obj.keys():
    blacklist = ','.join(obj['country_blacklist'])
  else:
    blacklist = None
  
  # I can't figure out how to do this programmatically so will need to manually replace 'NULL' with NULL in sql file
  statement = insert_category.format('NULL', alias, title, parent, 'NULL' if whitelist is None else whitelist, 'NULL' if blacklist is None else blacklist)
  
  # print(statement)
  return statement
  


# Open categories.json
f = open('categories.json')

# Create dictionary out of JSON object
data = json.load(f)

# Define storage objects for further iteration
restaurant_aliases = []
insert_statements = []

# Define SQL statement for string building
insert_category = "INSERT INTO categories (id, alias, title, parents, whitelist, blacklist) VALUES ({}, '{}', '{}', '{}', '{}', '{}');\n"

# Iterate through JSON object
for obj in data:
  if 'restaurants' in obj['parents']:
    restaurant_aliases.append(obj['alias'])
    statement = create_statement(obj)
    insert_statements.append(statement)
    # print(statement)  

# Scan for restaurants with parents that are restaurants
more_aliases = []
for obj in data:
  if len(obj['parents']) > 0 and obj['parents'][0] in restaurant_aliases:
    more_aliases.append(obj['alias'])
    statement = create_statement(obj)
    insert_statements.append(statement)
    # print(statement)  

# Scan for third tier (?)
extra_alias = []
for obj in data:
  if len(obj['parents']) > 0 and obj['parents'][0] in more_aliases:
    extra_alias.append(obj['alias'])
    statement = create_statement(obj)
    insert_statements.append(statement)
    # print(statement) 

# Write INSERT statements to SQL schema
schema_file = open('../schema.sql', 'a')
for st in insert_statements:
  schema_file.write(st)
schema_file.close()

# Closing file
f.close()

print("Finished creating schema.sql file")
# print("First-tier: ", len(restaurant_aliases))
# print("Second-tier: ", len(more_aliases))
# print("Third-tier: ", len(extra_alias))
# tot_alias = len(restaurant_aliases) + len(more_aliases) + len(extra_alias)
# print("All statements: ", len(insert_statements))
# print("(assert) True?: ", (len(insert_statements).__eq__(tot_alias)))