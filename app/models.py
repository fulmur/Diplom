from app import db

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)       
    description = db.Column(db.Text, nullable=False)        
    badge = db.Column(db.String(50), nullable=False)         
    price = db.Column(db.Integer, nullable=True)             

    def __repr__(self):
        return f'<Course {self.title}>'
