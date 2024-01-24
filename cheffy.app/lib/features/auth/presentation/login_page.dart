import 'package:cheffy/common/components/auth_button.dart';
import 'package:cheffy/common/components/text_field.dart';
import 'package:cheffy/common/mixins/firebase_user.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  final Function()? onTap;
  const LoginPage({super.key, required this.onTap});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> with FirebaseUserMixin {
  // Text editing controllers
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  // Sign user in
  void signIn() async {
    // Show loading circle
    showDialog(
        context: context,
        builder: (context) => const Center(
              child: CircularProgressIndicator(),
            ));

    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: _emailController.text, password: _passwordController.text);

      final firebaseUser = FirebaseAuth.instance.currentUser;

      // Save user data locally
      saveUserData(firebaseUser);

      // Pop loading circle if successful
      if (context.mounted) Navigator.pop(context);
    } on FirebaseAuthException catch (e) {
      // Pop loading circle if failed
      // ignore: use_build_context_synchronously
      Navigator.pop(context);

      // TODO: Work on error message styling
      // Show error message
      displayMessage(e.code);
    }
  }

  void displayMessage(String message) {
    showDialog(
        context: context,
        builder: (context) => AlertDialog(title: Text(message)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xffD2DBE4),
        body: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            children: [
              const SizedBox(
                height: 80,
              ),

              // Logo
              Image.asset(
                'lib/images/cheffy_logo.png',
                width: 200,
                height: 200,
              ),

              const SizedBox(
                height: 50,
              ),

              // Login form
              _loginForm()
            ],
          ),
        ));
  }

  Container _loginForm() {
    return Container(
      margin: const EdgeInsets.only(left: 20, right: 20),
      child: Column(
        children: [
          // Page name
          const Text(
            "Login",
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
          ),

          const SizedBox(height: 30),

          // Email textfield
          MyTextField(
              controller: _emailController,
              hintText: "Email or phone number",
              obscureText: false),

          const SizedBox(height: 20),

          // Password textfield
          MyTextField(
              controller: _passwordController,
              hintText: "Password",
              obscureText: true),

          const SizedBox(
            height: 20,
          ),

          // Forgot password
          Row(mainAxisAlignment: MainAxisAlignment.end, children: [
            GestureDetector(
              onTap: () {},
              child: const Text(
                "Forgot your password?",
                style: TextStyle(
                    fontWeight: FontWeight.w400,
                    fontSize: 14,
                    color: Color(0xff222921)),
                textAlign: TextAlign.right,
              ),
            )
          ]),

          const SizedBox(
            height: 50,
          ),

          // Login button
          AuthButton(onTap: signIn, text: "Login"),

          const SizedBox(
            height: 20,
          ),

          // Create account link
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Don't have an account?",
                  style: (TextStyle(fontSize: 14))),
              const SizedBox(
                width: 4,
              ),
              GestureDetector(
                onTap: widget.onTap,
                child: const Text(
                  "Signup",
                  style: (TextStyle(color: Color(0xff85a562), fontSize: 14)),
                ),
              )
            ],
          ),
          // Container(
          //   margin: const EdgeInsets.only(top: 30),
          //   child: Text.rich(TextSpan(
          //       text: "Don't have an account? ",
          //       style: (const TextStyle(fontSize: 16)),
          //       children: <TextSpan>[
          //         TextSpan(
          //           text: 'Signup',
          //           style: (const TextStyle(color: Color(0xff85a562))),
          //           recognizer: TapGestureRecognizer()
          //             ..onTap = () => Navigator.push(
          //                 context,
          //                 MaterialPageRoute(
          //                     builder: (context) => const RegisterPage())),
          //         )
          //       ])),
          // )
        ],
      ),
    );
  }
}
