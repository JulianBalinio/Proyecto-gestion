from django.urls import path
from .views import UserSignUp, UserSignIn

urlpatterns = [
    path('sign_in/', UserSignIn.as_view(), name='sign_in'),
    path('sign_up/', UserSignUp.as_view(), name='sign_up')
    ]