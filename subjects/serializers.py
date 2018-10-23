from rest_framework import serializers

from .models import Subject,Student,Teacher,SubjectField

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields="__all__"

class SubjectFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model=SubjectField
        fields=("id","name")

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ("user","choose_subjects")
        # depth=1

class SubjectSerializer(serializers.ModelSerializer):
    students=StudentSerializer(many=True)
    class Meta:
        model = Subject
        fields = ("id","name","status","register_at","deadline_at","students")

    # def create(self,validated_data):
    #     students=validated_data.pop('students')
    #     subject=Subject.objects.create(**validated_data)
    #     return subject

    # def update(self,instance,validated_data):
    #     students=validated_data.pop('students')
    #     instance.name=validated_data.get("name",instance.name)
    #     # instance.name=validated_data.get("status", True)
    #     instance.save()
    #     return instance
