from django.urls import path
from .views import UserSignIn, UserLogout, ChangePasswordView, RequestPasswordResetView, ResetPasswordView, CustomTokenObtainPairView, VerifyTokenView

urlpatterns = [
    path('sign_in/', UserSignIn.as_view(), name='sign_in'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('request_reset_password/', RequestPasswordResetView.as_view(),
         name='request_reset_password'),
    path('reset_password/', ResetPasswordView.as_view(), name='reset_password'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('verify-token/', VerifyTokenView.as_view(), name='verify_token'),
]
