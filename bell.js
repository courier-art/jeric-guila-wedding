// 1. Initialize Audio
    const bellSound = new Audio('bell.wav');
    bellSound.preload = 'auto';

    const bellIcon = document.getElementById('weddingBell');

    // 2. Play sound on initial page load (triggered by the 'in' animation)
    // Most browsers require a click first, so we attempt to play after the 1.5s delay
    setTimeout(() => {
        playBellSound();
    },100);

    // 3. Handle the Click Event
    bellIcon.addEventListener('click', () => {
        // Switch icon to loop state
        bellIcon.setAttribute('trigger', 'loop');
        bellIcon.setAttribute('state', 'loop-bell');

        // Play sound
        playBellSound();

        // 4. After 4 seconds, stop the animation and sound
        setTimeout(() => {
            bellIcon.setAttribute('trigger', 'in'); // Return to static
            bellIcon.setAttribute('state', 'in-bell');
            
            // Fade out sound or stop it
            stopBellSound();
        }, 4000);
    });

    function playBellSound() {
        bellSound.currentTime = 0;
        bellSound.play().catch(e => console.log("User interaction required for audio"));
    }

    function stopBellSound() {
        // Gently stop the sound
        bellSound.pause();
        bellSound.currentTime = 0;
    }
