let swRegistration;

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('custom-sw.js', {scope: '/'}).then(function(registration) {
        // Registration was successful
        swRegistration = registration;
        console.log("Registration successful")
    }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });

    navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const worker of registrations) {
            // console.log('Service worker:', worker)
        }
    });

}



function initPwaAction () {

    let currentTime = new Date().getTime();
    let timeToRetry = localStorage.getItem('cudua_retry_installation')

    if (timeToRetry == null) {
        let nextInstall = currentTime + 3600 
        localStorage.setItem('cudua_retry_installation', nextInstall);
        return 
    }

    if (currentTime >= timeToRetry) {
        let installApp = document.getElementById('installAppContainer');
        if (installApp) {
            installApp.classList.remove('display-none');
        }
    }
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', async (e) => {
    console.log('beforeinstallprompt Event fired');

    initPwaAction()

    e.preventDefault()

    deferredPrompt = e;

    listenToUserAction ()
})


function listenToUserAction () {

    let installBtn = document.getElementById('installUserPwa');

    console.log("called listenToUserAction")

    installBtn.addEventListener('click', async (e) => {

        console.log("botton has been clicked")

        installBtn.disabled = true;
        // hide our user interface that shows our A2HS button
        let installApp = document.getElementById('installAppContainer');

        if(deferredPrompt !== undefined) {
            // Show the prompt
            deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            await deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    let currentTime = new Date().getTime();
                    let nextInstall = currentTime + (86400  * 20)
                    localStorage.setItem('cudua_retry_installation', nextInstall);
                    installBtn.disabled = false;
                } else {
                    installBtn.disabled = false;
                }
                deferredPrompt = null;
                installApp.classList.add('display-none');
            });
        }

    })
}

let updateButton = document.getElementById('updateAppsLatestVersion');
if (updateButton) {
    updateButton.addEventListener('click', async (e) => {
        swRegistration.update();
    })
}