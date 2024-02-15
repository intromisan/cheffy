import 'package:cheffy/common/components/navigation_bar.dart';
import 'package:cheffy/features/auth/presentation/onboarding/icon_circle.dart';
import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';

class OnboardingPage extends StatefulWidget {
  const OnboardingPage({super.key});

  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  void _onIntroEnd(context) {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => const NavigationBarView()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return IntroductionScreen(
      globalBackgroundColor: const Color(0xffD2DBE4),

      // "Done" button
      done: Container(
        width: 70,
        height: 70,
        alignment: Alignment.center,
        decoration: BoxDecoration(
            color: Color(0xff85A562), borderRadius: BorderRadius.circular(35)),
        child: Text(
          "Done",
          style: TextStyle(
              color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600),
        ),
      ),

      // "Skip" button
      skip: Container(
        width: 70,
        height: 70,
        alignment: Alignment.center,
        decoration: BoxDecoration(
            color: Color(0xff85A562), borderRadius: BorderRadius.circular(35)),
        child: Text(
          "Skip",
          style: TextStyle(
              color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600),
        ),
      ),
      onSkip: () => _onIntroEnd(context),
      onDone: () => _onIntroEnd(context),
      showSkipButton: true,
      showNextButton: false,
      dotsDecorator: DotsDecorator(
        shape: RoundedRectangleBorder(
          side: const BorderSide(
            color: Colors.grey,
          ),
          borderRadius: BorderRadius.circular(25.0),
        ),
        size: const Size.square(10),
        color: Colors.white,
        activeColor: const Color(0xff222921),
        activeSize: const Size.square(10),
      ),
      pages: [
        // First Page
        PageViewModel(
            title: "",
            bodyWidget: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(
                  height: 100,
                ),
                IconCircle(
                  icon: Icon(
                    Icons.lunch_dining_outlined,
                    color: Colors.grey.shade700,
                    size: 60,
                  ),
                ),
                const SizedBox(
                  height: 50,
                ),
                const Text('Be a Chef',
                    style: TextStyle(
                        fontSize: 21,
                        fontWeight: FontWeight.w700,
                        color: Color(0xff222921))),
                const SizedBox(
                  height: 30,
                ),
                const SizedBox(
                  width: 260,
                  child: Text(
                      'Being a chef never seems like a job, it becomes a true passion',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 14,
                          // fontWeight: FontWeight.w700,
                          color: Color(0xff222921))),
                ),
              ],
            )),

        // Second Page
        PageViewModel(
            title: "",
            bodyWidget: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(
                  height: 100,
                ),
                IconCircle(
                  icon: Icon(
                    Icons.cookie_outlined,
                    color: Colors.grey.shade700,
                    size: 60,
                  ),
                ),
                const SizedBox(
                  height: 50,
                ),
                const Text('Discover Recipes',
                    style: TextStyle(
                        fontSize: 21,
                        fontWeight: FontWeight.w700,
                        color: Color(0xff222921))),
                const SizedBox(
                  height: 30,
                ),
                const SizedBox(
                  width: 260,
                  child: Text(
                      'Cheffy provides recipes from all over the world. A recipe has no soul. You as the cook, must bring the soul of the recipe',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 14,
                          // fontWeight: FontWeight.w700,
                          color: Color(0xff222921))),
                ),
              ],
            )),

        // Third page
        PageViewModel(
            title: "",
            bodyWidget: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(
                  height: 100,
                ),
                IconCircle(
                  icon: Icon(
                    Icons.ac_unit_outlined,
                    color: Colors.grey.shade700,
                    size: 60,
                  ),
                ),
                const SizedBox(
                  height: 50,
                ),
                const Text('Manage your Fridge',
                    style: TextStyle(
                        fontSize: 21,
                        fontWeight: FontWeight.w700,
                        color: Color(0xff222921))),
                const SizedBox(
                  height: 30,
                ),
                const SizedBox(
                  width: 260,
                  child: Text(
                      'Cheffy is a great tool to manage a fridge in your household. Try it with your friends and family.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 14,
                          // fontWeight: FontWeight.w700,
                          color: Color(0xff222921))),
                ),
              ],
            )),
      ],
    );
  }
}
