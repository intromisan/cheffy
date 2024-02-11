import 'package:cheffy/features/recepies/domain/category.dart';
import 'package:flutter/material.dart';

class CategoryTile extends StatelessWidget {
  final int index;
  final RecipeCategory category;
  const CategoryTile({super.key, required this.index, required this.category});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {},
      child: Center(
        child: Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              color: Color(0xffe6e9f0),
              boxShadow: [
                BoxShadow(
                    color: const Color(0xff222921).withOpacity(0.11),
                    blurRadius: 2,
                    spreadRadius: 0.0,
                    offset: const Offset(0, 3))
              ]),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(category.imagePath, width: 40, height: 40),
              SizedBox(
                height: 2,
              ),
              Text(
                category.title,
                style: TextStyle(fontSize: 10),
              )
            ],
          ),
        ),
      ),
    );
  }
}
