import { PhoneAuthProvider } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../Components/CustomButton';
import { auth } from '../Context/firebase';
import { FONT } from '../Context/theme';
import { useTheme } from '../Context/ThemeContext';
import {router, useRouter} from 'expo-router'

export default function Index() {
  const { theme } = useTheme();
  const [showInput, setShowInput] = useState(false);
  const [phone, setPhone] = useState('+233');
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const inputFadeAnim = useRef(new Animated.Value(0)).current;
  // Removed recaptchaVerifier

  // Calculate the offset to center the logo/subtext vertically
  const centerOffset = (screenHeight / 2) - 100; // 100 is approx. half the logo+subtext height
  const topOffset = 60; // Distance from top when slid up

  const handleGetStarted = () => {
    Animated.timing(slideAnim, {
      toValue: -(centerOffset - topOffset),
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowInput(true);
      Animated.timing(inputFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleClose = () => {
    Animated.timing(inputFadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowInput(false);
      });
    });
  };

  const handlePhoneChange = (text: string) => {
    // Always start with +233
    if (!text.startsWith('+233')) {
      setPhone('+233');
    } else {
      setPhone(text);
    }
  };

  const handleSendVerification = async () => {
    if (phone.length !== 13) { // +233 plus 9 digits
      alert('Please enter a valid 9-digit Ghanaian phone number.');
      return;
    }
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      // NOTE: reCAPTCHA removed. This may break phone verification on web/Expo unless you use a custom solution.
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phone
      );
      router.replace('/(tabs)');
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      width: '100%',
      position: 'absolute',
      left: 0,
      right: 0,     
    },
    logo: {
      fontSize: 46,
      color: theme.primary,
      fontWeight: FONT.weight.bold as any, // Fix type error
      fontFamily: FONT.family.bold,
    },
    logoImage: {
      width: 48,
      height: 48,
      resizeMode: 'contain',
    },
    tagline: {
      color: theme.secondaryText,
      fontSize: FONT.size.large,
      marginTop: 25,
      fontFamily: FONT.family.regular,
      fontWeight: FONT.weight.regular as any,
    },
    btn: {
      position: 'absolute',
      bottom: 100,
      marginTop: 50,
      paddingVertical: 20,
      paddingHorizontal: 100,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      borderRadius: 50,
      alignItems: 'center',
    },
    btnText: {
      color: '#fff',
      fontSize: FONT.size.large,
      fontFamily: FONT.family.medium,
      fontWeight: FONT.weight.medium as any,
    },
    inputContainer: {
      width: '80%',
      alignItems: 'center',
      marginTop: 30,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: 8,
      padding: 12,
      fontSize: FONT.size.medium,
      color: theme.text,
      backgroundColor: theme.dynamicwhite,
      marginBottom: 20,
    },
    continueBtn: {
      backgroundColor: theme.primary,
      borderRadius: 32,
      paddingVertical: 18,
      width: '100%',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 16,
      shadowColor: theme.secondary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 2,
    },
    continueBtnText: {
      color: '#fff',
      fontSize: 18,
      fontFamily: FONT.family.bold,
      fontWeight: FONT.weight.bold as any,
    },
  });

  return (
    <View style={styles.Container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            top: centerOffset,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.logo}>
          Rixe.
          <Image source={require('../assets/images/icon.png')} style={styles.logoImage} />
        </Text>
        <Text style={styles.tagline}>get your shit together...</Text>
      </Animated.View>
      {!showInput && (
        <CustomButton
          onPress={handleGetStarted}
          btnText="Get Started"
          btnStyle={styles.btn}
          btnTextStyle={styles.btnText}
        />
      )}
      {showInput && (
        <>
          {/* FirebaseRecaptchaVerifierModal removed */}
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 30, zIndex: 10 }}
            onPress={handleClose}
          >
            <Text style={{ fontSize: 32, color: theme.primary }}>×</Text>
          </TouchableOpacity>
          <Animated.View style={[styles.inputContainer, { opacity: inputFadeAnim }]}>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor={theme.secondaryText}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handlePhoneChange}
              maxLength={13} // +233 plus 9 digits
            />
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={handleSendVerification}
            >
              <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </View>
  );
}