# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import redirect, render

# Create your views here.
def home(request):
    if request.user.is_authenticated:
        if request.user.is_teacher:
            return redirect('index')
        else:
            return redirect('subjects/tepmlates/classroom/index.html')
    return render(request, 'classroom/home.html')

def index(request):
    print("davao")
    return render(request, 'classroom/index.html')