import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext

def get_db():
  if 'db' not in g:
    g.db = sqlite3.connect(
      current_app.config['DATABASE'],
      detect_types=sqlite3.PARSE_DECLTYPES
    )
    g.db.row_factory = sqlite3.Row

  return g.db

def close_db(e=None):
  db = g.pop('db', None)

  if db is not None:
    db.close()

def query_db(query, args=(), one=False):
  db = get_db()
  cur = None

  # try-catch to manage con.rollback() upon failure
  try:
    with db:
      cur = db.execute(query, args)
  except sqlite3.DatabaseError:
    print("error sqlite")

  rowval = cur.fetchall()
  db.commit()
  cur.close()
  return (rowval[0] if rowval else None) if one else rowval

def init_db():
  db = get_db()
  # opens a file relative to the package. good for solving deployment issues
  with current_app.open_resource('schema.sql') as f:
    db.executescript(f.read().decode('utf8'))

# click.command() instantiates a command line command
@click.command('init-db')
@with_appcontext
def init_db_command():
  """Clear the existing data and create new tables."""
  init_db()
  click.echo('Initialized the database.')

"""
  This function inits the previous two functions in order to register with the 
  application instance. 
  Since I am using a factory function, I need to pass in the application. 
"""
def init_app(app):
  # tells Flask to call that function when cleaning up after returning the response.
  app.teardown_appcontext(close_db)
  # adds a new command that can be called with the flask command.
  app.cli.add_command(init_db_command)
