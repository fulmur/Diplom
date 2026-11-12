from flask import Blueprint, render_template, redirect, url_for, request, abort
from app import db
from app.models import Course

bp = Blueprint('main', __name__)

SECRET_ADMIN_URL = 'admin2187'

@bp.route('/')
def index():
    courses = Course.query.all()  
    return render_template('index.html', title="ChineseJJTime", courses=courses)

@bp.route(f'/{SECRET_ADMIN_URL}', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        badge = request.form.get('badge')
        price = request.form.get('price')
        
        new_course = Course(
            title=title, 
            description=description, 
            badge=badge, 
            price=int(price) if price else None
        )
        db.session.add(new_course)
        db.session.commit()
        
        return redirect(url_for('main.admin')) 
        
    courses = Course.query.all()
    return render_template('admin.html', courses=courses)

@bp.route('/admin')
def old_admin():
    abort(404)

@bp.route('/admin/delete/<int:id>')
def delete_course(id):
    course_to_delete = Course.query.get_or_404(id)
    db.session.delete(course_to_delete)
    db.session.commit()
    return redirect(url_for('main.admin'))
