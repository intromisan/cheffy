import 'package:flutter/material.dart';

class SubtitleWidget extends StatelessWidget {
  final String subtitleText;

  SubtitleWidget({super.key, required this.subtitleText});

  @override
  Widget build(BuildContext context) {
    return Align(
        alignment: Alignment.centerLeft,
        child: Container(
          margin: const EdgeInsets.only(left: 20),
          child: Text(
            subtitleText,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
          ),
        ));
  }
}
