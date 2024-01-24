import 'package:cheffy/common/components/auth_button.dart';
import 'package:cheffy/common/mixins/firebase_user.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with FirebaseUserMixin {
  String token = "";

  void logout() async {
    await FirebaseAuth.instance.signOut();
  }

  _httpCall() async {
    final user = FirebaseAuth.instance.currentUser;

    final idToken = await getIdToken(user);
    setState(() {
      if (idToken == null) {
        token = "not found";
      } else {
        token = idToken;
        Clipboard.setData(ClipboardData(text: token));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.only(left: 20, right: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text("Home Page"),
              const SizedBox(height: 20),
              AuthButton(onTap: logout, text: "Logout"),
              const SizedBox(height: 20),
              AuthButton(onTap: _httpCall, text: "Get token"),
              Text(token)
            ],
          ),
        ),
      ),
    );
  }
}
