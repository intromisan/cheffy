import 'package:cheffy/views/home_view.dart';
import 'package:flutter/material.dart';

class NavigationBarView extends StatefulWidget {
  const NavigationBarView({super.key});

  @override
  State<NavigationBarView> createState() => _NavigationBarState();
}

class _NavigationBarState extends State<NavigationBarView> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.w500);
  static const List<Widget> _widgetOptions = <Widget>[
    HomeView(),
    Text(
      'Index 1: Search & Category',
      style: optionStyle,
    ),
    Text(
      'Index 2: My library',
      style: optionStyle,
    ),
    Text(
      'Index 3: Profile',
      style: optionStyle,
    ),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffD2DBE4),
      body: Center(child: _widgetOptions.elementAt(_selectedIndex)),
      bottomNavigationBar: SizedBox(
        height: 60,
        child: ClipRRect(
            child: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.home_outlined, color: Color(0xffb5b3b9)),
              activeIcon: Icon(Icons.home),
              label: "Home",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.search, color: Color(0xffb5b3b9)),
              activeIcon: Icon(Icons.search),
              label: "Search & Category",
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.bookmark_outline,
                color: Color(0xffb5b3b9),
              ),
              activeIcon: Icon(Icons.bookmark),
              label: "My library",
            ),
            BottomNavigationBarItem(
              icon:
                  Icon(Icons.person_outline_outlined, color: Color(0xffb5b3b9)),
              activeIcon: Icon(Icons.person),
              label: "Profile",
            ),
          ],
          currentIndex: _selectedIndex,
          iconSize: 26,
          selectedItemColor: const Color(0xff85a562),
          onTap: _onItemTapped,
          type: BottomNavigationBarType.fixed,
          showSelectedLabels: false,
          showUnselectedLabels: false,
        )),
      ),
    );
  }
}
