import PushNotification from 'react-native-push-notification'

PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log('LOCAL NOTIFICATION ==>', notification)
    },
  popInitialNotification: true,
    requestPermissions: true
  })

  export const LocalNotification = (d) => {
    PushNotification.localNotification({
      autoCancel: true,
      bigText:
        'Te queda poco dinero deberias ir por tu vehiculo te quedan $'+d,
      subText: 'Local Notification Demo',
      title: 'Local Notification Title',
      message: 'Expand me to see more',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: '["Mirar"]'
    })
  }