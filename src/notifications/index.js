
import { Notifications, Permissions } from 'expo';
import DataStore from '../data/DataStore';

const createNotification = () => ({
	title: 'Study Reminder',
	body: 'Practice makes perfect! Let\'s start a new quiz',
	android: {
		sound: true,
		priority: 'high',
		sticky: false,
		vibrate: true
	}
});

export const clearNotification = () =>
	DataStore.
		removeNotification().
		then(() => Notifications.
			cancelAllScheduledNotificationsAsync()).
		catch(console.error);

export const setNotification = (time, repeat) =>
	DataStore.
		getNotification().
		then(data => {
			if (data === null) {
				Permissions.
					askAsync(Permissions.NOTIFICATIONS).
					then(({ status }) => {
						if (status === 'granted') {
							Notifications.
								cancelAllScheduledNotificationsAsync().
								then(() => Notifications.
									scheduleLocalNotificationAsync(
										createNotification(),
										{ time, repeat })
								).
								then(() => DataStore.
									setNotification(true));
						}
					});
			}
		}).
		catch(console.error);
