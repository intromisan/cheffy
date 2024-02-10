import 'package:cheffy/features/profile/presentation/components/profile_option.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xffd2dbe4),
        // Page Title
        appBar: AppBar(
          toolbarHeight: 80,
          backgroundColor: const Color(0xffd2dbe4),
          title: Padding(
            padding: const EdgeInsets.only(top: 10),
            child: Text(
              "My Profile",
              style: Theme.of(context).textTheme.titleMedium,
            ),
          ),
        ),
        body: Container(
          padding: EdgeInsets.symmetric(horizontal: 16),
          child: Column(
            children: [
              // Profile
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CircleAvatar(
                    backgroundImage: AssetImage("lib/images/ava.jpg"),
                    radius: 28,
                  ),
                  Expanded(
                    flex: 2,
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Surya Shree",
                              style: TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.w600),
                            ),
                            Text(
                              "suryashree@gmail.com",
                              style: TextStyle(
                                fontSize: 12,
                              ),
                            ),
                          ]),
                    ),
                  ),
                  Icon(Icons.edit_outlined, color: Color(0xff222921))
                ],
              ),
              const SizedBox(
                height: 30,
              ),

              // Profile Options
              ProfileOption(
                  title: "Log out",
                  icon: const Icon(
                    Icons.power_settings_new_outlined,
                    color: Colors.white,
                  ),
                  onTap: () => FirebaseAuth.instance.signOut()),
            ],
          ),
        ));
  }
}
