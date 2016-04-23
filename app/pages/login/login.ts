import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';




@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  messagesRef: Firebase;
	isLoggedIn: boolean;
	authData: FirebaseAuthData;

	authDataProfileName: string;
	authDataProfileImage: string;
	authDataProfileDescription: string;
	authDataProfileMemberSince: string;
	authDataProfileNoFollowers:number;
	authDataProfileLocation: string;

  login: {username?: string, password?: string} = {};
  submitted = false;

constructor(private nav: NavController, private userData: UserData) {
		//this.firebaseUrl = "https://gajotres.firebaseio.com/messages";
  debugger;
		this.messagesRef = new Firebase('https://flickering-fire-9486.firebaseio.com/messages');
		this.messagesRef.onAuth((user) => {
			if (user) {
				this.authData = user;
        if (this.authData.provider == 'google') {
          this.authDataProfileImage = this.authData.google.profileImageURL.replace(/\_normal/, "");
          this.authDataProfileName = this.authData.google.displayName;
          this.authDataProfileDescription = 'Google no description';
          this.authDataProfileMemberSince = 'Google no member since';
          this.authDataProfileNoFollowers = 0;
          this.authDataProfileLocation = this.authData.google.cachedUserProfile.locale;
        } else {
	this.authDataProfileImage  = this.authData.facebook.profileImageURL.replace(/\_normal/,"");
				this.authDataProfileName = this.authData.facebook.displayName;
				this.authDataProfileDescription = this.authData.facebook.cachedUserProfile.description;
				this.authDataProfileMemberSince = this.authData.facebook.cachedUserProfile.created_at;
				this.authDataProfileNoFollowers = this.authData.facebook.cachedUserProfile.followers_count;
				this.authDataProfileLocation = this.authData.facebook.cachedUserProfile.location;
        }


       // this.isLoggedIn = true;
          //  this.userData.login();
  // this.nav.push(TabsPage);
			}
		});
	}

authWithProvider(provider: string) {
  debugger;
		this.messagesRef.authWithOAuthPopup(provider, (error) => {
			if (error) {
				console.log(error);
			}
		}, {remember: "sessionOnly"});
	}

unauthWithProvider() {
  debugger;
		this.messagesRef.unauth();
		this.isLoggedIn = false;
	}
  // constructor(private nav: NavController, private userData: UserData) {
  // }

  onLogin(form) {
    this.submitted = true;
 debugger;
    // if (form.valid) {
      this.userData.login();
      this.nav.push(TabsPage);
    // }
  }

  onSignup() {
    debugger;
      this.nav.push(SignupPage);
    }
}
