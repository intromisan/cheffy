import 'package:flutter/material.dart';

class IconCircle extends StatelessWidget {
  final Icon icon;
  const IconCircle({
    super.key,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        Container(
          width: 250,
          height: 250,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(125),
              border: Border.all(color: Color(0xff85A562))),
        ),
        Container(
          width: 215,
          height: 215,
          decoration: BoxDecoration(
              color: Color(0xffe6e9f0),
              borderRadius: BorderRadius.circular(110),
              border: Border.all(color: Color(0xff85A562), width: 20)),
        ),
        icon
      ],
    );
  }
}
