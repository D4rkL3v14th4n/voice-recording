(function () {
    var speakBtn = document.querySelector('#speakbt');
    var resultSpeaker = document.querySelector('#resultSpeak');

    if (window.SpeechRecognition || window.webkitSpeechRecognition) {

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        var myRecognition = new SpeechRecognition();

        myRecognition.lang = 'pt-BR';

        speakBtn.addEventListener('click', function () {

            try {

                myRecognition.start();

                resultSpeaker.innerHTML = "Estou te ouvindo!";

            } catch (erro) {
                alert('erro:' + erro.message);
            }

        }, false);

        myRecognition.addEventListener('result', function (evt) {

            var resultSpeak = evt.results[0][0].transcript;

            console.log(resultSpeak);

            resultSpeaker.innerHTML = resultSpeak;

            switch (resultSpeak.toLowerCase()) {
                case 'light':
                    document.body.style.backgroundColor = '#33cc99';
                    break;
                case 'dark':
                    document.body.style.backgroundColor = '#1C1C1C';
                    break;
                case 'my home page':
                    window.location.href = 'https://www.jetersonlordano.com.br';
                    break;
                case 'átila':
                    reproduzir("átila onii-tchan");
                    break;
                case 'jumario':
                    reproduzir("good morning, boss");
                    break;
                case 'felipe':
                    reproduzir("coé menó");
                    break;
                default:
                    reproduzir("try again");
            }

            if (resultSpeak.match(/search/)) {

                resultSpeaker.innerHTML = 'Redirecionando...';

                setTimeout(function () {

                    var resultado = resultSpeak.split('search');
                    window.location.href = 'https://www.google.com.br/search?q=' + resultado[1];

                }, 2000);
            }

        }, false);

        myRecognition.addEventListener('error', function (evt) {

            resultSpeaker.innerHTML = 'Se você disse alguma coisa, não ouvi muito bem!';

        }, false);

    } else {
        resultSpeaker.innerHTML = 'Seu navegador não suporta tanta tecnoligia!';
    }

    function reproduzir(texto){
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = texto;
        speechSynthesis.speak(utterance);
    }
})();