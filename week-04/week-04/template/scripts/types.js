export class Area {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.el = null;
    }
    // 重写JSON序列化
    toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }
}
export class Album {
    constructor(obj) {
        this.area = obj.area;
        this.name = obj.name;
        this.singer = obj.singer;
        this.release_time = obj.release_time;
        this.cover = obj.cover;
        this.el = null;
    }
    // 重写JSON序列化
    toJSON() {
        return {
            area: this.area,
            name: this.name,
            singer: this.singer,
            release_time: this.release_time,
            cover: this.cover
        };
    }
}
//# sourceMappingURL=types.js.map