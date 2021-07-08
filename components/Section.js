export class Section{
    constructor({items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;

        this._element = document.querySelector(containerSelector);
    }

    renderAll(){
        this._items.forEach(item => {
            this._element.append(this._renderer(item.name, item.link, item.likes, item.owner, item._id))
        });
    }

    addItem(cardData){
        this._element.prepend(this._renderer(cardData.name, cardData.link, cardData.likes, cardData.owner, cardData._id))
    }
}