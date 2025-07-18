export default class ProductionModel {
    constructor(id, name, date, boxes, buckets) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.boxes = boxes;
        this.buckets = buckets;
    }

    toObject() {
        return {
            name: this.name,
            date: this.date,
            boxes: this.boxes,
            buckets: this.buckets,
        };
    }
}
