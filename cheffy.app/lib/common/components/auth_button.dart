import 'package:flutter/material.dart';

class AuthButton extends StatelessWidget {
  final Function()? onTap;
  final String text;
  const AuthButton({super.key, required this.onTap, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.maxFinite,
      height: 55,
      decoration: const BoxDecoration(
          color: Color(0xff85a562),
          borderRadius: BorderRadius.all(Radius.circular(50.0))),
      child: TextButton(
        onPressed: onTap,
        child: Text(
          text,
          style: const TextStyle(color: Colors.white, fontSize: 24),
        ),
      ),
    );
  }
}
