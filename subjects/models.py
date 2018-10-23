# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Teacher(models.Model):
    user= models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user.username

class SubjectField(models.Model):
    name=models.CharField(max_length=255, default="unknow")
    create_by=models.ForeignKey(Teacher,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Create your models here.
class Subject(models.Model):
    name = models.CharField(max_length=255, default="unknow")
    status = models.BooleanField(default=False)
    register_at=models.DateTimeField(auto_now_add=True, null=True)
    deadline_at=models.DateTimeField(blank=True, null=True)
    field=models.ForeignKey(SubjectField, on_delete=models.CASCADE, default=0)

    def __str__(self):
        return self.name

    # @property
    # def students(self):
    #     return self.interested_students.all()

    # def get_html_badge(self):
    #     name = escape(self.name)
    #     status = escape(self.status)
    #     html = '<span class="badge badge-primary" style="background-color: %s">%s</span>' % (color, name)
    #     return mark_safe(html)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    choose_subjects = models.ManyToManyField(Subject, related_name='interested_students')

    # def get_unanswered_questions(self, quiz):
    #     answered_questions = self.quiz_answers \
    #         .filter(answer__question__quiz=quiz) \
    #         .values_list('answer__question__pk', flat=True)
    #     questions = quiz.questions.exclude(pk__in=answered_questions).order_by('text')
    #     return questions

    def __str__(self):
        return self.user.fullname