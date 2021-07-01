import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from server.db import get_db

################################################################################
################################################################################
################################################################################
""""
This file was created by following the Flask "Flaskr Blog" tutorial. It's purpose
is to create an authentication service for allowing the creation and use of 
user accounts within the application.

I do not need this yet, so will return to this at a later date once I feel it is
of a greater importance.
"""
################################################################################
################################################################################
################################################################################

# A Blueprint is a collection of *views*, which are like routes that a user can navigate to.
bp = Blueprint('auth', __name__, url_prefix='/auth')

"""
The user registration function.
Returns an HTML file to redirect the user to. 
"""
@bp.route('/register', methods=('GET', 'POST'))
def register():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    db = get_db()
    error = None

    if not username:
      error = 'Username is required.'
    elif not password:
      error = 'Password is required.'
    elif db.execute(
      'SELECT id FROM user WHERE username = ?', (username,)
    ).fetchone() is not None:
      error = f"User {username} is already registered."

    if error is None:
      # generate_password_hash is used to securely store passwords
      db.execute(
        'INSERT INTO user (username, password) VALUES (?, ?)',
        (username, generate_password_hash(password))
      )
      db.commit()
      return redirect(url_for('auth.login'))

    flash(error)

  return render_template('auth/register.html')

"""
The login function. 
Returns an HTML template to redirect to based on result.
"""
@bp.route('/login', methods=('GET', 'POST'))
def login():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    db = get_db()
    error = None
    user = db.execute(
      'SELECT * FROM user WHERE username = ?', (username,)
    ).fetchone()

    if user is None:
      error = 'Incorrect username.'
    elif not check_password_hash(user['password'], password):
      error = 'Incorrect password.'

    if error is None:
      # session stores user data in a cookie in the browser
      session.clear()
      session['user_id'] = user['id']
      return redirect(url_for('index'))

    flash(error)

  return render_template('auth/login.html')

"""
Function to check if a user is logged into this session.
If so, it will display user information on the page.
"""
@bp.before_app_request
def load_logged_in_user():
  user_id = session.get('user_id')

  if user_id is None:
    g.user = None
  else:
    g.user = get_db().execute(
      'SELECT * FROM user WHERE id = ?', (user_id,)
    ).fetchone()

"""
Logout function. Clears session.
"""
@bp.route('/logout')
def logout():
  session.clear()
  return redirect(url_for('index'))

"""
A decorator function that defines a requirement for authentication in order for
a user to access other views.
"""
def login_required(view):
  @functools.wraps(view)
  # The wrapped function redirects to the login page or continues to the 
  # request view depending on whether the user is logged in.
  # (Remember: 'g' is a storage unit that exists for the life of a single request)
  def wrapped_view(**kwargs):
    if g.user is None:
      return redirect(url_for('auth.login'))

    return view(**kwargs)

  return wrapped_view

