export class Section{
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = containerSelector;

        this._element = document.querySelector(containerSelector);
    }

    renderAll(result){
        result.forEach(item => {
            this._element.append(this._renderer(item.name, item.link, item.likes, item.owner, item._id))
        });
    }

    addItem(cardData){
        this._element.prepend(this._renderer(cardData.name, cardData.link, cardData.likes, cardData.owner, cardData._id))
    }
}