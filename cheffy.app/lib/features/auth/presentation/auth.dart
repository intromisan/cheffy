import 'package:cheffy/common/components/navigation_bar.dart';
import 'package:cheffy/features/auth/presentation/login_or_register.dart';
import 'package:cheffy/features/auth/presentation/onboarding/onboarding_page.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

bool firstTime = true;

class AuthPage extends StatelessWidget {
  const AuthPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: StreamBuilder(
          stream: FirebaseAuth.instance.authStateChanges(),
          builder: (context, snapshot) {
            // user authenticated
            if (snapshot.hasData) {
              return firstTime ? OnboardingPage() : NavigationBarView();
            }

            // user NOT authenticated
            else {
              return const LoginOrRegister();
            }
          }),
    );
  }
}
