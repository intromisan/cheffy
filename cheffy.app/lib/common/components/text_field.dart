import 'package:flutter/material.dart';

class MyTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final bool obscureText;
  const MyTextField(
      {super.key,
      required this.controller,
      required this.hintText,
      required this.obscureText});

  @override
  Widget build(BuildContext context) {
    return Container(
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
          controller: controller,
          obscureText: obscureText,
          decoration: InputDecoration(
            contentPadding:
                const EdgeInsets.only(top: 15, right: 20, bottom: 15, left: 20),
            filled: true,
            fillColor: const Color(0xffe6e9f0),
            hintText: hintText,
            hintStyle: const TextStyle(color: Color(0xffb5b3b9), fontSize: 14),
            enabledBorder: const OutlineInputBorder(
                borderSide: BorderSide(width: 0, style: BorderStyle.none),
                borderRadius: BorderRadius.all(Radius.circular(50.0))),
            focusedBorder: const OutlineInputBorder(
                borderSide: BorderSide(width: 0, style: BorderStyle.none),
                borderRadius: BorderRadius.all(Radius.circular(50.0))),
          ),
        ));
  }
}
