if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            Notification.requestPermission().then(function(result) {
                if (result === 'granted') {
                    displayNotification();
                    console.log('The permission request was granted.');
                } else {
                    console.log('Permission wasn\'t granted. Allow a retry.');
                }
                return;
            });
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Here is a notification body!',
          icon: '/assets/images/bigbears.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {action: 'explore', title: 'Explore this new world',
              icon: '/assets/images/bigbears.png'},
            {action: 'close', title: 'Close notification',
              icon: '/assets/images/bigbears.png'},
          ]
        };
        reg.showNotification('Hello Notification!', options);
      });
    }
}