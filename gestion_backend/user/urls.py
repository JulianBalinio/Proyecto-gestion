from django.urls import path
from .views import UserSignUp, UserSignIn, UserLogout, ChangePasswordView
urlpatterns = [
    path('sign_in/', UserSignIn.as_view(), name='sign_in'),
    path('sign_up/', UserSignUp.as_view(), name='sign_up'),
    path('logout/', UserLogout.as_view({'post': 'logout'}), name='logout'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    ]