document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('magic-button');
    const body = document.body;

    button.addEventListener('click', function() {
        // Verander de achtergrondkleur naar een willekeurige kleur
        body.style.backgroundColor = getRandomColor();
    });

    function getRandomColor() {
        // Genereer een willekeurige kleur in hex-formaat
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
