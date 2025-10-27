
import * as Notifications from 'expo-notifications';

export async function triggerCartNotification(itemTitle: string) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Item added to cart!',
            body: `${itemTitle} will be waiting in your cart.`,
            sound: true,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 10
        }

    });
}
