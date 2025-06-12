const button = document.getElementById("add");

button.addEventListener('click', () => {
    const progress = document.createElement('progress')
    const id = Date.now;
    const max = 100;
    const initialValue = 0;

    progress.setAttribute('id', id);
    progress.setAttribute('max', max);
    progress.setAttribute('value', initialValue);

    const container = document.getElementById('root');
    container.appendChild(progress);

    const interv = setInterval(() => {
        const val = parseInt(progress.getAttribute('value'));
        console.log(val);
        
        progress.setAttribute('value', (val+1).toString());
    },20)

    setTimeout(() => {
        clearInterval(interv);
    },2000)
})