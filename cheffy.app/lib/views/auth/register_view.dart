import 'package:cheffy/views/auth/login_view.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class RegisterView extends StatefulWidget {
  const RegisterView({super.key});

  @override
  State<RegisterView> createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
  late final TextEditingController _userName;
  late final TextEditingController _email;
  late final TextEditingController _phoneNumber;
  late final TextEditingController _password;
  late final TextEditingController _passwordConfirm;
  late bool _passwordVisible;
  late bool _passwordConfirmVisible;

  @override
  void initState() {
    _userName = TextEditingController();
    _email = TextEditingController();
    _phoneNumber = TextEditingController();
    _password = TextEditingController();
    _passwordConfirm = TextEditingController();
    _passwordVisible = false;
    _passwordConfirmVisible = false;
    super.initState();
  }

  @override
  void dispose() {
    _userName.dispose();
    _email.dispose();
    _phoneNumber.dispose();
    _password.dispose();
    _passwordConfirm.dispose();
    super.dispose();
  }

  void togglePassword() {
    setState(() {
      _passwordVisible = !_passwordVisible;
    });
  }

  void togglePasswordConfirm() {
    setState(() {
      _passwordConfirmVisible = !_passwordConfirmVisible;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffD2DBE4),
      body: Container(
        margin: const EdgeInsets.only(
          left: 20,
          right: 20,
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Center(
              child: Text(
                "Signup",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
              ),
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
                controller: _userName,
                decoration: const InputDecoration(
                  contentPadding:
                      EdgeInsets.only(top: 12, right: 20, bottom: 12, left: 20),
                  hintText: 'User name',
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
                controller: _email,
                decoration: const InputDecoration(
                  contentPadding:
                      EdgeInsets.only(top: 12, right: 20, bottom: 12, left: 20),
                  hintText: 'Email',
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
                controller: _phoneNumber,
                decoration: const InputDecoration(
                  contentPadding:
                      EdgeInsets.only(top: 12, right: 20, bottom: 12, left: 20),
                  hintText: 'Phone number',
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
                keyboardType: TextInputType.phone,
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
                controller: _passwordConfirm,
                decoration: InputDecoration(
                  contentPadding: const EdgeInsets.only(
                      top: 12, right: 20, bottom: 12, left: 20),
                  hintText: 'Confirm password',
                  suffixIconColor: _passwordConfirmVisible
                      ? const Color(0xffd2dbe4)
                      : const Color(0xff85a562),
                  suffixIcon: IconButton(
                    onPressed: () {
                      togglePasswordConfirm();
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
                obscureText: _passwordConfirmVisible,
                autocorrect: false,
                enableSuggestions: false,
              ),
            ),
            const SizedBox(
              height: 100,
            ),
            Container(
              width: double.maxFinite,
              height: 50,
              decoration: const BoxDecoration(
                  color: Color(0xff85a562),
                  borderRadius: BorderRadius.all(Radius.circular(50.0))),
              child: TextButton(
                onPressed: () {},
                child: const Text(
                  'Signup',
                  style: TextStyle(color: Colors.white, fontSize: 24),
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 30),
              child: Text.rich(TextSpan(
                  text: "Already have an account? ",
                  style: (const TextStyle(fontSize: 16)),
                  children: <TextSpan>[
                    TextSpan(
                      text: 'Signin',
                      style: (const TextStyle(color: Color(0xff85a562))),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () => Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const LoginView())),
                    )
                  ])),
            )
          ],
        ),
      ),
    );
  }
}
