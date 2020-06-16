import { makeScene } from '../../entities'
export default function createMakeScene({ sceneDb }) {
    return function createScene(sceneInfo) {

        
        const sceneInstance = makeScene(sceneInfo);

        const scene = sceneDb.create({
            id: sceneInstance.getId(),
            title: sceneInstance.getTitle()
        });
        return scene;
    }
}