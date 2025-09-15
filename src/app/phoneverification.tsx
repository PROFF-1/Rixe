import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import type { TextInput as RNTextInput } from 'react-native';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../Context/firebase';
import { FONT } from '../Context/theme';

const PIN_LENGTH = 4;
const RESEND_TIME = 60;

type RootStackParamList = {
  phoneverification: { verificationId: string; phone: string };
  Home: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, 'phoneverification'>;

export default function PhoneVerification({ navigation, route }: Props) {
  // Add types for navigation and route
  type RootStackParamList = {
    phoneverification: { verificationId: string; phone: string };
    Home: undefined;
  };
  type Props = NativeStackScreenProps<RootStackParamList, 'phoneverification'>;
  const { theme } = useTheme();
  const [pin, setPin] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(RESEND_TIME);
  const inputRefs = useRef<(RNTextInput | null)[]>([]);
  const { verificationId, phone } = (route?.params || {}) as { verificationId: string; phone: string };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newPin = [...pin];
      newPin[idx] = text;
      setPin(newPin);
      if (text && idx < 5) {
        inputRefs.current[idx + 1]?.focus();
      }
      if (!text && idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    }
  };

  const handleBackspace = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleContinue = async () => {
    const code = pin.join('');
    if (code.length === 6 && verificationId) {
      try {
        const credential = PhoneAuthProvider.credential(verificationId, code);
        await signInWithCredential(auth, credential);
        Alert.alert('Success', 'PIN verified!');
        navigation.navigate('Home');
      } catch (err) {
        Alert.alert('Error', 'Incorrect code. Try again.');
        setPin(['', '', '', '', '', '']);
  inputRefs.current[0]?.focus();
      }
    }
  };

  const handleResend = () => {
    setTimer(RESEND_TIME);
    // Add resend logic here
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 24,
    },
    backArrow: {
      marginTop: 48,
      marginBottom: 24,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 28,
      color: theme.text,
      fontFamily: FONT.family.bold,
  fontWeight: FONT.weight.bold as any,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.secondaryText,
      fontFamily: FONT.family.regular,
      textAlign: 'center',
      marginBottom: 32,
    },
    pinRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 32,
    },
    pinInput: {
      width: 56,
      height: 56,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: theme.primary,
      backgroundColor: theme.white,
      color: theme.text,
      fontSize: 28,
      textAlign: 'center',
      marginHorizontal: 8,
      fontFamily: FONT.family.medium,
  fontWeight: FONT.weight.medium as any,
    },
    continueButton: {
      backgroundColor: theme.primary,
      borderRadius: 32,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 16,
      shadowColor: theme.secondary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 2,
    },
    continueText: {
      color: '#fff',
      fontSize: 18,
      fontFamily: FONT.family.bold,
  fontWeight: FONT.weight.bold as any,
    },
    resendText: {
      color: theme.primary,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: FONT.family.medium,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color={theme.text} />
      </TouchableOpacity>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>we texted you a code to verify{"\n"}your phone number {phone}.</Text>
      <View style={styles.pinRow}>
        {pin.map((digit, idx) => (
          <TextInput
            key={idx}
            ref={ref => { inputRefs.current[idx] = ref; }}
            style={styles.pinInput}
            value={digit}
            onChangeText={text => handleChange(text, idx)}
            onKeyPress={e => handleBackspace(e, idx)}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            autoFocus={idx === 0}
            secureTextEntry={false}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[styles.continueButton, { opacity: pin.every(d => d) ? 1 : 0.5 }]}
        onPress={handleContinue}
        disabled={!pin.every(d => d)}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      {timer > 0 ? (
        <Text style={styles.resendText}>Resend in {timer} Sec</Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
} 