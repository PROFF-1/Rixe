import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const DashboardScreen = () => {
	const [currentTime, setCurrentTime] = React.useState(new Date());
		const [nextReminder, setNextReminder] = React.useState<Date | null>(null);

	// Update the time 
	React.useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date();
			setCurrentTime(now);

			// Calculate next 30-minute interval
			const minutes = now.getMinutes();
			const nextInterval = new Date(now);
			nextInterval.setMinutes(minutes + (30 - (minutes % 30)), 0, 0);
			setNextReminder(nextInterval);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// Format time as HH:MM:SS
		const formatTime = (date: Date) => {
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true
		});
	};

	// Calculate time until next reminder
	const getTimeUntilNextReminder = () => {
		if (!nextReminder) return 'Calculating...';
    
		const diff = (nextReminder!.getTime() - currentTime.getTime());
		const minutes = Math.floor((diff / 1000 / 60) % 60);
		const seconds = Math.floor((diff / 1000) % 60);
    
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>RISE</Text>
				<Text style={styles.subtitle}>No excuses. Just do it.</Text>
			</View>
      
			<View style={styles.timeContainer}>
				<Text style={styles.timeLabel}>CURRENT TIME</Text>
				<Text style={styles.time}>{formatTime(currentTime)}</Text>
			</View>
      
			<View style={styles.reminderContainer}>
				<Text style={styles.reminderLabel}>NEXT KICK IN THE ASS IN</Text>
				<Text style={styles.reminderTime}>{getTimeUntilNextReminder()}</Text>
			</View>
      
			<View style={styles.statsContainer}>
				<Text style={styles.sectionTitle}>TODAY'S BATTLEGROUND</Text>
        
				<View style={styles.statsRow}>
					<View style={styles.statBox}>
						<Text style={styles.statNumber}>5</Text>
						<Text style={styles.statLabel}>TASKS</Text>
					</View>
          
					<View style={styles.statBox}>
						<Text style={[styles.statNumber, styles.completed]}>2</Text>
						<Text style={styles.statLabel}>DONE</Text>
					</View>
          
					<View style={styles.statBox}>
						<Text style={[styles.statNumber, styles.missed]}>1</Text>
						<Text style={styles.statLabel}>MISSED</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		padding: 20,
		paddingTop: 60,
	},
	header: {
		alignItems: 'center',
		marginBottom: 40,
	},
	title: {
		color: '#FF3B30',
		fontSize: 48,
		fontWeight: '900',
		textTransform: 'uppercase',
		letterSpacing: 2,
	},
	subtitle: {
		color: '#888',
		fontSize: 14,
		textTransform: 'uppercase',
		letterSpacing: 1,
		marginTop: 5,
	},
	timeContainer: {
		backgroundColor: '#121212',
		padding: 20,
		borderRadius: 10,
		marginBottom: 20,
		alignItems: 'center',
	},
	timeLabel: {
		color: '#888',
		fontSize: 12,
		textTransform: 'uppercase',
		letterSpacing: 1,
		marginBottom: 5,
	},
	time: {
		color: '#fff',
		fontSize: 36,
		fontWeight: 'bold',
		fontVariant: ['tabular-nums'],
	},
	reminderContainer: {
		backgroundColor: '#1E1E1E',
		padding: 20,
		borderRadius: 10,
		marginBottom: 30,
		alignItems: 'center',
	},
	reminderLabel: {
		color: '#FF3B30',
		fontSize: 12,
		textTransform: 'uppercase',
		letterSpacing: 1,
		marginBottom: 5,
	},
	reminderTime: {
		color: '#FF3B30',
		fontSize: 32,
		fontWeight: 'bold',
		fontVariant: ['tabular-nums'],
	},
	statsContainer: {
		width: '100%',
	},
	sectionTitle: {
		color: '#555',
		fontSize: 12,
		textTransform: 'uppercase',
		letterSpacing: 1,
		marginBottom: 15,
		textAlign: 'center',
	},
	statsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	statBox: {
		backgroundColor: '#121212',
		padding: 20,
		borderRadius: 10,
		flex: 1,
		marginHorizontal: 5,
		alignItems: 'center',
	},
	statNumber: {
		color: '#fff',
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	completed: {
		color: '#4CD964',
	},
	missed: {
		color: '#FF3B30',
	},
	statLabel: {
		color: '#888',
		fontSize: 12,
		textTransform: 'uppercase',
		letterSpacing: 1,
	},
});

export default DashboardScreen;
