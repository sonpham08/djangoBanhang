from django import forms
from django.contrib.auth.forms import UserCreationForm,PasswordResetForm
from django.db import transaction
from django.forms.utils import ValidationError

from .models import User

class SignUpForm(UserCreationForm):
    # interests = forms.ModelMultipleChoiceField(
    #     queryset=Subject.objects.all(),
    #     widget=forms.CheckboxSelectMultiple,
    #     required=True
    # )
    fullname=forms.CharField(required=True, label="Fullname")
    email=forms.CharField(required=True, label="Email")
    mssv=forms.CharField(required=True, label="ID student")
    grade=forms.CharField(required=True, label="Grade")
    user_field=forms.ChoiceField(required=True, label="Major")

    class Meta(UserCreationForm.Meta):
        model = User
        fields=('fullname','email','mssv','grade','user_field', "username", "password1","password2", )

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_student = True
        user.fullname=self.cleaned_data["fullname"]
        user.email=self.cleaned_data["email"]
        user.mssv=self.cleaned_data["mssv"]
        user.grade=self.cleaned_data["grade"]
        user.user_field=self.cleaned_data["user_field"]
        user.save()
        student = Student.objects.create(user=user)
        # student.interests.add(*self.cleaned_data.get('interests'))
        return user