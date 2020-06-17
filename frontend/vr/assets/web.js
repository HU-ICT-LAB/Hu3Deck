function loadSessionEnvironment() {
    const sessionData = fetch(`/session/active`).then(d => d.json()).then(d => {
        loadProps(d);
    });
}



function loadProps(data) {
    data.scene.props.forEach(val => {
        let exists = document.querySelector(`[propId=${val.id}], [id=${val.id}]`);

        if(exists != null) {
            return;
        }

        loadProp(val);
    });
}

function loadProp(val) {
    if(val.background_image_path != null) {
        return makeBackground(val);
    }

    return makeModel(val);
}

function makeModel(modelObject) {
    let parent = document.querySelector('a-scene');
    let aEntity = document.createElement('a-entity');

    aEntity.setAttribute('propId', modelObject.id);
    aEntity.setAttribute('gltf-model', modelObject.model_path);

    if(modelObject.x_pos_scale != null && modelObject.y_pos_scale != null && modelObject.z_pos_scale) {
        aEntity.setAttribute('scale', `${modelObject.x_pos_scale} ${modelObject.y_pos_scale} ${modelObject.z_pos_scale}`);
    }

    if(modelObject.x_pos_from != null && modelObject.y_pos_from != null && modelObject.z_pos_from) {
        aEntity.setAttribute('position', `${modelObject.x_pos_from} ${modelObject.y_pos_from} ${modelObject.z_pos_from}`);

    }
    
    if(modelObject.animation_mixer != null)  {
        aEntity.setAttribute('animation', `property: position; from: ${modelObject.x_pos_from} ${modelObject.y_pos_from} ${modelObject.z_pos_from} ; to: ${modelObject.x_pos_to} ${modelObject.y_pos_to} ${modelObject.z_pos_to} ; dur: ${modelObject.duration}; easing: ${modelObject.easing};  loop: true`);
    }
    
    if(modelObject.x_pos_rot != null && modelObject.y_pos_rot != null && modelObject.z_pos_rot) {
        aEntity.setAttribute('rotation', `${modelObject.x_pos_rot} ${modelObject.y_pos_rot} ${modelObject.z_pos_rot}`);
    }

    if(modelObject.animation_mixer != null) {
        aEntity.setAttribute('animation-mixer', `${modelObject.animation_mixer}`);
    }

    if(modelObject.audio_path != null && modelObject.volume != null) {
        aEntity.setAttribute('sound', `src: url(${modelObject.audio_path}); autoplay: true; loop: true; volume: ${modelObject.volume};`);
        // aEntity.setAttribute('volume', `${modelObject.volume}`);
        // console.log(aEntity.getAttribute('sound'));
    }

    if(modelObject.loop != null) {
        aEntity.setAttribute('loop', `${modelObject.loop}`);
    }


    parent.appendChild(aEntity);
}


function makeBackground(backgroundObject) {
    let scene = document.querySelector('a-scene');
    let element = document.createElement('a-sky');
    element.setAttribute('propId', backgroundObject.id);
    element.setAttribute('src', backgroundObject.background_image_path);
    scene.appendChild(element);

    console.log(element.getAttribute('sound'));
    return true;
}

function removeProp(id) {
    let element = document.querySelectorAll(`[propId=${id}]`);
    if(element.length !== 0) {
        element.forEach(e => {
            e.remove();
        });
    }
}
