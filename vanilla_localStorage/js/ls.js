export class LocalBase{
    constructor(collectionName){
        console.log("ArmazemLocal criado"); 
        this.collectionName = collectionName;   
    }

    getItems(){
        return JSON.parse(localStorage.getItem(this.collectionName) || "[]");
    }

    addItem(item){
        const items = this.getItems();
        item.id = new Date().getTime();
        items.push(item);
        localStorage.setItem(this.collectionName, JSON.stringify(items));

        return item;
    }

    saveItem(item){
        const items = this.getItems();
        const itemIndex = items.findIndex((p) => p.id == item.id);
        if (itemIndex !== -1) {
            items[itemIndex] = item;
            localStorage.setItem(this.collectionName, JSON.stringify(items))
            return true;
        }
        return false;
    }

    deleteItem(itemId){
        const items = this.getItems();
        const itemIndex = items.findIndex((p) => p.id == itemId);
		if (itemIndex !== -1) {
			items.splice(itemIndex, 1);
			localStorage.setItem(this.collectionName, JSON.stringify(items))
			return true;
		}
		return false;
    }

    findItemById(itemId){
        const items = this.getItems()
        const foundItem = items.find(p => p.id == itemId);
        return foundItem;
    }

    findItemByName(itemName){
        const items = this.getItems()
        const foundItem = items.find(p => p.label === itemName);
        return foundItem;
    }

}

// module.exports = LocalBase