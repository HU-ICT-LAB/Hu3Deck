export default function buildMakePropPoint({uid, sanitize}) {
    return function makePropPoint({
        id = uid(),
        xScale,
        yScale,
        zScale,
        xRotation,
        yRotation,
        zRotation,
        xPosition,
        yPosition,
        zPosition,
        xToPosition,
        yToPosition,
        zToPosition,
        xOuterPosition,
        yOuterPosition,
        zOuterPosition
    } = {}) {
        
        id = sanitize(id);
        if(id.length < 1) {
            throw new Error("Id must be valid.");
        }

        return Object.freeze({
            getPointId: () => id,
            getXScale: () => xScale,
            getYScale: () => yScale,
            getZScale: () => zScale,
            getXRotation: () => xRotation,
            getYRotation: () => yRotation,
            getZRotation: () => zRotation,
            getXpos: () => xPosition,
            getYpos: () => yPosition,
            getZpos: () => zPosition,
            getXToPos: () => xToPosition,
            getYToPos: () => yToPosition,
            getZToPos: () => zToPosition,
            getXOuterPos: () => xOuterPosition,
            getYOuterPos: () => yOuterPosition,
            getZOuterPos: () => zOuterPosition
        });
    }
}