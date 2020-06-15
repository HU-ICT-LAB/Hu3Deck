
const sessionData = fetch(`/session/active`).then(d => d.json()).then(d => {
    loadProps(d);
});

function loadProps(data) {
    data.scene.props.forEach(val => {
        if(val.background_image_path != null) {
            makeBackground(val);
        }

        makeModel(val);
    });
}

function makeModel() {

}

function makeBackground(backgroundObject) {
    let scene = document.querySelector('a-scene');
    let element = document.createElement('a-sky');
    element.setAttribute('src', backgroundObject.background_image_path);
    scene.appendChild(element);
}