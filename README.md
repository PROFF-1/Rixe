# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


# 🔥Rise — A Toxic Motivation App

**Rise** Rise is a brutally honest, no-excuses motivation app that hits you with a 30-minute reality check, every damn day. It exists to light a fire under your ass and keep you moving toward your goals — whether you like it or not.

> You don't need another productivity app.
> You need a digital drill sergeant.

---

## 💡 Core Concept

- Every 30 minutes: recieve a push notification that says something like **"Get your life together, loser."**
- Start your day by **recording what needs to get done** — the app transcribes it and breaks it into actionable tasks.
- No fluff. No sugarcoating. Just brutal reminders to execute.

---

## 🚀 Features

- 🔔 **Toxic Motivational Reminders**: Set on a 30-minute schedule, customizable for wake hours.
- 🎤 **Voice-to-Task Capture**: Record your morning intentions, and the app transcribes + organizes them as tasks.
- ✅ **Task Manager**: View, complete, and delete tasks.
- 📊 **Progress Recap**: End-of-day breakdown of what you crushed vs. what you ignored.
- 🔥 **Brutal Encouragement Mode**: Motivational insults based on your progress.
- 🧠 **No-Frills UI**: Built for speed and shame — nothing fancy, all focus.

---

## 📱 Screens

### 1. **Welcome Screen**
- App logo, tagline: _"30 minutes to fix your damn life"_
- “Start Now” button

### 2. **Home / Dashboard**
- Current time
- Next motivation reminder countdown
- Quick stats: Tasks today, Completed, Missed

### 3. **Record Screen**
- Large mic button to record your morning plan
- Live transcription preview
- "Convert to Tasks" button

### 4. **Tasks Screen**
- List of today's tasks (auto-generated + manual)
- Checkbox to complete
- Swipe to delete
- Filter: All / Completed / Missed

### 5. **Reminders Settings**
- Enable/disable toxic mode
- Set active hours (e.g., 8 AM – 8 PM)
- Customize message intensity (Sarcastic, Savage, Ruthless)

### 6. **End-of-Day Recap**
- Summary of completed tasks
- Stats: % completed, avg. execution time
- Brutal quote based on performance (e.g., “You did 3/10 things. Congrats on being slightly above worthless.”)

---

## ⚙️ Tech Stack

- **React Native** (Expo or CLI)
- **AsyncStorage / SQLite** for local task storage
- **Speech-to-Text API** (e.g., Google Speech or iOS/Android native)
- **Push Notifications** via `expo-notifications` or `react-native-push-notification`

---