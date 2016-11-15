App.accessRule('*');
App.accessRule('*', {type: 'navigation'});

App.info({
	id: 'com.SupermarkedList',
	version: '1.0.0',
	buildNumber: '2',
	name: 'SupermarkedList',
	description: 'Supermarked List',
	author: 'Gilberto Vieira',
	email: 'dev@tecsinapse.com.br',
	website: 'http://supermarkedlist.com.br/'
});

App.setPreference('BackgroundColor', '0xff607D8B');

//http://docs.meteor.com/#/full/App-icons
//App.icons({
//	'iphone_2x': 'public/images/ios/icon/Icon-60@2x.png',
//	'iphone_3x': 'public/images/ios/icon/Icon-60@3x.png',
//	'ipad': 'public/images/ios/icon/Icon-76.png',
//	'ipad_2x': 'public/images/ios/icon/Icon-76@2x.png',
//	'ipad_pro': 'public/images/ios/icon/Icon-83.5@2x.png',
//	'ios_settings': 'public/images/ios/icon/Icon-Small.png',
//	'ios_settings_2x': 'public/images/ios/icon/Icon-Small@2x.png',
//	'ios_settings_3x': 'public/images/ios/icon/Icon-Small@3x.png',
//	'ios_spotlight': 'public/images/ios/icon/Icon-40.png',
//	'ios_spotlight_2x': 'public/images/ios/icon/Icon-40@2x.png',
//	'android_mdpi': 'public/images/android/icon/mipmap-mdpi/ic_launcher.png',
//	'android_hdpi': 'public/images/android/icon/mipmap-hdpi/ic_launcher.png',
//	'android_xhdpi': 'public/images/android/icon/mipmap-xhdpi/ic_launcher.png',
//	'android_xxhdpi': 'public/images/android/icon/mipmap-xxhdpi/ic_launcher.png',
//	'android_xxxhdpi': 'public/images/android/icon/mipmap-xxxhdpi/ic_launcher.png'
//});
//
////http://docs.meteor.com/#/full/App-launchScreens
//App.launchScreens({
//	'iphone_2x': 'public/images/ios/splash/Default@2x.png',
//	'iphone5': 'public/images/ios/splash/Default-568h@2x.png',
//	'iphone6': 'public/images/ios/splash/Default-667h@2x.png',
//	'iphone6p_landscape': 'public/images/ios/splash/Default-Landscape-736h@3x.png',
//	'iphone6p_portrait': 'public/images/ios/splash/Default-Portrait-736h@3x.png',
//	'ipad_portrait': 'public/images/ios/splash/Default-Portrait.png',
//	'ipad_portrait_2x': 'public/images/ios/splash/Default-Portrait@2x.png',
//	'ipad_landscape': 'public/images/ios/splash/Default-Landscape.png',
//	'ipad_landscape_2x': 'public/images/ios/splash/Default-Landscape@2x.png',
//	'android_mdpi_portrait': 'public/images/android/splash/drawable-mdpi/background.9.png',
//	'android_mdpi_landscape': 'public/images/android/splash/drawable-mdpi/background.9.png',
//	'android_hdpi_portrait': 'public/images/android/splash/drawable-hdpi/background.9.png',
//	'android_hdpi_landscape': 'public/images/android/splash/drawable-hdpi/background.9.png',
//	'android_xhdpi_portrait': 'public/images/android/splash/drawable-xhdpi/background.9.png',
//	'android_xhdpi_landscape': 'public/images/android/splash/drawable-xhdpi/background.9.png',
//	'android_xxhdpi_portrait': 'public/images/android/splash/drawable-xxhdpi/background.9.png',
//	'android_xxhdpi_landscape': 'public/images/android/splash/drawable-xxhdpi/background.9.png'
//});
//
//App.configurePlugin('phonegap-plugin-push', {
//	SENDER_ID: '622833125164'
//});

