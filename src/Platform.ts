type EntryProject = {
    objects: {
        id: string,
        name: string,
        script: string,
        objectType: string,
        rotateMethod: string,
        scene: string,
        sprite: {
            pictures: {
                id: string,
                dimension: {
                    width: number,
                    height: number,
                    scaleX?: number,
                    scaleY?: number,
                },
                fileurl: string,
                name: string,
                scale: string,
                imageType: string,
            }[],
            sounds: {
                duration: number,
                ext: string,
                id: string,
                fileurl: string,
                name: string,
            }[]
        },
        selectedPictureId: string,
        lock: boolean,
        entity: {
            x: number,
            y: number,
            regX: number,
            regY: number,
            scaleX: number,
            scaleY: number,
            rotation: number,
            direction: number,
            width: number,
            height: number,
            font: string,
            visible: boolean,
        }
    }[],
    scenes: {
        id: string,
        name: string,
    }[],
    variables: {
        name: string,
        id: string,
        visible: boolean,
        value: any,
        variableType: string,
        isCloud: boolean,
        cloudDate: boolean,
        object: any,
        x: number,
        y: number,
        width?: number,
        height?: number,
        array?: {
            data: any
        }[]
    }[],
    messages: {
        id: string,
        name: string,
    }[],
    functions: {
        id: string,
        content: string,
    }[],
    tables?: any, // 추가 요망
    speed?: number,
    interface?: {
        canvasWidth: number,
        menuWidth: number,
        object: string,
    },
    expansionBlocks?: any, // 추가 요망
    aiUtilizeBlocks?: any, // 추가 요망
};
export interface Platform {
    Entry?: {
        project: EntryProject,
        idList: Record<string, string>,
    },
    backend?: {
        port?: number,
    }
}