import 'dart:ui';

import 'package:carousel_slider/carousel_slider.dart';
import 'package:cheffy/classes/recipeOfWeek.dart';
import 'package:cheffy/classes/suggestion.dart';
import 'package:cheffy/widgets/subtitle.dart';
import 'package:flutter/material.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  late final TextEditingController _search;

  List<RecipeOfWeek> recipeOfWeekList = [
    RecipeOfWeek(
        "assets/broccoli.png",
        "Broccoli Chicken",
        "Chinese Chicken and Broccoli is a QUICK and easy recipe loaded with juicy chicken and crisp-tender broccoli enveloped in a savory garlic, ginger stir fry sauce complimented by hot steaming rice (or go low carb with cauliflower rice).",
        false),
    RecipeOfWeek(
        "assets/lentil_soup.png",
        "Lentil soup",
        "Crushed tomatoes, garlic, and a vegetable medley combine with lentils and fragrant herbs for an unforgettably delicious and hearty soup that the whole family will love. Add this classic soup recipe to your rotation and enjoy stick-to-your-ribs flavor any time.",
        false),
    RecipeOfWeek(
        "assets/pizza.png",
        "Pizza Margherita",
        "A typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.",
        false),
    RecipeOfWeek(
        "assets/risotto.png",
        "Chicken Rissoto",
        "Classic risotto recipe comes flavoured with chicken thighs, smoked bacon lardons and a big mountain of parmesan.",
        false)
  ];

  List<Suggestion> suggestionsList = [
    Suggestion("assets/fish.jpg", "Lemon butter fish", "Fish dish"),
    Suggestion("assets/asparagus.jpg", "Asparagus salad", "Salad"),
    Suggestion("assets/tomatoSoup.jpg", "Tomato soup", "Soup")
  ];

  @override
  void initState() {
    _search = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // ignore: avoid_print
    print(suggestionsList.length);
    return Scaffold(
        backgroundColor: const Color(0xffd2dbe4),
        appBar: AppBar(
          toolbarHeight: 80,
          backgroundColor: const Color(0xffd2dbe4),
          title: const Padding(
            padding: EdgeInsets.only(top: 10),
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(
                "Hello Surya",
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
              ),
              Text(
                "Shall we cook?",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
              )
            ]),
          ),
          actions: const [
            Padding(
              padding: EdgeInsets.only(
                right: 20,
              ),
              child: CircleAvatar(
                backgroundImage: AssetImage("assets/ava.jpg"),
                radius: 22,
              ),
            )
          ],
        ),
        body: Column(
          children: [
            _searchBar(),
            _recipesOfWeek(),
            _suggestions(),
            Container(
              child: Column(children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    SubtitleWidget(subtitleText: "Categories"),
                    const Padding(
                      padding: EdgeInsets.only(right: 20),
                      child: Text(
                        "See all",
                        style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            decoration: TextDecoration.underline),
                      ),
                    )
                  ],
                )
              ]),
            )
          ],
        ));
  }

  Container _suggestions() {
    return Container(
        margin: const EdgeInsets.only(
          top: 10,
        ),
        child: (Column(children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              SubtitleWidget(subtitleText: "Suggestions"),
              const Padding(
                padding: EdgeInsets.only(right: 20),
                child: Text(
                  "See all",
                  style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      decoration: TextDecoration.underline),
                ),
              )
            ],
          ),
          Container(
              margin: const EdgeInsets.only(),
              child: SizedBox(
                height: 200,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: suggestionsList.length,
                  separatorBuilder: (context, index) => const SizedBox(
                    width: 20,
                  ),
                  itemBuilder: (context, index) {
                    return _suggestionsCardBuilder(
                        index, suggestionsList[index]);
                  },
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                ),
              ))
        ])));
  }

  Container _suggestionsCardBuilder(int index, Suggestion suggestion) {
    return Container(
      width: 250,
      height: 200,
      padding: const EdgeInsets.only(top: 30, left: 20, right: 30, bottom: 90),
      decoration: BoxDecoration(
        image: DecorationImage(
            image: AssetImage(suggestion.backgroundImagePath),
            fit: BoxFit.cover),
        borderRadius: const BorderRadius.all(Radius.circular(20)),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 3,
            blurRadius: 7,
            offset: const Offset(5, 5), // changes position of shadow
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: const BorderRadius.all(Radius.circular(20)),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
          child: Container(
            decoration: BoxDecoration(
                color: Colors.white.withOpacity((0.4)),
                borderRadius: const BorderRadius.all(Radius.circular(20))),
            child: Padding(
              padding: const EdgeInsets.only(left: 20, right: 15),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          suggestion.title,
                          style: const TextStyle(
                              fontSize: 13, fontWeight: FontWeight.w600),
                        ),
                        Text(
                          suggestion.description,
                          style: const TextStyle(
                            fontSize: 11,
                          ),
                        )
                      ]),
                  const Icon(Icons.chevron_right)
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Container _recipesOfWeek() {
    return Container(
      margin: const EdgeInsets.only(top: 10),
      child: Column(children: [
        SubtitleWidget(subtitleText: "Recipes of the week"),
        SizedBox(
            height: 220,
            child: CarouselSlider(
                items: recipeOfWeekList.map((i) {
                  return Builder(builder: (BuildContext context) {
                    return SizedBox(
                      width: 210,
                      child: Stack(children: [
                        Container(
                            decoration: const BoxDecoration(
                                color: Color(0xffe6e9f0),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20))),
                            margin: const EdgeInsets.only(top: 20),
                            width: 160,
                            child: Container(
                              padding: const EdgeInsets.all(15),
                              child: Column(
                                children: [
                                  SizedBox(
                                    height: 60,
                                    child: Container(
                                      alignment: Alignment.topLeft,
                                      child: const CircleAvatar(
                                          radius: 13,
                                          backgroundColor:
                                              Color.fromARGB(73, 133, 165, 98),
                                          child: Icon(
                                            Icons.favorite,
                                            color: Colors.white,
                                            size: 14,
                                          )),
                                    ),
                                  ),
                                  Align(
                                      alignment: Alignment.centerLeft,
                                      child: Text(
                                        i.title,
                                        style: const TextStyle(
                                            fontSize: 13,
                                            fontWeight: FontWeight.w600),
                                      )),
                                  Padding(
                                    padding: const EdgeInsets.only(top: 5),
                                    child: Text(i.description,
                                        maxLines: 5,
                                        style: const TextStyle(fontSize: 11),
                                        overflow: TextOverflow.ellipsis),
                                  )
                                ],
                              ),
                            )),
                        Positioned(
                          right: 0,
                          top: 0,
                          child: ClipOval(
                              // radius: 45,
                              child: Image(
                            image: AssetImage(i.imagePath),
                            fit: BoxFit.cover,
                            width: 90.0,
                            height: 90.0,
                          )),
                        ),
                      ]),
                    );
                  });
                }).toList(),
                options: CarouselOptions(
                  height: 400,
                  aspectRatio: 16 / 9,
                  viewportFraction: 0.423,
                  initialPage: 0,
                  enableInfiniteScroll: true,
                  reverse: false,
                  autoPlay: false,
                  autoPlayInterval: const Duration(seconds: 1),
                  enlargeCenterPage: true,
                  enlargeFactor: 0.4,
                  scrollDirection: Axis.horizontal,
                ))),
      ]),
    );
  }

  Container _searchBar() {
    return Container(
      margin: const EdgeInsets.only(top: 0, left: 20, right: 20),
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
        controller: _search,
        decoration: InputDecoration(
          contentPadding:
              const EdgeInsets.only(top: 6, right: 20, bottom: 6, left: 20),
          hintText: 'Search recipes',
          prefixIcon: Container(
              padding: const EdgeInsets.only(left: 20, right: 10),
              child:
                  const Icon(Icons.search, color: Color(0xffb5b3b9), size: 20)),
          filled: true,
          fillColor: const Color(0xffe6e9f0),
          hintStyle: const TextStyle(color: Color(0xffb5b3b9), fontSize: 14),
          border: const OutlineInputBorder(
              borderSide: BorderSide(width: 0, style: BorderStyle.none),
              borderRadius: BorderRadius.all(Radius.circular(50.0))),
        ),
        obscureText: false,
        autocorrect: false,
        enableSuggestions: false,
      ),
    );
  }
}
