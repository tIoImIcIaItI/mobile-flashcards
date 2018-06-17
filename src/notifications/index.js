
import { Notifications, Permissions } from 'expo';
import DataStore from '../data/DataStore';

function createNotification() {
	return {
		title: 'TODO: title',
		body: 'TODO: body',
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	};
}

export function clearNotification() {
	DataStore.
		removeNotification().
		then(Notifications.cancelAllScheduledNotificationsAsync()).
		catch(console.error);
}

export function setNotification(time, repeat) {
	DataStore.
		getNotification().
		then(data => {
			if (data === null) {
				Permissions.
					askAsync(Permissions.NOTIFICATIONS).
					then(({status}) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync();

							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{ time, repeat });

							DataStore.setNotification(true);
						}
					})
			}
		}).
		catch(console.error);
}
