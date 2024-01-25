import 'package:cheffy/common/components/auth_button.dart';
import 'package:cheffy/common/components/text_field.dart';
import 'package:cheffy/common/mixins/firebase_user.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatefulWidget {
  final Function()? onTap;
  const RegisterPage({super.key, required this.onTap});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> with FirebaseUserMixin {
  late final TextEditingController _userName = TextEditingController();
  late final TextEditingController _email = TextEditingController();
  // late final TextEditingController _phoneNumber = TextEditingController();
  late final TextEditingController _password = TextEditingController();
  late final TextEditingController _passwordConfirm = TextEditingController();

  void signUp() async {
    // Show loading circle
    showDialog(
        context: context,
        builder: (context) => const Center(
              child: CircularProgressIndicator(),
            ));

    if (_password.text != _passwordConfirm.text) {
      // Pop loading circle
      Navigator.pop(context);

      // Show error message
      displayMessage("Passwords do not match");
      return;
    }

    try {
      await FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: _email.text, password: _password.text);

      final firebaseUser = FirebaseAuth.instance.currentUser;

      // Save user data locally
      saveUserData(firebaseUser);

      // Pop loading circle if successful
      if (context.mounted) Navigator.pop(context);
    } on FirebaseAuthException catch (e) {
      // Pop loading circle if failed
      Navigator.pop(context);

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
        body: SafeArea(
          child: Padding(
              padding: const EdgeInsets.only(left: 20, right: 20),
              child: Center(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Page title
                      const Text(
                        "Signup",
                        style: TextStyle(
                            fontSize: 24, fontWeight: FontWeight.w600),
                      ),

                      const SizedBox(
                        height: 30,
                      ),

                      // Username textfield
                      MyTextField(
                          controller: _userName,
                          hintText: "User name",
                          obscureText: false),

                      const SizedBox(
                        height: 20,
                      ),

                      // Email textfield
                      MyTextField(
                          controller: _email,
                          hintText: "Email",
                          obscureText: false),

                      const SizedBox(
                        height: 20,
                      ),

                      // Passowrd textfield
                      MyTextField(
                          controller: _password,
                          hintText: "Password",
                          obscureText: true),

                      const SizedBox(
                        height: 20,
                      ),

                      // Confirm password textfield
                      MyTextField(
                          controller: _passwordConfirm,
                          hintText: "Confirm Password",
                          obscureText: true),

                      const SizedBox(
                        height: 100,
                      ),

                      // Signup button
                      AuthButton(onTap: signUp, text: "Signup"),

                      const SizedBox(
                        height: 20,
                      ),

                      // Signin link

                      // Create account link
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text("Already have an account?",
                              style: (TextStyle(fontSize: 14))),
                          const SizedBox(
                            width: 4,
                          ),
                          GestureDetector(
                            onTap: widget.onTap,
                            child: const Text(
                              "Signin",
                              style: (TextStyle(
                                  color: Color(0xff85a562), fontSize: 14)),
                            ),
                          )
                        ],
                      ),
                    ]),
              )),
        ));
  }
}
