import 'package:flutter/material.dart';

class ProfileOption extends StatelessWidget {
  final String title;
  final Icon icon;
  final Function()? onTap;
  const ProfileOption(
      {super.key,
      required this.title,
      required this.icon,
      required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Stack(
        children: [
          Container(
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20), color: Colors.white),
              height: 70,
              margin: const EdgeInsets.only(left: 40),
              child: Row(
                children: [
                  // Option title
                  Expanded(
                      child: Padding(
                    padding: const EdgeInsets.only(left: 50),
                    child: Text(
                      title,
                      style: const TextStyle(fontSize: 18),
                    ),
                  )),
                  const Padding(
                    padding: EdgeInsets.only(right: 15),
                    child: Icon(
                      Icons.chevron_right,
                      color: Color(0xff222921),
                      size: 35,
                    ),
                  )
                ],
              )),
          // Icon
          Container(
            width: 50,
            height: 50,
            margin: const EdgeInsets.fromLTRB(15, 10, 0, 0),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(50),
              color: const Color(0xff85a562),
            ),
            child: icon,
          ),
        ],
      ),
    );
  }
}
