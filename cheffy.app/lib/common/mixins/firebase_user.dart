import 'package:firebase_auth/firebase_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';

mixin FirebaseUserMixin {
  // Saves id token expire time
  void saveUserData(User? user) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    if (user != null) {
      _saveExpireTime(prefs);
    }
  }

  // Returns token expire time saved in local memory
  Future<DateTime> getTokenExpireTime() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final expireTimeString = prefs.getString("idTokenExpireTime");

    if (expireTimeString != null) {
      return DateTime.parse(expireTimeString);
    }

    return DateTime.now();
  }

  // Checks if idToken is close to expiration and returnes valid token
  Future<String?> getIdToken(User? user) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final idToken = prefs.getString("idToken");
    DateTime expireTime = await getTokenExpireTime();

    if (expireTime.isAfter(DateTime.now())) {
      // Token is expired, refresh it
      return user?.getIdToken();
    } else {
      return idToken;
    }
  }

  // #### Helpers ####

  void _saveExpireTime(SharedPreferences prefs) {
    // Firebase id token lives 60 minutes and refreshes in 55.
    DateTime expirationTime = DateTime.now().add(const Duration(minutes: 57));
    prefs.setString('idTokenExpireTime', expirationTime.toIso8601String());
  }
}
