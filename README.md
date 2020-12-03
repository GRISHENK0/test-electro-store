# Test Electro Store

This app was devloped on ubuntu 18.04 without Android Studio. The goal was to develop a fake electronic store app.

## Requirements

- Java 8
- Gradle 4
- Android SDK
- Node 12.x
- Yarn

This repo was initialized with:

```bash
npx react-native init test-electro-store --template react-native-template-typescript
```

## Quick start

### Manually

Run this:

```bash
SDK_VERSION="sdk-tools-linux-4333796.zip"
BUILD_TOOLS_VERSION="29.0.2"
export ANDROID_HOME="${HOME}/android-sdk"
export PATH=${ANDROID_HOME}/emulator:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/build-tools/${BUILD_TOOLS_VERSION}:${PATH}
sudo apt-get install -y openjdk-8-jdk gradle \
&& sudo update-java-alternatives --jre --set java-1.8.0-openjdk-amd64 \
&& mkdir -p ${ANDROID_HOME} \
&& curl --show-error --location --fail --retry 3 --output /tmp/${SDK_VERSION} https://dl.google.com/android/repository/${SDK_VERSION} \
&& unzip -q -o /tmp/${SDK_VERSION} -d ${ANDROID_HOME} \
&& rm /tmp/${SDK_VERSION} \
&& sdkmanager --update && yes | sdkmanager --licenses \
&& sdkmanager \
 "tools" \
 "platform-tools" \
 "emulator" \
 "build-tools;${BUILD_TOOLS_VERSION}"
```

Add these lines to ~/.bashrc

```bash
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Connecting a device

To enable USB debugging on your device, you will first need to enable the `"Developer options"` menu by going to **Settings → About phone** and then tapping the _Build number_ row at the bottom seven times. You can then go back to **Settings → Developer options** to enable "USB debugging".

Plug in your device via USB. Allow `"Files transfert"` when click on **Push notificatication** and accept the certificate on the device.

## Testing your app

Once the previous steps are done without errors or bugs and if you don't move your location in the terminal, you may type in :

```bash
yarn run start
```

If you have no error, open a new terminal and type in :

```bash
yarn run android
```

If all happen good, you should get the default app lanching in your connected device.

If you want to test production mode, run this :

```bash
yarn run android:prodmode
```

## Generate icons

The app icon path is ./assets/icon.png, after updating it you must run the following command to generate all files required by android and ios.

```bash
yarn generate:icon
```

## Generate splashscreen

The splashscreen path is ./assets/splash.png, after updating it you must run the following command to generate all files required by android and ios.

```bash
yarn generate:splashscreen
```
