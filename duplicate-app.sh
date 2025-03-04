#!/bin/bash
NEW_ID="com.yourcompany.app$1"
NEW_NAME="App Variant $1"

# Android modifications
sed -i "s/applicationId \".*\"/applicationId \"$NEW_ID\"/g" android/app/build.gradle
sed -i "s/<string name=\"app_name\">.*<\/string>/<string name=\"app_name\">$NEW_NAME<\/string>/g" android/app/src/main/res/values/strings.xml

# Build command (changed to use debug build)
cd android && ./gradlew assembleRelease
cd ..