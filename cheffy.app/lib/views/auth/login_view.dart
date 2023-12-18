import 'package:cheffy/views/auth/register_view.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  late final TextEditingController _email;
  late final TextEditingController _password;
  late bool _passwordVisible;

  @override
  void initState() {
    _email = TextEditingController();
    _password = TextEditingController();
    _passwordVisible = false;
    super.initState();
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  void togglePassword() {
    setState(() {
      _passwordVisible = !_passwordVisible;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffD2DBE4),
      body: Column(
        children: [const SizedBox(height: 350), _loginForm()],
      ),
    );
  }

  Container _loginForm() {
    return Container(
      margin: const EdgeInsets.only(left: 20, right: 20),
      child: Column(
        children: [
          const Text(
            "Login",
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
          ),
          Container(
            margin: const EdgeInsets.only(top: 30),
            decoration: BoxDecoration(
                borderRadius: const BorderRadius.all(Radius.circular(50.0)),
                boxShadow: [
                  BoxShadow(
                      color: const Color(0xff222921).withOpacity(0.11),
                      blurRadius: 2,
                      spreadRadius: 0.0,
                      offset: const Offset(0, 2))
                ]),
            child: TextField(
              controller: _email,
              decoration: const InputDecoration(
                contentPadding:
                    EdgeInsets.only(top: 15, right: 20, bottom: 15, left: 20),
                hintText: 'Email or phone number',
                filled: true,
                fillColor: Color(0xffe6e9f0),
                hintStyle: TextStyle(color: Color(0xffb5b3b9)),
                border: OutlineInputBorder(
                    borderSide: BorderSide(width: 0, style: BorderStyle.none),
                    borderRadius: BorderRadius.all(Radius.circular(50.0))),
              ),
              obscureText: false,
              autocorrect: false,
              enableSuggestions: false,
              keyboardType: TextInputType.emailAddress,
            ),
          ),
          Container(
            margin: const EdgeInsets.only(top: 20),
            decoration: BoxDecoration(
                borderRadius: const BorderRadius.all(Radius.circular(50.0)),
                boxShadow: [
                  BoxShadow(
                      color: const Color(0xff222921).withOpacity(0.11),
                      blurRadius: 2,
                      spreadRadius: 0.0,
                      offset: const Offset(0, 2))
                ]),
            child: TextField(
              controller: _password,
              decoration: InputDecoration(
                contentPadding: const EdgeInsets.only(
                    top: 12, right: 20, bottom: 12, left: 20),
                hintText: 'Password',
                suffixIconColor: _passwordVisible
                    ? const Color(0xffd2dbe4)
                    : const Color(0xff85a562),
                suffixIcon: IconButton(
                  onPressed: () {
                    togglePassword();
                  },
                  icon: const Icon(Icons.remove_red_eye),
                ),
                filled: true,
                fillColor: const Color(0xffe6e9f0),
                hintStyle: const TextStyle(color: Color(0xffb5b3b9)),
                border: const OutlineInputBorder(
                    borderSide: BorderSide(width: 0, style: BorderStyle.none),
                    borderRadius: BorderRadius.all(Radius.circular(50.0))),
              ),
              obscureText: _passwordVisible,
              autocorrect: false,
              enableSuggestions: false,
            ),
          ),
          Container(
            margin: const EdgeInsets.only(top: 20),
            width: double.infinity,
            child: GestureDetector(
              onTap: () {},
              child: const Text(
                "Forgotten your password?",
                style: TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 16,
                    color: Color(0xff222921)),
                textAlign: TextAlign.right,
              ),
            ),
          ),
          const SizedBox(
            height: 50,
          ),
          Container(
            width: double.maxFinite,
            height: 55,
            decoration: const BoxDecoration(
                color: Color(0xff85a562),
                borderRadius: BorderRadius.all(Radius.circular(50.0))),
            child: TextButton(
              onPressed: () {},
              child: const Text(
                'Login',
                style: TextStyle(color: Colors.white, fontSize: 24),
              ),
            ),
          ),
          Container(
            margin: const EdgeInsets.only(top: 30),
            child: Text.rich(TextSpan(
                text: "Don't have an account? ",
                style: (const TextStyle(fontSize: 16)),
                children: <TextSpan>[
                  TextSpan(
                    text: 'Signup',
                    style: (const TextStyle(color: Color(0xff85a562))),
                    recognizer: TapGestureRecognizer()
                      ..onTap = () => Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const RegisterView())),
                  )
                ])),
          )
        ],
      ),
    );
  }
}
